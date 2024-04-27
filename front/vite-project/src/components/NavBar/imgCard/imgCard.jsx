import React from "react";
import img from "../../../assets/img.jpg";
import styles from "./imgCard.module.css";

const ImgCard = () => {
    return (
        <div className={styles.imgtextContainer}>
            <img src={img} alt="img" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab nam placeat tempore mollitia, aspernatur eaque aliquid corporis eum a minima ullam reprehenderit! Eos alias dicta deleniti. Tempora quisquam aliquam iste.</p>
        </div>
    );
};
export default ImgCard