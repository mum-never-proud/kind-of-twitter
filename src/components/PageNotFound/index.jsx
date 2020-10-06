import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div className="mt-3 text-center">
    <p className="lead font-weight-bold">Sorry, that page doesn’t exist!</p>
    <p className="text-muted">
      Why not try to
      {' '}
      <Link to="/explore">explore</Link>
      {' '}
      to find something else?
    </p>
  </div>
);

export default PageNotFound;
