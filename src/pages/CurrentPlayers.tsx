import { useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../ui/Header';
import Grid from '../components/Grid';
import { RootState } from '../store/store';
import Filter from '../components/Filter';
import Pagination from '../ui/Pagination';
import styles from './CurrentPlayers.module.css';
import {
  ROWS_PER_PAGE, SEARCH_CATEGORIES, NO_PLAYERS_FOUND,
  CURRENT_PLAYERS
} from '../assets/constants';

const CurrentPlayers = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const isFiltered = useSelector((state: RootState) => state.players.isFiltered)
  const currentPlayersList = useSelector((state: RootState) => state.players.currentPlayersList)
  const filteredPlayersList = useSelector((state: RootState) => state.players.filteredPlayers)

  const playersList = isFiltered ? filteredPlayersList : currentPlayersList;

  if (isFiltered && currentPage !== 1) {
    setCurrentPage(1)
  }

  const lastRowIndex = currentPage * ROWS_PER_PAGE;
  const firstRowIndex = lastRowIndex - ROWS_PER_PAGE;
  const paginationRows = playersList.slice(firstRowIndex, lastRowIndex);
  const isListEmpty = paginationRows.length === 0;

  return (
    <div className={styles.currentPlayer}>
      <Header title={CURRENT_PLAYERS} size="small" />
      <Filter categories={SEARCH_CATEGORIES} />

      <div className={styles.currentPlayer__grid}>
        <Grid message={NO_PLAYERS_FOUND}
          playersData={paginationRows}
          isListEmpty={isListEmpty} />
      </div>

      {!isListEmpty &&
        <Pagination
          totalItems={playersList.length}
          itemsPerPage={ROWS_PER_PAGE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
      }

    </div>
  )
}
export default CurrentPlayers;