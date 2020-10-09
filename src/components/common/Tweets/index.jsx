import React, { useEffect, useState } from 'react';
import {
  subscribe as subscribeChannel, unsubscribe as unsubscribeChannel,
  updateTweetStats, remove, notifyChannel,
} from '@services/tweet';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import TweetForm from '@components/common/TweetForm';
import TweetCard from '@components/common/TweetCard';

const Tweets = ({
  tweets, user, errors, selector, onRefresh,
}) => {
  const [modalProps, setModalProps] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const actionHandler = (actionType, tweet) => {
    switch (actionType) {
      case 'like':
        updateTweetStats[actionType](user.objectId, tweet);
        break;
      case 'edit':
      case 'delete':
        setModalProps({ show: true, mode: actionType, tweet });
        break;
      // no default
    }
  };
  const removeTweetHandler = () => {
    setIsDeleting(true);
    remove(modalProps.tweet.objectId)
      .then(() => {
        onRefresh();
        setModalProps({ ...modalProps, show: false });
        notifyChannel('kot-tweet', modalProps.tweet);
      })
      .finally(() => setIsDeleting(false));
  };

  useEffect(() => {
    const onMessage = ({ message }) => {
      if (message.objectId === modalProps.tweet?.objectId) {
        setModalProps({ ...modalProps, show: false });
      }

      onRefresh();
    };

    subscribeChannel('kot-tweet', onMessage, selector);

    return () => unsubscribeChannel('kot-tweet', selector);
  }, [selector, modalProps]);

  if (errors.length) {
    return (
      <div className="text-danger mt-2">
        <p className="font-weight-bold">
          Since this App is hosted on a Free Tier Plan.
          {' '}
          Sometimes the Tweets may not load and might crash.
          {' '}
          In that case visit back after sometime!
        </p>
        <div>
          <p className="lead font-weight-bold">Error(s):</p>
          <ul style={{ listStyle: 'bullet' }}>
            {
              errors.map((error) => <li key={error}>{error}</li>)
            }
          </ul>
        </div>
      </div>
    );
  }

  return (
    <>
      {
        tweets.map((tweet) => (
          <TweetCard
            key={tweet.objectId}
            tweet={tweet}
            author={tweet.user || user}
            user={user}
            onAction={(actionType) => actionHandler(actionType, tweet)}
          />
        ))
      }
      <Modal
        size={`${modalProps.mode === 'edit' ? 'md' : 'sm'}`}
        show={modalProps.show}
        backdrop="static"
        keyboard={false}
        aria-labelledby="failed-to-upload-image"
        animation={false}
        onHide={() => setModalProps({ ...modalProps, show: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title id="failed-to-upload-image">
            kind of twitter
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger">
          {
            modalProps.mode === 'edit'
              ? (
                <TweetForm
                  editTweet={modalProps.tweet}
                  onSubmit={() => setModalProps({ ...modalProps, show: false })}
                />
              )
              : <div className="text-danger">Sure?</div>
          }
        </Modal.Body>
        {
          modalProps.mode === 'delete' && (
            <Modal.Footer>
              <Button variant="danger" onClick={removeTweetHandler} disabled={isDeleting}>
                Delete
                {isDeleting ? 'ing...' : ''}
              </Button>
            </Modal.Footer>
          )
        }
      </Modal>
    </>
  );
};

Tweets.defaultProps = {
  selector: undefined,
};
Tweets.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  tweets: PropTypes.arrayOf(PropTypes.object).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  selector: PropTypes.string,
  onRefresh: PropTypes.func.isRequired,
};

export default Tweets;
