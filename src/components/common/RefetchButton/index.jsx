import React from 'react';
import { RiRefreshLine } from 'react-icons/ri';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const RefetchButton = ({ isFetching, onRefetch }) => (
  <Button
    variant="link"
    className="shadow-lg position-absolute m-auto border border-primary rounded"
    style={{
      left: 0, right: 0, zIndex: 1, backgroundColor: '#fff',
    }}
    onClick={onRefetch}
  >
    <RiRefreshLine className={`${isFetching ? 'icon-spin' : ''}`} />
  </Button>
);

RefetchButton.defaultProps = {
  isFetching: false,
};
RefetchButton.propTypes = {
  isFetching: PropTypes.bool,
  onRefetch: PropTypes.func.isRequired,
};

export default RefetchButton;
