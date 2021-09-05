import styles from "./RealVote.module.css";
import React from "react";

const RealVote = ({ feed, handleVote, handleFeedVote, clickOptReset }) => {

  const clickNo = () => { //투표 안 하기로 번복.
    handleVote(); //모달창 닫기
    clickOptReset(); //opt1 클릭된 상태 & op2클릭된 상태 리셋.
  };

  const clickYes = (el) => { //투표하기로 결정.
    handleVote(); //모달창 닫기
    handleFeedVote(el); //투표한 피드 정보를 넘김
  };

  return (
    <section className={styles.backdrop}>
      <div className={styles.realVote}>
        <span className={styles.title}>정말 투표하시겠어요?</span>
        <span className={styles.btns}>
          <button className={styles.btn} onClick={clickNo}>
            아니오
          </button>
          <button className={styles.btn} onClick={()=>clickYes(feed)}>
            네
          </button>
        </span>
      </div>
    </section>
  );
};

export default RealVote;
