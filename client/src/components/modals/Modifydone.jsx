import styles from "./Modifydone.module.css";
import React from "react";

//"수정되었습니다" 모달
//재사용안되면 긁어다사용하세옴

const Modifydone = ({}) => {
  //const clickNo = () => {};

  const clickYes = () => {};

  return (
    <section className={styles.backdrop}>
      <div className={styles.modalMsgBox}>
        <span className={styles.title}>수정되었습니다</span>
        <span className={styles.btns}>
          <button className={styles.btn} onClick={clickYes}>
            확인
          </button>
        </span>
      </div>
    </section>
  );
};

export default Modifydone;
