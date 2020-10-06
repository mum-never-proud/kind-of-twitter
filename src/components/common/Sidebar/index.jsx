import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AiOutlinePoweroff, AiOutlineLogin } from 'react-icons/ai';
import { RiTwitterLine } from 'react-icons/ri';
import { connect, useDispatch } from 'react-redux';
import { signOutUser } from '@actions/user';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import SidebarMenuItems from '@constants/sidebar-menu-items';
import './style.css';

const Sidebar = ({ isAuthenticated, email, name }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <div className="sidebar mt-2">
      <div className="text-center">
        <RiTwitterLine className="text-primary" size={32} />
      </div>
      {
        isAuthenticated && (
          <div className="text-center mt-5">
            <Image className="border shadow" src={`https://avatars.dicebear.com/api/human/${email}.svg`} roundedCircle />
            <div className="mt-3 text-truncate">{name}</div>
            <Button
              variant="link"
              className="text-danger p-0 mt-3"
              onClick={() => dispatch(signOutUser())}
            >
              <AiOutlinePoweroff size={24} />
            </Button>
          </div>
        )
      }
      <ul className="sidebar--menu p-0 mt-5">
        {
            SidebarMenuItems.map((SidebarMenuItem) => (
              <li
                className="mt-3"
                key={SidebarMenuItem.routeName}
              >
                <NavLink
                  exact
                  className="twitter--text-secondary"
                  activeClassName="text-primary"
                  to={{
                    pathname: SidebarMenuItem.routeTo,
                    state: { from: location.pathname },
                  }}
                >
                  <SidebarMenuItem.RouteIcon size={24} />
                  <span className="d-md-inline ml-3">
                    {SidebarMenuItem.routeDisplayName}
                  </span>
                </NavLink>
              </li>
            ))
          }
        {
          !isAuthenticated && (
            <li
              className="mt-3"
              key="sign-in"
            >
              <NavLink
                exact
                className="twitter--text-secondary"
                activeClassName="text-primary"
                to="/sign-in"
              >
                <AiOutlineLogin size={24} />
                <span className="d-md-inline ml-3">
                  Sign In
                </span>
              </NavLink>
            </li>
          )
        }
      </ul>
    </div>
  );
};

Sidebar.defaultProps = {
  email: null,
  name: null,
};
Sidebar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  email: PropTypes.string,
  name: PropTypes.string,
};

const mapStateToProps = ({ userReducer }) => ({
  isAuthenticated: userReducer.isAuthenticated,
  email: userReducer.user.email,
  name: userReducer.user.name,
});

export default connect(mapStateToProps)(Sidebar);
