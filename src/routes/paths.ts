function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '';
const ROOTS_TICKETS = 'tickets';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_PAGE = {
  home: '/',
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_TICKETS = {
  root: ROOTS_TICKETS,
};
