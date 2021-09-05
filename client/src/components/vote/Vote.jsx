import React from 'react';
import styles from './Vote.module.css';


const Vote = ({feed, handleOpt}) => {

  
  return(
  <section className={styles.container}>
 
   <div className={styles.images}>
     <img className={styles.image} src={feed.imgInfo1} alt="option1" onClick={()=>handleOpt(feed.option1)}/>
     <img className={styles.image} src={feed.imgInfo2} alt="option2" onClick={()=>handleOpt(feed.option2)}/>
   </div>

   <div className={styles.options}>
     <label className={styles.optionName}>
       <input className={styles.radioBox} name="pick" type="radio" onClick={()=>handleOpt(feed.option1)}/>{feed.option1}
     </label>
     <label className={styles.optionName}>
       <input className={styles.radioBox} name="pick" type="radio" onClick={()=>handleOpt(feed.option2)}/>{feed.option2}
     </label>
   </div>

 </section>
  );
}

export default Vote;