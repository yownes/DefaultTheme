import { useQuery } from "@apollo/client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PROFILE } from "../../api/queries";
import {
  Profile as IProfile,
  Profile_accountCheckLogged_customer,
} from "../../api/types/Profile";
import { getToken } from "../../lib/auth";

interface AuthContextProps {
  isAuthenticated: boolean;
  customer?: Profile_accountCheckLogged_customer | null;
}

const initialState: AuthContextProps = {
  isAuthenticated: false,
  customer: undefined,
};

interface AuthContextActions {
  login: (customer: Profile_accountCheckLogged_customer) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps & AuthContextActions>({
  ...initialState,
  login() {},
  logout() {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState(initialState);
  const { loading, data } = useQuery<IProfile>(PROFILE);

  useEffect(() => {
    if (!loading) {
      setState((state) => ({
        ...state,
        isAuthenticated: data?.accountCheckLogged?.status === true,
        customer: data?.accountCheckLogged?.customer,
      }));
    }
  }, [loading, data]);

  function login(customer: Profile_accountCheckLogged_customer) {
    setState((state) => ({
      ...state,
      isAuthenticated: true,
      customer,
    }));
  }

  function logout() {
    setState((state) => ({
      ...state,
      isAuthenticated: false,
      customer: null,
    }));
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
