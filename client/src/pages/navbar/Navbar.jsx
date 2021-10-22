import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Signin from "../../components/signin/Signin";
import styles from "./Navbar.module.css";

const Navbar = ({
  handleResponseSuccess,
  onSignout,
  isLogin,
  setListRender,
  isAuthenticated,
  setInfo,
  accessToken,
}) => {
  //props로 isSignIn받고 true일경우 login/ false일경우 logout버튼
  const [isSigninClicked, setIsSigninClicked] = useState(false);

  const clickSigninBtn = () => {
    setIsSigninClicked(true);
  };
  const clickCloseBtn = () => {
    setIsSigninClicked(false);
  };

  const reset = () => {
    // 로고 홈버튼 클릭하면 해시태그 선택 안 되고 전체로 reset
    setListRender();
  };

  const clickmypage = () => {
    // history.push("/mypage");
    isAuthenticated()
  };

  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if(ScrollY > 400) { // 400 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else { // 400 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  }
  
  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  return (
    <header className={BtnStatus ? styles.scrollHeader : styles.header}>
      {/* 가입하기 모달창 */}
      {isSigninClicked ? (
        <Signin
          clickCloseBtn={clickCloseBtn}
          handleResponseSuccess={handleResponseSuccess}
          setInfo={setInfo}
          accessToken={accessToken}
        />
      ) : null}

      <div className={styles.contentbox}>
        <Link to="/" className={styles.underline}>
          <div className={styles.title} onClick={reset}>
            Pick me up
          </div>
        </Link>
        <div className={styles.btns}>
          {isLogin ? (
            <button className={BtnStatus ? styles.scrollSignbtn : styles.signbtn} onClick={onSignout}>
              Logout
            </button>
          ) : (
            <button className={BtnStatus ? styles.scrollSignbtn: styles.signbtn} onClick={clickSigninBtn}>
              Sign in
            </button>
          )}
          <Link to="/mypage">
            <button className={BtnStatus ? styles.scrollMypagebtn : styles.mypagebtn} onClick={clickmypage}>
              My page
            </button>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
