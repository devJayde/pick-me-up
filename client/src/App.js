import styles from "./App.module.css";
import React, { useState, useEffect } from "react";
import Navbar from "./pages/navbar/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Footer from "./pages/footer/Footer";
import MainFeeds from "./pages/mainFeeds/MainFeeds";
import Mypage from "./pages/mypage/Mypage";
import Writing from "./pages/writing/Writing";
import Feed from "./pages/feed/Feed";
import ScrollButton from "./components/scrollButton/ScrollButton";
import axios from "axios";
import Update from "./pages/update/Update";
import MyinfoModify from "./pages/myinfoModify/MyinfoModify";
import ScrollTop from "./components/scrollTop/ScrollTop";


function App() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [info, setInfo] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [isGoogle, setIsGoogle] = useState(false);

  const isAuthenticated = (accessToken) => {
    setAccessToken(accessToken);
    axios
      .get(
        "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/user/auth",
        {
          headers: {
            authorization: accessToken,
          },
          "Content-Type": "application/json",
        }
      )
      .then((result) => {
        const { id, user_id, nickname, password, phone_number } =
          result.data.data.userInfo;
        setInfo({
          id: id,
          userid: user_id,
          nickname: nickname,
          mobile: phone_number,
          password: password,
          password2: "",
        });
      });
  };
  const storageToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (storageToken) {
      loginHandler();
      isAuthenticated(JSON.parse(storageToken));
    }
  }, [accessToken]);

  const handleResponseSuccess = (data) => {
    const { accessToken, message } = data;
    setAccessToken(accessToken);
    loginHandler();
    isAuthenticated(accessToken);
  };

  useEffect(() => {
    //console.log("useEffect...");
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");

    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }

    return () => {};
  }, []);

  /*********************메인 페이지 컨트롤 부분***************************/
  const [feeds, setFeeds] = useState([]); //전체 피드리스트
  const [selectedFeed, setSelectedFeed] = useState(null); //선택된 피드페이지(투표)로 이동할 때
  const [revised, setRevised] = useState(null); //writing 할 피드 선택된 것.
  const [listRender, setListRender] = useState(true);
  const [sortValue, setSortValue] = useState('최신순');

  useEffect(() => {
    setTimeout(() => {
      axios
      .get(
        "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post"
      )
      .then((res) => {
        if(sortValue === '최신순'){
          let result = res.data.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          setFeeds(
            result.map((el) => {
              return {...el, tags: JSON.parse(el.tags),
            }}))
        } else if(sortValue==='인기순'){
          let result = res.data.data.sort((a, b) => {
            return (b.option1_count+b.option2_count) - (a.option1_count+a.option2_count);
          });
          setFeeds(
            result.map((el) => {
              return {...el, tags: JSON.parse(el.tags),
            }}))
        }
      });
    }, 300);
  }, [listRender]); //글쓰기 버튼이 눌려질 때 마다 axiosGET요청 보내기.

  const select = (el) => {
    //썸네일 클릭 시
    setSelectedFeed(el);
  };

  const listFilter = (tag) => {
    if (tag === "전체") {
      axios
        .get(
          "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post"
        )
        .then((res) => {
          if(sortValue === '최신순'){
          let result = res.data.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          setFeeds(
            result.map((el) => {
              return {...el, tags: JSON.parse(el.tags),
            }}))
          } else if(sortValue==='인기순'){
            let result = res.data.data.sort((a, b) => {
              return (b.option1_count+b.option2_count) - (a.option1_count+a.option2_count);
            });
            setFeeds(
              result.map((el) => {
                return {...el, tags: JSON.parse(el.tags),
              }}))
          }
        });
    } else {
      axios
        .get(
          "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/get-all-post"
        )
        .then((res) => {
          let result = res.data.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          }); //최신순으로 정렬
          if(sortValue==='인기순'){
            result = res.data.data.sort((a, b) => {
              return (b.option1_count+b.option2_count) - (a.option1_count+a.option2_count);
            })
          }
          result = result.map((el) => {
            return {...el, tags: JSON.parse(el.tags),
            };
          }); //배열 파싱하고...
          result = result.filter((el) => el.tags.includes(tag));
          setFeeds(result);
        });
    }
  };

  const revise = (el) => {
    //update할 포스트 정보 상태에 끼워넣고 /update페이지로 보내주기.
    setRevised(el);
  };
  
  const feedSort = (event) => { //select태그 클릭 시 axios요청 안 보내고 있는 feeds상태값을 그냥 정렬.
    setSortValue(event.target.value)
    // console.log(event.target.value)
    if(event.target.value==='최신순'){
      let result = feeds.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      result = result.map((el) => {
        return {...el, tags: JSON.parse(el.tags),
        };
      })
      setFeeds([...result]);
    } else if(event.target.value==='인기순'){
      let result = feeds.sort((a, b) => {
        return (b.option1_count+b.option2_count) - (a.option1_count+a.option2_count);
      });
      result = result.map((el) => {
        return {...el, tags: JSON.parse(el.tags),
        };
      })
      setFeeds([...result]);
    }
  }

  /**********************sign in 컨트롤 부분***************************/


  //로그인상태 변경 메소드
  const loginHandler = () => {
    setIsLogin(true);
  };
  //사인아웃클릭시
  const onSignout = () => {
    axios
      .post(
        "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/sign-out"
      )
      .then((result) => {
        //비워진 엑세스 토큰을 받아서
        setIsLogin(false);
        setInfo(null);
        setAccessToken(result.data.accessToken);
        browserHistory.push("/");
      });
    setIsLogin(false);
    setIsGoogle(false);
    localStorage.removeItem("accessToken");
    setAccessToken(null);
  };

  useEffect(() => {
    const storageToken = localStorage.getItem("accessToken");
    //console.log(isGoogle);
    const a = Math.random();
    if (storageToken) {
      loginHandler();
      if (isGoogle) {
      } else {
        isAuthenticated(JSON.parse(storageToken));
      }
    }
  }, [accessToken]);

  const getUserInfo = async (accessToken) => {
    const res = await axios.get(
      `http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/receive/userinfo?accessToken=${accessToken}`
    );
    return res.data;
  };

  const getAccessToken = async (authorizationCode) => {
    try {
      const res = await axios.post(
        `http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/receive/token`,
        {
          authorizationCode,
        }
      );

      localStorage.setItem(
        "accessToken",
        JSON.stringify(res.data.access_token)
      );
      console.log(res.data.access_token);
      setIsGoogle(true);
      setAccessToken(res.data.access_token);
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(res.data.access_token);
      const userInfo = await getUserInfo(res.data.access_token);
      console.log(userInfo);

      if (refreshToken === null) {
        //최초 1회
        //isrefreshToken(false); //회원가입 필요한 상태
        //useEffect - getAccessToken이 종료되고 실행된다.
        const tmpInfo = {
          userId: userInfo.email,
          password: "123456",
          userName: `google1234`,
          mobile: "010-1234-1234",
          signUpType: "google",
        };
        setInfo(tmpInfo);
        axios.post(
          "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/sign-up",
          tmpInfo,
          {
            "Content-Type": "application/json",
            // withCredentials: true,
          }
        );
        setIsLogin(true);
        localStorage.setItem("refreshToken", res.data.refresh_token);
      } else {
        setIsGoogle(true);
        setIsLogin(true);
        const loginInfo = {
          userId: userInfo.email,
          password: "123456",
        };
        axios
          .post(
            "http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/sign-in",
            loginInfo
          )
          .then((result) => {
            if (result.data.message === "ok") {
              window.localStorage.removeItem("accessToken");
              console.log(result.data.accessToken);
              window.localStorage.setItem(
                "accessToken",
                JSON.stringify(result.data.accessToken)
                // result.data.accessToken
              );
              handleResponseSuccess(result.data); //result.data.message="ok"!!
              //::제대로 받아왔을경우 사인인창 없애기
            }
          });
        history.push("/");
        //이미 가입한 user
        //로그인 시켜줌.
      }
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      {/* {
      isLoading ? <LoadingIndicator /> 
      : */}
      <body className={styles.body}>
        <Router>
          <Navbar
            setListRender={() => setListRender(!listRender)}
            handleResponseSuccess={handleResponseSuccess}
            onSignout={onSignout}
            isLogin={isLogin}
            info={info}
            isAuthenticated={isAuthenticated}
            setInfo={setInfo}
            accessToken={accessToken}
          />
          <main id="page">
            <ScrollTop>
              <Switch>
                <Route exact={true} path="/">
                  <MainFeeds
                    feeds={feeds}
                    filterHandle={listFilter}
                    handleClick={select}
                    listRender={listRender}
                    sortValue={sortValue}
                    feedSort={feedSort}
                  />
                </Route>
                <Route path="/mypage">
                  <Mypage
                    handleContent={revise}
                    info={info}
                    setInfo={setInfo}
                    accessToken={accessToken}
                    isLogin={isLogin}
                    handleFeeds={select}
                    isAuthenticated={isAuthenticated}
                    setListRender={() => setListRender(!listRender)}
                  />
                </Route>
                <Route path="/modifyinfo">
                  <MyinfoModify
                    info={info}
                    setInfo={setInfo}
                  setAccessToken={setAccessToken}
                  accessToken={accessToken}
                  isLogin={isLogin}
                  isAuthenticated={isAuthenticated}
                /> 
                {/* <Mypage handleContent={revise} info={info} setInfo={setInfo} /> */}
                </Route>
                <Route path="/writing">
                  <Writing
                    accessToken={accessToken}
                    isLogin={isLogin}
                    setListRender={() => setListRender(!listRender)}
                  />
                </Route>
                <Route path="/update">
                  <Update feed={revised} 
                  accessToken={accessToken}
                  setListRender={() => setListRender(!listRender)} />
                </Route>
                {selectedFeed ? ( //피드 클릭했으면 여기서 feed페이지로 감!
                  <Route path="/feed">
                    <Feed
                      feed={selectedFeed}
                      accessToken={accessToken}
                      isLogin={isLogin}
                      setListRender={() => setListRender(!listRender)}
                    />
                  </Route>
                ) : null}
              </Switch>
            </ScrollTop>
          </main>
          <Footer></Footer>
          <ScrollButton />
        </Router>
      </body>
      {/* } */}
    </>
  );
}

export default App;
export const browserHistory = createBrowserHistory();

