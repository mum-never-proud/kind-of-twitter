import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { RiLoader4Line, RiImage2Line } from 'react-icons/ri';
import { connect, useDispatch } from 'react-redux';
import { saveTweet } from '@actions/tweet';
import { uploadFile } from '@services/tweet';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const TweetForm = ({
  isSubmitting, editTweet, user, errors,
}) => {
  const messageRef = useRef();
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [hasFileUploadError, setHasFileUploadError] = useState();
  const [tweet, setTweet] = useState(editTweet);
  const [isUploading, setIsUploading] = useState(false);
  const { objectId: ownerId, email } = user;
  const messageHandler = (e) => setTweet({ ...tweet, message: e.target.value });
  const tweetHandler = () => dispatch(saveTweet(tweet, { ownerId }));
  const fileUploadHandler = (e) => {
    setIsUploading(true);
    uploadFile(e.target.files[0])
      .then(({ fileURL }) => setTweet({ ...tweet, file: fileURL }))
      .catch(() => setHasFileUploadError(true))
      .finally(() => setIsUploading(false));
  };

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  useEffect(() => {
    if (!editTweet.message && !isSubmitting) {
      setTweet({ message: '', file: '' });
      messageRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <>
      <Form>
        <Form.Group className="d-flex align-items-center">
          <Image
            width={36}
            height={36}
            className="border"
            src={`https://avatars.dicebear.com/api/human/${email}.svg`}
            roundedCircle
          />
          <Form.Control
            as="textarea"
            rows="3"
            disabled={isSubmitting}
            className="twitter--textarea ml-3"
            placeholder="What's happening?"
            value={tweet.message}
            ref={messageRef}
            onChange={messageHandler}
          />
        </Form.Group>
        <Form.Group className="d-none">
          <Form.File
            label="Upload picture"
            ref={fileRef}
            onChange={fileUploadHandler}
            custom
          />
        </Form.Group>
        {
          errors.length > 0 && (
            <Alert variant="danger">
              <ul className="m-0 p-0">
                {
                errors.map((error) => (
                  <li key={error}>{error}</li>
                ))
              }
              </ul>
            </Alert>
          )
        }
        {
          tweet.file && (
            <Form.Group className="text-right">
              <Image src={tweet.file} width={50} height={50} />
            </Form.Group>
          )
        }
        <Form.Group className="d-flex justify-content-between align-items-center">
          <div>
            <Button variant="link" onClick={() => fileRef.current.click()} disabled={isUploading}>
              {
                isUploading
                  ? <RiLoader4Line className="icon-spin" size={36} />
                  : <RiImage2Line size={36} />
              }
            </Button>
          </div>
          <Button
            variant="primary"
            onClick={tweetHandler}
            disabled={
              isSubmitting || isUploading || !tweet.message?.length || tweet.message?.length > 140
            }
          >
            {
              isSubmitting && (<RiLoader4Line className="icon-spin" />)
            }
            {' '}
            Tweet
          </Button>
        </Form.Group>
      </Form>
      <Modal
        size="sm"
        show={hasFileUploadError}
        onHide={() => setHasFileUploadError(false)}
        aria-labelledby="failed-to-upload-image"
      >
        <Modal.Header closeButton>
          <Modal.Title id="failed-to-upload-image">
            kind of twitter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger">Failed to upload image</Modal.Body>
      </Modal>
    </>
  );
};

TweetForm.defaultProps = {
  editTweet: {},
};
TweetForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
  }).isRequired,
  editTweet: PropTypes.shape({
    message: PropTypes.string,
    file: PropTypes.string,
  }),
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ tweetReducer, userReducer }) => {
  const { isSubmitting, errors } = tweetReducer;
  const { user } = userReducer;

  return {
    isSubmitting,
    errors,
    user,
  };
};

export default connect(mapStateToProps)(TweetForm);
