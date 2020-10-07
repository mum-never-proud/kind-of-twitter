/* eslint-disable max-len */
import Backendless from '@services/backendless';

const { Files, Messaging, UserService } = Backendless;
const users = Backendless.Data.of('users');
const tweets = Backendless.Data.of('tweets');

const channels = {
  'kot-tweet': Messaging.subscribe('kot-tweet'),
  'kot-tweet-actions': Messaging.subscribe('kot-tweet-actions'),
};
const updateTweetStats = {};

export const subscribe = (channel, callback, selector) => {
  if (selector) {
    channels[channel].addMessageListener(selector, callback);
  } else {
    channels[channel].addMessageListener(callback);
  }
};

export const unsubscribe = (channel, callback, selector) => {
  channels[channel].waitConnection = [];

  if (!callback) {
    channels[channel].removeAllMessageListeners();
  } else if (typeof callback === 'string') {
    channels[channel].removeMessageListeners(callback);
  } else {
    channels[channel].removeMessageListener(selector, callback);
  }
};

export const notifyChannel = (channel, message, headers) => {
  Messaging.publish(
    channel,
    message,
    new Backendless.PublishOptions({ headers }),
  );
};

export const fetchTweets = async () => {
  const currentUser = await UserService.getCurrentUser();

  const queryBuilder = Backendless.DataQueryBuilder.create();

  if (currentUser) {
    queryBuilder.setWhereClause(`ownerId != '${currentUser.objectId}'`);
  }

  queryBuilder.setSortBy(['created DESC']);
  queryBuilder.setRelationsDepth(1);
  queryBuilder.setPageSize(100);

  return tweets.find(queryBuilder);
};

export const fetchPrimaryTweets = () => {
  const loadRelationsQueryBuilder = Backendless.LoadRelationsQueryBuilder.create().setRelationName('tweets');

  loadRelationsQueryBuilder.setSortBy(['created DESC']);
  loadRelationsQueryBuilder.setPageSize(100); // load upto 100 tweets

  return UserService.getCurrentUser()
    .then((user) => users.loadRelations(user.objectId, loadRelationsQueryBuilder));
};

export const save = (tweet) => new Promise((resolve, reject) => {
  tweets.save(tweet)
    .then((res) => {
      resolve(res);

      // defining relationships can happen in background
      UserService.getCurrentUser()
        .then((user) => {
          users.addRelation(user, 'tweets:Tweets:n', [res.objectId]);
          tweets.addRelation(res, 'user:Users:1', [user.objectId]);
        });
    })
    .catch((err) => reject(err));
});

export const remove = (objectId) => tweets.remove({ objectId });

updateTweetStats.like = (userId, tweet) => {
  const userIndex = tweet.likes.indexOf(userId);

  if (userIndex >= 0) {
    tweet.likes.splice(userIndex, 1);
  } else {
    tweet.likes.push(userId);
  }

  tweets.save(tweet)
    .then((res) => notifyChannel(
      'kot-tweet-actions',
      { userId, tweetId: res.objectId, likes: res.likes },
      { authorId: res.ownerId },
    ));
};

export const uploadFile = (file) => Files.upload(file, 'uploads', true);

export { updateTweetStats };
