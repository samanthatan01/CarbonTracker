import React from "react";
import bannerphoto from "../components/bannerphoto.jpg";
import styles from "../components/main.module.css";

const Main = () => {
  return (
    <>
      <img className={`${styles.banner}`} src={bannerphoto} alt="pollution" />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <h1 className={`${styles.title}`}>
            <strong>CARBON TRACKER</strong>
          </h1>
          <br />
          <h5 className={`${styles.title}`}>
            <strong>THE METHODOLOGY BEHIND THE APP</strong>
          </h5>
          <br />
          <br />
          <br />
          <p>
            Carbon Interface makes it easy for developers to perform carbon
            emissions calculations through an easy-to-use API. In order to
            provide accurate estimates that developers can trust, each estimate
            type has a different carbon calculation that factors in best
            practices from GHG Protocol, the IPCC and country-specific agencies
            such as the EPA.
          </p>
          <br />
          <p>
            Additionally, all emissions data is versioned to ensure accurate
            estimates in the future and audit purposes. We believe in being
            transparent with our calculations and data sources so developers can
            assure their users that they are performing accurate emission
            estimates.
          </p>
          <br />
          <a
            className={`${styles.link}`}
            href="https://faint-class-d56.notion.site/Carbon-Interface-Methodology-d788fff61c724a48b100e0f7d77c0c57"
          >
            Read more about the API here
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default Main;
