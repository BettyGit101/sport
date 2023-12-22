import {lazy, Suspense} from 'react';
import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentPlayersList } from './store/playersSlice';

import Header from './ui/Header';
import styles from './App.module.css';
import useFetch from './hooks/useFetch';
import { RootState } from './store/store';
import CurrentPlayers from './pages/CurrentPlayers';
import FavoritedPlayers from './pages/FavoritedPlayers';
import { FetchCallData } from './assets/playersType';
import { NBA_PLAYERS_API, KEY_NBA_PLAYERS_DATA, PAGE_TITLE } from './assets/constants';


const requestDetails = {
  url: NBA_PLAYERS_API
}

const App = () => {
  const dispatch = useDispatch()
  const NotificationLazy = lazy(() => import('./ui/Notification'));

  const { isLoading, error, sendRequest: fetchPlayersData } = useFetch(KEY_NBA_PLAYERS_DATA);
  const currentPlayersList = useSelector((state: RootState) => state.players.currentPlayersList)

  const displayPlayersData = () => {
    return (
      <div className={styles.container__content}>
        <CurrentPlayers />
        <FavoritedPlayers />
      </div>
    )
  }

  let pageContent;
  if (isLoading) {
    pageContent = <div className={styles.container__spinner}>
                       <CircularProgress /></div>
  }
  else if (error) {
    pageContent = <Suspense>
                    <NotificationLazy message={error}/>
                  </Suspense>
  }
  else if (currentPlayersList?.length > 0) {
    pageContent = displayPlayersData();
  }

  const setFetchedPlayersData = (apiData: FetchCallData) => {
    dispatch(updateCurrentPlayersList(apiData.data));
    localStorage.setItem(KEY_NBA_PLAYERS_DATA, JSON.stringify(apiData));
  }

  useEffect(() => {
    fetchPlayersData(requestDetails, setFetchedPlayersData);
  }, []);


  return (
    <div>
      <Header title={PAGE_TITLE} size="large" />
      {pageContent}
    </div>
  );
}

export default App;
