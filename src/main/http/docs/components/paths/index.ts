import token from './token';
import users from './users';
import postshortLinks from './post-shorts-links';
import listShortsLinks from './list-shorts-links';
import paramsShortsLinks from './params-shorts-links';

export const pathSchema = {
  '/users': users,
  '/users/token': token,
  '/shorts/links': postshortLinks,
  '/shorts': listShortsLinks,
  '/shorts/{code}': paramsShortsLinks
};
