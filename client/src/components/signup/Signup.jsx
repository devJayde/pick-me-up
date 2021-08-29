import styles from "./Signup.module.css";
import React, { useState } from "react";
import axios from "axios";

// axios.defaults.withCredentials = true;
const Signup = ({ setIsSignUpClicked, clickCloseBtn }) => {
  //가입정보 상태
  const [userinfo, setUserinfo] = useState({
    userId: "",
    userName: "",
    mobile: "",
    password: "",
    password2: "",
    signUpType: false, //admin?
  });

  //에러메세지 상태
  const [errorMessage, setErrorMessage] = useState("");
  const { userId, userName, mobile, password, password2, signUpType } =
    userinfo;
  const handleSignup = () => {
    if (!userId || !userName || !mobile || !password || !password2) {
      setErrorMessage("모든 항목을 입력해주세요");
    } else {
      setErrorMessage("");

      const userData = {
        userId,
        password: password,
        userName: userName,
        mobile: mobile,
        signUpType: signUpType,
      };
      // http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/
      // axios
      //   .post(
      //     "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/sign-up",
      //     userData,
      //     {
      //       "Content-Type": "application/json",
      //       withCredentials: true,
      //     }
      //   )
      //   .then((result) => {
      //     console.log(result);
      //     // if(result.data.message === "successfully created"){
      //     //       clickCloseAll();
      //     //       //회원가입완료 모달 띄우면 좋을것 같음
      //     // }
      //   });
      axios
        .post(
          "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/sign-up",
          userData,
          {
            "Content-Type": "application/json",
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
        });
    }
  };

  //인풋창 연결 메소드
  const handleInputValue = (key) => (e) => {
    setUserinfo({
      ...userinfo,
      [key]: e.target.value,
    });
  };
  // 가입하기에서 x눌렀을때 전체다는 버튼
  const clickCloseAll = () => {
    setIsSignUpClicked(false);
    clickCloseBtn();
  };
  return (
    <section className={styles.backdrop}>
      <div className={styles.signup}>
        <div className={styles.titlebox}>
          <span className={styles.title}>sign up</span>
          <span className={styles.close} onClick={clickCloseAll}>
            <img src="../../../images/close.svg" className={styles.img}></img>
          </span>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <input
                type="text"
                onChange={handleInputValue("userId")}
                className={styles.text}
                placeholder="아이디를 입력하세요"
              />
            </li>
            <li className={styles.item}>
              <input
                type="text"
                onChange={handleInputValue("userName")}
                className={styles.text}
                placeholder="닉네임을 입력하세요"
              />
            </li>
            <li className={styles.item}>
              <input
                type="text"
                onChange={handleInputValue("mobile")}
                className={styles.text}
                placeholder="휴대폰번호를 입력하세요"
              />
            </li>
            <li className={styles.item}>
              <input
                type="password"
                onChange={handleInputValue("password")}
                className={styles.text}
                placeholder="비밀번호를 입력하세요"
              />
            </li>
            <li className={styles.item}>
              <input
                type="password"
                onChange={handleInputValue("password2")}
                className={styles.text}
                placeholder="비밀번호를 확인해주세요"
              />
            </li>
            {errorMessage ? (
              <li className={styles.alert}>{errorMessage}</li>
            ) : null}
            <li className={styles.item}>
              <button
                type="submit"
                className={styles.signupBtn}
                onClick={handleSignup}
              >
                Sign up
              </button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
};

export default Signup;
