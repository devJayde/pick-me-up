import styles from "./Myinfo.module.css";
import React from "react";
import NullPage from "../NullPage/Nullpage";
import { useHistory } from "react-router";

const Myinfo = ({ info, accessToken, isLogin }) => {
  const history = useHistory();

  const handleClickModify = () => {
    //setIsModifyClicked(true);
    history.push("/modifyinfo");
  };

  // const clickDeleteUser = () => {
  //   //회원탈퇴 요청하기
  //   //axios.post("")
  // };

  return (
    <>
      {isLogin ? (
        <>
          <div className={styles.infobox}>
            <div className={styles.imgbox}>
              <span className={styles.imgborder}>
                <img
                  src="../../../images/face.svg"
                  className={styles.faceimg}
                ></img>
              </span>
            </div>
            <div className={styles.textbox}>
              <div className={styles.ulbox}>
                <span className={styles.list}>
                  닉네임:
                  <input
                    className={styles.input}
                    value={info.nickname}
                    readOnly
                  ></input>
                </span>
                <span className={styles.list}>
                  모바일:
                  <input
                    className={styles.input}
                    value={info.mobile}
                    readOnly
                  ></input>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.btns}>
            {/* <button className={styles.out} onClick={clickDeleteUser}>
              회원탈퇴
            </button> */}
            <button className={styles.btn} onClick={handleClickModify}>
              수정하기
            </button>
          </div>
        </>
      ) : (
        <NullPage />
      )}
    </>
  );
};

export default Myinfo;
