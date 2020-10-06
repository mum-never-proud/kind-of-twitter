import React from 'react';
import { Link } from 'react-router-dom';

const NoTweets = () => (
  <div className="text-center mt-5">
    <p>There are no Tweets.</p>
    <p>
      May be you should
      {' '}
      <Link to="/home">create one</Link>
      ?
    </p>
  </div>
);

export default NoTweets;
