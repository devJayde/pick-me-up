import React, { useState, useEffect } from 'react';
import styles from './SubNavbar.module.css'
import { Link } from 'react-router-dom';

const SubNavbar = ({filterHandle, tagReset, feedSort, sortValue}) => {

  const tags=['전체', '#일상', '#리빙', '#뷰티', '#음식', '#디지털']
  const [tagClicked, setTagClicked] = useState('전체');

  const tagHandle = (el) => {
    setTagClicked(el);
    filterHandle(el);
  }

  useEffect(() => {
    setTagClicked('전체')
  }, [tagReset]) //로고버튼 누르면 listRender 작동. listRender-->tagReset으로 가져와서 상태 전체로 변경시키기

  return (
    <>
      <div className={styles.categories}>
        {tags.map(el => <span className={el===tagClicked? styles.hashtagClicked :styles.hashtag} onClick={()=>tagHandle(el)}>{el}</span>)}
      </div>
      <div className={styles.writingBtn}>
        <select className={styles.sort} value={sortValue} onChange={feedSort} >
          <option value="최신순">최신순</option>
          <option value="인기순">인기순</option>
        </select>
        <Link to="/writing">
          <button className={styles.button}>글쓰기</button>
        </Link>
      </div>
    
    
    </>
  )
}
export default SubNavbar;