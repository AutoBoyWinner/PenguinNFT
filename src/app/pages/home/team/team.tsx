import React from "react";
import cn from "classnames";

import styles from './Popular.module.sass'

const Team = () => {
  return (
      <div id="TEAM" className={cn("section-pt80", "d-flex flex-column justify-content-center", "min-vh-100", styles.section)}>
        <div className="container text-center p-30 border-dark border-10">
          <div className="row">
            <div className="col-lg-12 col-sm-12 col-xs-12 mb-5">
              <h1>The Team</h1>
            </div>
          </div>
          <div className="row mt-30">
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <img className="border-6 border-color-white border-radius-16" style={{ maxWidth: '100%' }}
                  src="/images/1.png"
                  alt="dev"/>
              <div className="d-flex justify-content-center">
                  <h3 className="font-italic border-radius-5 px-10 mb-10" style={{  }}>Pharell</h3>
              </div>

              <h5 className="font-weight-bold">Social Media Marketing</h5></div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <img className="border-6 border-color-white border-radius-16" style={{ maxWidth: '100%' }}
                  src="/images/2.png"
                  alt="smmark"/>
              <div className="d-flex justify-content-center">
                  <h3 className="font-italic border-radius-5 px-10 mb-10" style={{  }}>Captain Star</h3>
              </div>

              <h5 className="font-weight-bold">Marketing Strategy</h5>
            </div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <img className="border-6 border-color-white border-radius-16" style={{ maxWidth: '100%' }}
                  src="/images/3.png"
                  alt="man"/>
              <div className="d-flex justify-content-center">
                <h3 className="font-italic border-radius-5 px-10 mb-10" style={{  }}>Mr. Pixel</h3>
              </div>

              <h5 className="font-weight-bold">NFT Designer</h5></div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <img className="border-6 border-color-white border-radius-16" style={{ maxWidth: '100%' }}
                  src="/images/4.png"
                  alt="marks"/>
              <div className="d-flex justify-content-center">
                  <h3 className="font-italic border-radius-5 px-10 mb-10" style={{  }}>Mr. Robot</h3>
              </div>

              <h5 className="font-weight-bold">grg 809</h5></div>
          </div>
          <div className="justify-content-center row mt-20">
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <img className="border-6 border-color-white border-radius-16" style={{ maxWidth: '100%' }}
                  src="/images/5.png"
                  alt="marks"/>
              <div className="d-flex justify-content-center">
                  <h3 className="font-italic border-radius-5 px-10 mb-10" style={{  }}>Andromeda</h3>
              </div>

              <h5 className="font-weight-bold">Dev</h5></div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <img className="border-6 border-color-white border-radius-16" style={{ maxWidth: '100%' }}
                  src="/images/6.png"
                  alt="marks"/>
              <div className="d-flex justify-content-center">
                  <h3 className="font-italic border-radius-5 px-10 mb-10" style={{  }}>Neptune</h3>
              </div>

              <h5 className="font-weight-bold">NKT43</h5></div>
            <div className="col-lg-3 col-sm-6 col-xs-12">
              <img className="border-6 border-color-white border-radius-16" style={{ maxWidth: '100%' }}
                  src="/images/7.png"
                  alt="marks"/>
              <div className="d-flex justify-content-center">
                  <h3 className="font-italic border-radius-5 px-10 mb-10" style={{  }}>Simon</h3>
              </div>
              <h5 className="font-weight-bold">Project Management</h5></div>
          </div>
        </div>
      </div>
  );
};

export default Team;
