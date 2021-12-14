import React, { useEffect } from 'react';
import useDarkMode from "use-dark-mode";
import ReactNotification from 'react-notifications-component'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import { Layout } from "./layout/layout";
import { ROUTES } from './core/data/routes';
import { environment } from "../environment";
import { bscNetworkChainId } from "./core/utils/network/user";
import { UserProvider } from './core/context-provider/user/user-provider';
import { LoadingOverlayProvider } from './core/context-provider/loading-overlay/loading-overlay-provider';

import Home from "./pages/home/home";
import MyPenguins from "./pages/my-penguins/my-penguins";
import Marketplace from "./pages/marketplace/marketplace";

import "../app/pages/styles/app.sass";
import 'react-notifications-component/dist/theme.css'

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {

  const ethereum = window.ethereum;
  const darkMode = useDarkMode(true);

  useEffect(() => {
    darkMode.enable();
  }, [])

  return (
      <UserProvider>
        <ReactNotification/>
        <Router>
          <LoadingOverlayProvider>
            <Layout>
              <Switch>
                <Redirect exact from="/" to={ ROUTES.home }/>
                <Route exact path={ `${ ROUTES.home }` } component={ Home }/>
                <Route exact path={ `${ ROUTES.market }` } component={ Marketplace }/>
                <Route exact path={ `${ ROUTES.myPenguins }` } component={ MyPenguins }/>
            {/*    <Route exact path={ `${ ROUTES.news }` } component={ NewsPage }/>*/}
            {/*    <Route exact path={ `${ ROUTES.profile }` } component={ ProfilePage }/>*/}
            {/*    <Route exact path={ `${ ROUTES.collection }` } component={ CollectionPage }/>*/}
            {/*    <Route exact path={ `${ ROUTES.nft }` } component={ NftPage }/>*/}
            {/*    <Route exact path={ `${ ROUTES.mintNFT }` } component={ MintNftPage }/>*/}
            {/*    <Route exact path={ `${ ROUTES.favorite }` } component={ FavoritePage }/>*/}
            {/*    <Route exact path={ `${ ROUTES.createCollection }` } component={ CreateCollectionPage }/>*/}
            {/*    <Route exact path={ `${ ROUTES.nftDetail }/:id` } component={ NftDetailPage }/>*/}
            {/*    <Route exact path={ `${ ROUTES.doc }` } component={ DocPage }/>*/}
              </Switch>
            </Layout>
          </LoadingOverlayProvider>
        </Router>
      </UserProvider>
  );
}


export default App;
