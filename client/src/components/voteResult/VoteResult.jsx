import React from 'react';
import styles from './VoteResult.module.css';
import Feed from '../../pages/feed/Feed';


const VoteResult = ({feed, isVoted,setIsVoted, setIsVoteReal, voteMsg, voteCount}) => {
  
  //voteCount가 들어오게 되면...
  let voteDate = {
    per1 : {
      percent: Math.round((voteCount.option1_count/(voteCount.option1_count+voteCount.option2_count))*100)
    },
    per2 : {
      percent: Math.round((voteCount.option2_count/(voteCount.option1_count+voteCount.option2_count))*100)
    }
  }

  const clickBack = () => {
    setIsVoted(false)
    setIsVoteReal(false)
  }

  return  (
    <>
    {isVoted ? //다시 피드로 돌아감. 
      <Feed feed={feed}/>
      :
    (
      <section className={styles.container}>
      <div className={styles.goback} >
       
        <img src="../../../images/back.svg" className={styles.back} onClick={clickBack}></img>
        <span className={styles.bigtitle}>투표결과</span>
      </div>

      <div className={styles.images}>
        <img className={styles.image} src={feed.imgInfo1} alt="option1" />
      
        <img className={styles.image} src={feed.imgInfo2} alt="option2" />
      </div>

      <div className={styles.graph}>
        <span className={styles.imgbox}>
          <label className={styles.percent1} >{voteDate.per1.percent}%</label>
          <label className={styles.img1} style={{width: `${voteDate.per1.percent}%`}}></label>
        </span>
        <span className={styles.title1}>{feed.option1}</span>
        <span className={styles.imgbox}>
          <label className={styles.percent2}>{voteDate.per2.percent}%</label>
          <label className={styles.img2}   style={{width: `${voteDate.per2.percent}%`}}></label>
        </span>
        <span className={styles.title2}>{feed.option2}</span>
      </div>
      {voteMsg? <div className={styles.voteMessage}>이미 투표를 완료하셨어요!</div> : null}
     
     
    </section>
    )}
    </>
  );
}
export default VoteResult;