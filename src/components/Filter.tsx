import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TextField, MenuItem, Button } from '@mui/material';

import { BOX_SIZE } from '../assets/constants';
import styles from './Filter.module.css';
import { RootState } from '../store/store';
import { searchPlayersByFilter, removeSearchPlayersFilter } from '../store/playersSlice';

const Filter = (props: { categories: string[] }) => {
    const dispatch = useDispatch()
    const isFiltered = useSelector((state: RootState) => state.players.isFiltered)

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const selectedCategoryHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedCategory(e.target.value)
    }

    const selectedValueHandler = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedValue(e.target.value)
    }

    const searchHandler = () => {
        if (selectedValue && selectedCategory) {
            dispatch(searchPlayersByFilter({
                value: selectedValue,
                category: selectedCategory
            }))
        }
    }

    const removeSearchHandler = () => {
        if (isFiltered) {
            dispatch(removeSearchPlayersFilter())
        }
        setSelectedValue('');
        setSelectedCategory('');
    }

    return (
        <div className={styles.filter}>
            <Box sx={BOX_SIZE}>
                <TextField label="Select Category"
                    value={selectedCategory}
                    select fullWidth
                    onChange={selectedCategoryHandler}>
                    {props.categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
                </TextField>
            </Box>

            <Box sx={BOX_SIZE}>
                <TextField label="Enter a value"
                    value={selectedValue}
                    fullWidth
                    onChange={selectedValueHandler}>
                </TextField>
            </Box>

            <Button onClick={searchHandler} variant='outlined' startIcon={<SearchIcon />} style={{ height: '47px' }}>Search</Button>
            <Button onClick={removeSearchHandler} variant='outlined' startIcon={<ClearIcon />} style={{ height: '47px' }}>Clear</Button>
        </div>
    )
}

export default Filter;
