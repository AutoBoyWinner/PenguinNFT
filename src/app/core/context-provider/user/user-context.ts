
import { createContext, useContext } from 'react';

export type UserContextType = {
  walletAddress: string,
  setWalletAddress: (address: string) => void;
  token: string,
  setToken: (token: string) => void;
  connectWallet: () => void;
  pageIndex: number,
  setPageIndex: (pageIndex: number) => void;
}

export const UserContext = createContext<UserContextType>({
  walletAddress: '',
  setWalletAddress: (address: string) => {},
  token: 'string',
  setToken: (token: string) => {},
  connectWallet: () => {},
  pageIndex: -1,
  setPageIndex: () => {}
});

export const useUser = () => useContext(UserContext);
