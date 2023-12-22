import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PlayerState, PlayerData, PlayersSearchFilter } from '../assets/playersType';

const initialState: PlayerState = {
    filteredPlayers: [],
    currentPlayersList: [],
    selectedPlayersList: [],
    isFiltered: false,
}

export const playerSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        updateCurrentPlayersList: (state, action: PayloadAction<PlayerData[]>) => {
            
            return {
                ...state,
                currentPlayersList: action.payload
            }
        },
        searchPlayersByFilter: (state, action: PayloadAction<PlayersSearchFilter>) => {
            let filtered: PlayerData[] = [];
            const searchedValue = action.payload.value.toLowerCase();

            if (action.payload.category === 'First name') {
                filtered = state.currentPlayersList.filter(player => player.first_name.toLowerCase() === searchedValue)
            }
            if (action.payload.category === 'Last name') {
                filtered = state.currentPlayersList.filter(player => player.last_name.toLowerCase() === searchedValue)
            }
            if (action.payload.category === 'Team name') {
                filtered = state.currentPlayersList.filter(player => player.team.name.toLowerCase() === searchedValue)
            }

            return {
                ...state,
                filteredPlayers: filtered,
                isFiltered: true

            }
        },
        removeSearchPlayersFilter: (state) => {
            return {
                ...state,
                filteredPlayers: [],
                isFiltered: false,
            }
        },
        addSelectedPlayer: (state, action: PayloadAction<PlayerData>) => {
            const updatedSelectedPlayersList = [...state.selectedPlayersList];
            let isPlaterExists = updatedSelectedPlayersList.some(player => player.id === action.payload.id)
            
            if (!isPlaterExists) {
                const selectedPlayer = {
                    ...action.payload,
                    isSelected: true
                }
                updatedSelectedPlayersList.push(selectedPlayer)
            }

            return {
                ...state,
                selectedPlayersList: updatedSelectedPlayersList
            }
        },
        removeSelectedPlayer: (state, action: PayloadAction<PlayerData>) => {
            let filteredSelectedPlayers = state.selectedPlayersList.filter(player => player.id !== action.payload.id)
            return {
                ...state,
                selectedPlayersList: filteredSelectedPlayers
            }
        },
        removeAllFromSelectedPlayersList: (state) => {
            return {
                ...state,
                selectedPlayersList: []
            }
        }
    },
})

export const {
    updateCurrentPlayersList, searchPlayersByFilter,
    removeSearchPlayersFilter, addSelectedPlayer,
    removeSelectedPlayer, removeAllFromSelectedPlayersList
} = playerSlice.actions

export default playerSlice.reducer;