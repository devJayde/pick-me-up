import React from 'react';
import styles from './FeedContent.module.css'

const FeedContent = ({feed, handleSelect}) => {
  const voteCount = feed.option1_count+feed.option2_count
  return (  
      <li className={styles.container} onClick={() => handleSelect(feed)}>
        <div className={styles.feed}>
          <div className={styles.img}>
            <img className={styles.image} src={feed.imgInfo1} alt="option1"/>
            <img className={styles.image} src={feed.imgInfo2} alt="option2"/>
          </div>
          <h1 className={styles.title}>{feed.title}</h1>

          <div className={styles.categories}>
            {feed.tags.map(el => <span className={styles.hashtag}>{el}</span>)}
          </div>
          <span className={styles.voteText}>{voteCount}명이 투표했어요</span>
        </div> 
      </li>
  )
}

export default FeedContent;