import React, { useState } from 'react';

import { UserContext } from './user-context';
import { setLocalStorageWalletStatus } from '../../utils/wallet';
import { toast } from '../../utils/notification.util';
import { isEthNetwork, login } from '../../utils/network/user';


export const UserProvider = (props: React.PropsWithChildren<{}>) => {

  const [walletAddress, setWalletAddress] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(-1);

    const connectWallet = () => {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged)
            .catch(async (err: any) => {
                setWalletAddress('');
                setLocalStorageWalletStatus('').then();
                if (err.code === 4001) {
                    toast('danger', 'Please connect to MetaMask.');
                }
            });
    }

    const handleAccountsChanged = async (accounts: string[]) => {
        if (!await isEthNetwork()) {
            setWalletAddress('');
            setLocalStorageWalletStatus('').then();
            return;
        }
        if (!accounts || !accounts.length) {
            setWalletAddress('');
            setLocalStorageWalletStatus('').then();
            toast('danger', 'Please connect to MetaMask.');
            return;
        }
        setWalletAddress(accounts[0])
        login(accounts[0]).then((result: any) => {
            if(!result) {
                return;
            }
            setToken(result.accessToken);
            setLocalStorageWalletStatus(accounts[0]).then();
        });
    }

  return (
    <UserContext.Provider value={{
      walletAddress: walletAddress,
      setWalletAddress: setWalletAddress,
      token: token,
      setToken: setToken,
      connectWallet: connectWallet,
      pageIndex: pageIndex,
      setPageIndex: setPageIndex,
    }}>
      { props.children }
    </UserContext.Provider>
  );

}
