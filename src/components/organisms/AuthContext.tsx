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

const AuthContext = createContext<AuthContextProps>(initialState);

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

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
