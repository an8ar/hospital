export interface AuthState {
  isLoggedIn: boolean;
  user: AuthUser | null;
  csrf: string | null;
}

export interface AuthUser {
  country: string;
  first: string;
  last: string;
  clubDirector: boolean;
  eventOwner: boolean;
  hasEORole: boolean;
  isUSAVAdmin: boolean;
  eoid: number;
  sponsor: boolean;
  staff: boolean;
  sales: boolean;
  owner: boolean;
  // todo: write type
  housing: null;
  has_tickets: boolean;
  hasGodRole: boolean;
  is_admin: boolean;
  email: string;
}
