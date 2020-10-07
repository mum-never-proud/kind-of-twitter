import React from 'react';
import { AiOutlineHeart, AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import { GoVerified } from 'react-icons/go';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './style.css';

dayjs.extend(relativeTime);

const TweetCard = ({
  author, user, tweet, onAction,
}) => {
  const { objectId: userId } = user;

  return (
    <Card className="mt-3 shadow cursor-pointer tweet-card">
      <Card.Body>
        <div className="d-flex break-word">
          <Image className="border shadow" src={`https://avatars.dicebear.com/api/human/${author.email}.svg`} width={36} height={36} roundedCircle />
          <div className="ml-3 w-100">
            <div className="d-block d-md-flex justify-content-between">
              <div className="text-muted small">
                <div>
                  <span className="font-weight-bold">{author.name}</span>
                  {
                    author.verified && (<GoVerified className="text-primary ml-1" />)
                  }
                </div>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(
                    <Tooltip>
                      <span className="small">
                        {dayjs(tweet.created).format('MMM DD HH:mm')}
                      </span>
                    </Tooltip>
              )}
                >
                  <span>{dayjs(tweet.created).from(dayjs())}</span>
                </OverlayTrigger>
              </div>
              {
                userId === author.objectId && (
                  <div className="mt-3 mt-md-0">
                    <Button variant="primary" size="sm" onClick={() => onAction('edit')}>
                      <AiFillEdit />
                    </Button>
                    <Button className="ml-2" variant="danger" size="sm" onClick={() => onAction('delete')}>
                      <AiOutlineDelete />
                    </Button>
                  </div>
                )
              }
            </div>
            <div className="mt-5">
              {tweet.message}
            </div>
            {
              tweet.file && (
                <div className="mt-3 text-center">
                  <Image src={tweet.file} className="w-100 h-auto" />
                </div>
              )
            }
          </div>
        </div>
        <ul className="tweet-actions mt-3 p-0 m-0">
          <li>
            <Button
              variant="link"
              disabled={!userId}
              className={`border-primary tweet-action p-0 ${tweet.likes.includes(userId) ? 'bg-primary text-white' : 'bg-white text-primary'}`}
              onClick={() => onAction('like')}
            >
              <AiOutlineHeart />
            </Button>
            <span className="text-secondary ml-2">
              {tweet.likes.length}
            </span>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
};

TweetCard.defaultProps = {
  onAction: () => {},
};
TweetCard.propTypes = {
  tweet: PropTypes.shape({
    message: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
    file: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  author: PropTypes.shape({
    objectId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    verified: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  onAction: PropTypes.func,
};

export default TweetCard;
