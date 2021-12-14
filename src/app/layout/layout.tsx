import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader'
import LoadingOverlay from 'react-loading-overlay-ts';

import Header from './header/header';
import Footers from "./footer/footer";
import { useOverlay } from '../core/context-provider/loading-overlay/loading-overlay-context';

import './layout.scss';

export const Layout = (props: React.PropsWithChildren<{}>) => {
    const { isActivity, overlayText } = useOverlay();

    return (
        <LoadingOverlay
            active={ isActivity }
            spinner={
                <div className="d-flex flex-column">
                    <BeatLoader size={ 60 } color='white' />
                    <h3>
                        { overlayText }
                    </h3>
                </div>
            }
            className="d-flex flex-column bg-info">

            <Header/>
            <div>
                { props.children }
            </div>
            <Footers/>
        </LoadingOverlay>
    );
}
