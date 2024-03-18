import React from "react";
import bannerphoto from "./bannerphoto.jpg";
import styles from "./main.module.css";

const Banner = () => {
  return (
    <div className={`${styles.banner}`}>
      <img src={bannerphoto} alt="Banner" />
      <div className={` ${styles.bannerContent}`}></div>
    </div>
  );
};

export default Banner;
