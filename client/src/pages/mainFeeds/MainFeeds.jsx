import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainFeeds.module.css";
import SubNavbar from "../../components/subNavbar/SubNavbar";
import FeedContent from "../../components/feedContent/FeedContent";

const MainFeeds = ({ feeds, filterHandle, handleClick, listRender, sortValue, feedSort}) => {
  //로딩스피너 시험 =====================

  return (
    <section className={styles.main}>
      <SubNavbar filterHandle={filterHandle}
      tagReset={listRender}
      sortValue={sortValue}
      feedSort={feedSort} />
      <ul className={styles.feedList}>
        <Link to="/feed">
          {feeds.map((el) => (
            <FeedContent feed={el} 
            handleSelect={handleClick} />
          ))}
        </Link>
      </ul>
    </section>
  );
};

export default MainFeeds;
