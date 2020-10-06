import { HiHashtag } from 'react-icons/hi';
import { RiHome7Line, RiProfileLine } from 'react-icons/ri';

export default [
  {
    RouteIcon: RiHome7Line,
    routeName: 'home',
    routeDisplayName: 'Home',
    routeTo: '/home',
    isActive: true,
  },
  {
    RouteIcon: HiHashtag,
    routeName: 'explore',
    routeDisplayName: 'Explore',
    routeTo: '/explore',
    isActive: false,
  },
  {
    RouteIcon: RiProfileLine,
    routeName: 'profile',
    routeDisplayName: 'Profile',
    routeTo: '/profile',
    isActive: false,
  },
];
