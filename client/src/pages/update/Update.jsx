import React, { useState } from "react";
import styles from "./Update.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;



const Update = ({feed, accessToken, setListRender}) => { //수정하기 클릭했을 때 전달해온 해당 피드...

  //feed가 null일 때 어떠한 컴포넌트라도 보여야 함!(버그)

  const tags = ["#일상", "#리빙", "#뷰티", "#음식", "#디지털"];

  const [title, setTitle] = useState(feed.title); //제목
  const [firstOpt, setFirstOpt] = useState(feed.option1); //옵션명1
  const [secondOpt, setSecondOpt] = useState(feed.option2); //옵션명2
  const [firstImg, setFirstImg] = useState(feed.imgInfo1); //이미지파일
  const [secondImg, setSecondImg] = useState(feed.imgInfo2); //이미지파일
  const [content, setContent] = useState(feed.contents); // 컨텐츠
  const [isClicked, setClicked] = useState(feed.tags); //카테고리 담는 배열

  const [errorMessage, setErrorMessage] = useState(null);

  const titleHandle = (event) => {
    setTitle(event.target.value);
  };

  const firstOptHandle = (event) => {
    setFirstOpt(event.target.value);
  };

  const secondOptHandle = (event) => {
    setSecondOpt(event.target.value);
  };

  const firstImgHandle = (event) => {
    //input file에서 url만 긁어오는 핸들러
    const imageFile = event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setFirstImg(imageUrl);
    } else {
      setFirstImg(null);
    }
  };

  const secondImgHandle = (event) => {
    //input file에서 url만 긁어오는 핸들러
    const imageFile = event.target.files[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setSecondImg(imageUrl);
    } else {
      setSecondImg(null);
    }
  };

  const tagHandle = (tag) => {
    if (isClicked.includes(tag)) {
      setClicked(isClicked.filter((el) => !(el === tag)));
    } else {
      setClicked(isClicked.concat(tag));
    }
  };

  const contentHandle = (event) => {
    setContent(event.target.value);
  };

  const updateFeedHandle = () => {
    // 피드테이블에 레코드 수정하는 axios POST 요청(지영)
    // 해당 피드 페이지로 Redirect 필요

    if (
      title === "" ||
      firstOpt === "" ||
      secondOpt === "" ||
      firstImg === null ||
      secondImg === null ||
      content === "" ||
      isClicked.length === 0
    ) {
      setErrorMessage('항목을 모두 입력하세요!🙏')
    } else{
      axios.post(`http://ec2-3-34-191-91.ap-northeast-2.compute.amazonaws.com/user/posting-list/${feed.id}`, {
        title: title,
        choice_1: firstOpt,
        choice_2: secondOpt,
        img_1 : firstImg, 
        img_2: secondImg, 
        contents: content,
        hashTags: JSON.stringify(isClicked), //배열이니까 JSON?
      }, { 
        headers: {
          authorization: accessToken,
        },
        "Content-Type": "application/json",
      })

      setListRender();
    };
  }


  return (
    <section className={styles.container}>

      <div className={styles.category}>
        <div>제목</div>
        <input className={styles.textBoxTitle} type="text" value={title} onChange={titleHandle}/>
      </div>
      
      <div className={styles.category}>    
        <div>투표 옵션 1</div>
        <input className={styles.textBoxOpt} type="text" placeholder="항목명" value={firstOpt} onChange={firstOptHandle}/>
        <div className={styles.filebox}>
          <input type="file" id="ex_file" accept="image/*" onChange={firstImgHandle}></input>
          {firstImg? <img className={styles.fileView} src={firstImg}></img> : null}
        </div>
      </div>


    <div className={styles.category}>    
      <div>투표 옵션 2</div>
      <input className={styles.textBoxOpt} type="text" placeholder="항목명" value={secondOpt} onChange={secondOptHandle}/>
      <div className={styles.filebox}>
        <input type="file" id="ex_file" accept="image/*" onChange={secondImgHandle}></input>
        {secondImg? <img className={styles.fileView} src={secondImg}></img> : null}
      </div>
    </div>

    <div className={styles.category}>
      <div>내용</div>
      <textarea name="content" id="" cols="30" rows="10" value={content} onChange={contentHandle}></textarea>
    </div>

    <div className={styles.category}>
      <div>카테고리<span class={styles.subTitle}>(복수선택가능)</span></div>
      <div className={styles.tags}>
        {tags.map(el =>{ 
          return <>
            <input type="checkbox" name={el} value={el}/>
            <label className={isClicked.includes(el)? styles.hashtagClicked :styles.hashtag} onClick={()=>tagHandle(el)}>{el}</label>
          </>
        })}
      </div>
    </div>

    <div className={styles.submit}>
          {title === '' || firstOpt === '' || secondOpt ==='' || firstImg === null || secondImg === null || content === '' || isClicked.length === 0 ? 
            <button className={styles.submitBtn} onClick={updateFeedHandle}>등록</button>
          : 
          <Link to="/">
            <button className={styles.submitBtn} onClick={updateFeedHandle}>등록</button>
          </Link>}
          <Link to="/">
            <button className={styles.submitBtn}>취소</button>
          </Link>
        </div>
        <div className={styles.error}>{errorMessage}</div>
  
  </section>
  )
};

export default Update;
