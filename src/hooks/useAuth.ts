import { useAppSelector } from '~/store/store';

export const useAuth = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.authSlice);

  return { isLoggedIn, user };
};
