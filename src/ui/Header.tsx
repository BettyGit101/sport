import {memo} from 'react';
import styles from './Header.module.css';

const Header = (props: { title: string, size: string }) => {

    return (
        <div className={`${styles[props.size]} ${styles.header__title}`}>
            {props.title}
        </div>
    )
}

export default memo(Header)