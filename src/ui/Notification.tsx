import {memo} from 'react';
import styles from './Notification.module.css';

const Notification = (props: { message: string }) => {
    return (
        <div className={styles.notification}>
            <p className={styles.notification__message}>{props.message}</p>
        </div>
    )
}

export default memo(Notification);
