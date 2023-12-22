import {memo} from 'react';
import styles from './GridColumnNames.module.css';

function GridColumnNames() {
  return (
    <div className={styles.grid__columnNames}>
          <span className={styles.grid__item}>FIRST NAME</span>
          <span className={styles.grid__item}>LAST NAME</span>
          <span className={styles.grid__item}>TEAM NAME</span>
    </div>
  )
}

export default memo(GridColumnNames);