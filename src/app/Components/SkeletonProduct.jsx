"use client"
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
import styles from './SkeletonProduct.module.css'


const SkeletonProduct = ({cards}) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={styles.cardContainer}>
        <Skeleton width={100} height={200} className={styles.skeletonImage} />
        <Skeleton width={100} className={styles.skeletonText} />
        <div className={styles.skeletonFlex}>
          <Skeleton count={2} width={50} />
        </div>
      </div>
    ));
};

export default SkeletonProduct;
