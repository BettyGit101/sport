import { useState } from 'react';
import { RootState } from '../store/store';

import { useDispatch, useSelector } from 'react-redux';
import {addSelectedPlayer, removeSelectedPlayer} from '../store/playersSlice';
import { PlayerData } from '../assets/playersType';
import styles from './SinglePlayer.module.css';

const SinglePlayer = (props: { data: PlayerData }) => {
  const dispatch = useDispatch();
  const selectedPlayersList = useSelector((state: RootState) => state.players.selectedPlayersList)

  const [isSelected, setIsSelected] = useState(false);
  const selectedRowStyle = isSelected ? 'selected__row' : ''

  const selectPlayerHandler = () => {  
    const isCurrentPlayerSelected = selectedPlayersList.some(player => player.id === props.data.id) 
    setIsSelected(!isCurrentPlayerSelected);

    if (isCurrentPlayerSelected) {
      dispatch(removeSelectedPlayer(props.data))
    }
    else {
      dispatch(addSelectedPlayer(props.data))
    }
  }

  return (
    <div onClick={selectPlayerHandler} className={`${styles.grid__container} ${styles[selectedRowStyle]}`}>
      <span className={styles.grid__item}>{props.data.first_name}</span>
      <span className={styles.grid__item}>{props.data.last_name}</span>
      <span className={styles.grid__item}>{props.data.team.name}</span>
    </div>
  )
}

export default SinglePlayer