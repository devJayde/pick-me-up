import React, { useState } from 'react';
import Signup from '../signup/Signup';
import styles from './Signin.module.css';
import axios from 'axios';


axios.defaults.withCredentials = true;
const Signin = ({clickCloseBtn, handleResponseSuccess }) => {
  
    //로그인정보 상태
    const [loginInfo, setLoginInfo] = useState({
      userId: '',
      password: ''
    });
  
 /**********************페이지 컨트롤 부분***************************/ 
//에러메세지 상태
  const [errorMessage, setErrorMessage] = useState('');
//로그인창에 있는 가입창 누름여부 상태 
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const clickSignUpBtn = () => {
    setIsSignUpClicked(!isSignUpClicked); 
  };
//input창이랑 연결 메소드
  const handleInputValue =(key) =>  (e) => {
    setLoginInfo({...loginInfo, [key]: e.target.value});
  }
  const { userId, password } = loginInfo;

 /**********************sign in 컨트롤 부분***************************/ 

//로그인버튼 클릭시 호출 메소드 
  const handleLogin = ()=> {
    if(!userId || !password){
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요');
    }else{
      setErrorMessage('');
      // axios.post("http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/sign-in",loginInfo,{
      //   'Content-Type': 'application/json'
      // })
      // .then(result => {//result.data.data.accessToken
      //   handleResponseSuccess(result)  //result.data.message="ok"!!
      //   // clickCloseBtn()  ::제대로 받아왔을경우 사인인창 없애기 
      // })
      // .catch(err=> {
      //   throw err
      // });
      //잘 로그인이 된경우 => 쿠키에 토큰이 들어가고 messaage로 ok를 받음 
      handleResponseSuccess({message:"ok"});
      clickCloseBtn();
    }
  }

  /********************** 구글 오아쓰***************************/ 

  const GOOGLE_CLIENT_ID = ""
  const GOOGLE_LOGIN_URL = ""
  const googleLoginHandler = ()=> {
    window.location.assign(GOOGLE_LOGIN_URL)
  }


    return(
    <section className={styles.backdrop}>
      {isSignUpClicked ?
        <Signup isSignUpClicked={isSignUpClicked} 
          setIsSignUpClicked={setIsSignUpClicked}
          clickCloseBtn={clickCloseBtn}/>
      : null
      }
      <div className={styles.signin}>
        <div className={styles.titlebox}>
          <span className={styles.title}>sign in</span>
          <span className={styles.close} onClick={clickCloseBtn}>
            <img src="../../../images/close.svg" className={styles.img}></img>
          </span>
        </div>

  <form className={styles.form} onSubmit={(e) => e.preventDefault()}> 
        <ul className={styles.list}>
           <li className={styles.item}>
                <input type="text" className={styles.text} onChange={handleInputValue('userId')} placeholder="아이디를 입력하세요"/>
          </li>
          <li className={styles.item}>
                <input type="password" className={styles.text} onChange={handleInputValue('password')} placeholder="비밀번호를 입력하세요"/>
          </li>
         
          {
          errorMessage ? 
          (<li className={styles.alert}>{errorMessage}</li>) 
          : null
          }

          <li className={styles.item}>
            <button className={styles.button} onClick={handleLogin}>
              Sign in 
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={googleLoginHandler}>
                Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.signup}  onClick={clickSignUpBtn} >
                Sign up
            </button>
          </li>
        </ul>
        
 </form>   
 
  
      </div>
    </section>




  
    );
}

export default Signin;
