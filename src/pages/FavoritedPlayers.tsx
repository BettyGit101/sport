import { useState } from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import LoopIcon from '@mui/icons-material/Loop';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import Header from '../ui/Header';
import Grid from '../components/Grid';
import { RootState } from '../store/store';
import {PlayerData} from '../assets/playersType';
import styles from './FavoritedPlayers.module.css';
import {removeAllFromSelectedPlayersList} from '../store/playersSlice';
import { BACKGROUND_COLORS, NO_FAVORITED_PLAYERS} from '../assets/constants';


const FavoritedPlayers = () => {
  const dispatch = useDispatch()
  
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState<string>();
  const [displaySelectedPlayers, setDisplaySelectedPlayers] = useState<PlayerData[]>([]);

  const selectedPlayersList = useSelector((state: RootState) => state.players.selectedPlayersList);


  const addNewPlayersToFavoritedHandler = () => {
    setDisplaySelectedPlayers(selectedPlayersList);
  }

  const removeFromFavoritedPlayerHandler = () => {
    setDisplaySelectedPlayers([]);
    dispatch(removeAllFromSelectedPlayersList())
  }

  const changeBackgroundHandler = () => {
    let index = Math.floor(Math.random() * BACKGROUND_COLORS.length);
    let newColor = BACKGROUND_COLORS[index];
    while (currentBackgroundColor === newColor) {
      index = Math.floor(Math.random() * BACKGROUND_COLORS.length);
      newColor = BACKGROUND_COLORS[index];
    }
    setCurrentBackgroundColor(newColor)
  }

  return (
    <div className={styles.favorited} style={{ backgroundColor: currentBackgroundColor }}>
      <Header title="Favorited Players" size="small" />
      <div className={styles.favoried__grid}>
          <Grid message={NO_FAVORITED_PLAYERS}
              playersData={displaySelectedPlayers}
              isListEmpty={displaySelectedPlayers.length === 0} 
            />
      </div>
      <div className={styles.favoried__buttons}>
        <Button size="large" onClick={addNewPlayersToFavoritedHandler} variant='outlined' startIcon={<AddCircleOutlineIcon />}>Add To Favorite</Button>
        <Button size="large" onClick={removeFromFavoritedPlayerHandler} variant='outlined' startIcon={<RemoveCircleOutlineIcon />}>Remove All</Button>
        <Button size="large" onClick={changeBackgroundHandler} variant='outlined' startIcon={<LoopIcon />}>Change Background</Button>
      </div>
    </div>
  )
}

export default FavoritedPlayers;