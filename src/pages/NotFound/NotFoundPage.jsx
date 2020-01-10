import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css'
class NotFoundPage extends React.Component{
    render(){
        return  (
        <div className={styles.container}>
        <div id="notfound">
          <div className={styles.notfound}>
            <div className={styles.notfound_404}>
              <h1>404</h1>
            </div>
            <h2>Oops, Không có trang bạn cần tìm !</h2>
            <form className={styles.notfound_search}>
              <input type="text" placeholder="Search..."/>
              <button type="button">Search</button>
            </form>
            <Link to="/"><span className={styles.arrow}></span>Quay lại Trang Chủ</Link>
          </div>
        </div>
        </div>
        )
    }
}
export default NotFoundPage;
