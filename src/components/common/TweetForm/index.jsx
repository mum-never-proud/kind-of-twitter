import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { RiLoader4Line } from 'react-icons/ri';
import { connect, useDispatch } from 'react-redux';
import { saveTweet } from '@actions/tweet';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

const TweetForm = ({ isSubmitting, user, errors }) => {
  const messageRef = useRef();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { objectId: ownerId, email } = user;
  const handleChange = (e) => setMessage(e.target.value);
  const handleTweet = () => {
    dispatch(saveTweet({ message }, { ownerId }));
  };

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  useEffect(() => {
    if (!isSubmitting && !errors.length) {
      setMessage('');
      messageRef.current.focus();
    }
  }, [isSubmitting]);

  return (
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
          value={message}
          ref={messageRef}
          onChange={handleChange}
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
      <Form.Group className="d-flex justify-content-end">
        <Button variant="primary" onClick={handleTweet} disabled={isSubmitting || !message.length || message.length > 140}>
          {
            isSubmitting && (<RiLoader4Line className="icon-spin" />)
          }
          {' '}
          Tweet
        </Button>
      </Form.Group>
    </Form>
  );
};

TweetForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
  }).isRequired,
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
