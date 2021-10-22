import React from 'react';
import styles from './Nullpage.module.css';

const NullPage = () => {
    return (
        <section className={styles.container}>
                <div className={styles.text}>
                    로그인이 필요합니다.
                </div>
      </section>
    );
};

export default NullPage;