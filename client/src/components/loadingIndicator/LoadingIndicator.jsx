import styles from "./LoadingIndicator.module.css";
import React from "react";

function LoadingIndicator() {
 
  return <section className={styles.container}>
    <div className={styles.counting}>투표 집계중...</div>
    <img className={styles.loadingGif} 
      alt="now loading..." 
      src="loading.gif"/>
    </section>
  
}

export default LoadingIndicator