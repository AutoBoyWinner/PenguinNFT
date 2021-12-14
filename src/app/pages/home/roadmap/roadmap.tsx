import React from "react";
import cn from "classnames";
import styles from "./Selection.module.sass";

const RoadMap = () => {
  return (
    <div id="ROADMAP" className={cn("section-bg", "d-flex flex-column justify-content-center", "min-vh-100", styles.section)}>
      <div className="bg-dark p-40 border-10 border-dark border-radius-5 flex-center container">
        <div className="text-center">
          <div className="col-md-12 col-sm-12 col-xs-12 mb-4"><h1>Roadmap</h1></div>
        </div>
        <div className="mt-30">
          <div className="row">
            <div className="mt-30 col-12 col-lg-6">
              <h2 className="font-italic border-radius-7 p-5" style={{ width: 'fit-content', borderColor: 'deepskyblue' }}>20% Sold</h2>
              <h5 className="my-5">
                We celebrate our first sales by giving out a signature NFT to two lucky holders
              </h5>
            </div>
            <div className="mt-30 col-12 col-lg-6">
              <h2 className="font-italic border-radius-7 p-5" style={{ width: 'fit-content', borderColor: 'deepskyblue' }}>40% Sold</h2>
              <h5 className="my-5">
                After 40% have been sold off, there'll be a 3d penguin museum gallery built into the website
              </h5>
            </div>
            <div className="mt-30 col-12 col-lg-6">
              <h2 className="font-italic border-radius-7 p-5" style={{ width: 'fit-content', borderColor: 'deepskyblue' }}>60% Sold</h2>
              <h5 className="my-5">
                Harmony Penguin's Merch store gets unveiled, featuring Premium tees, hoodies, and memorabilia
              </h5>
            </div>
            <div className="mt-30 col-12 col-lg-6">
              <h2 className="font-italic border-radius-7 p-5" style={{ width: 'fit-content', borderColor: 'deepskyblue' }}>80% Sold</h2>
              <h4 className="my-10">Charitable Donation</h4>
              <h5 className="my-5">
                A portion of the earnings from the sales will be directed to a charity of choice.
                Advocation for wildlife protection will be made public on reputable news media, further promoting our brand and our goals.
              </h5>
            </div>
            <div className="mt-30 col-12 col-lg-6">
              <h2 className="font-italic border-radius-7 p-5" style={{ width: 'fit-content' , borderColor: 'deepskyblue'}}>100% Sold</h2>
              <h5 className="my-5">
                A play to earn penguin inspired game (Igloo) will be created, with cash prizes for top players.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
