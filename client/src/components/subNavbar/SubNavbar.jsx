import React, { useState, useEffect } from 'react';
import styles from './SubNavbar.module.css'
import { Link } from 'react-router-dom';

const SubNavbar = ({filterHandle}) => {

  const tags=['전체', '#의류', '#리빙', '#뷰티', '#식품', '#잡화', '#디지털']
  const [tagClicked, setTagClicked] = useState('전체');

  const tagHandle = (el) => {
    setTagClicked(el);
    filterHandle(el);
  }

  // useEffect(() => {
  //   filterHandle('전체')
  // }, []) //default로 전체 피드 보여주기.

  return (
    <>
      <div className={styles.categories}>
        {tags.map(el => <span className={el===tagClicked? styles.hashtagClicked :styles.hashtag} onClick={()=>tagHandle(el)}>{el}</span>)}
      </div>
      <div className={styles.writingBtn}>
        <Link to="/writing">
          <button className={styles.button}>글쓰기</button>
        </Link>
      </div>
    
    
    </>
  )
}
export default SubNavbar;

