import React from 'react';
import styles from './Footer.module.css'

const Footer = (props) => {
  return (
  <footer>
    <div className={styles.container}>
      <div className={styles.contentbox}>
          <div className={styles.teamname}>Team PickMe
            <ul className={styles.nameList}>
              <li><a target="_blank" rel="noreferrer" href="https://github.com/Sunryeo"className={styles.member}>문순려</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://github.com/devJayde"className={styles.member}>박지영</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://github.com/tkdkagody"className={styles.member}>유다희</a></li>
              <li><a target="_blank" rel="noreferrer" href="https://github.com/dongukuklee"className={styles.member}>이동욱</a></li>
            </ul>
          </div>
          <div className={styles.rights}>Copyright &#169; 2021 Team PickMe All rights reserved</div> 
      </div>
    </div>
   
  </footer>
  )
};

export default Footer;
