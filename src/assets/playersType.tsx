export type ApplyData = (data: any) => void;

export type RequestDetails = {
    url: string,
    method?: string,
    headers?: any,
    body?: any
}

export type FetchCallData = {
    data: PlayerData[],
    meta: MetaData
}

export type PlayerData = {
    first_name: string,
    height_feet: number,
    height_inches: number,
    id: number,
    last_name: string,
    position: string,
    team: TeamData,
    weight_pounds: number
}

type MetaData = {
    current_page: number,
    next_page: number,
    per_page: number,
    total_count: number,
    total_pages: number
}

type TeamData = {
    abbreviation: string,
    city: string,
    conference: string,
    division: string,
    full_name: string,
    id: number,
    name: string,
}

export type PagePagination = {
    totalItems: number,
    itemsPerPage: number,
    currentPage: number,
    setCurrentPage: () => void,
}

export type PlayerState = {
    filteredPlayers: PlayerData[],
    currentPlayersList: PlayerData[],
    selectedPlayersList: SelectedPlayerData[],
    isFiltered: boolean
}

export type SelectedPlayerData = {
    first_name: string,
    height_feet: number,
    height_inches: number,
    id: number,
    last_name: string,
    position: string,
    team: TeamData,
    weight_pounds: number,
    isSelected: boolean
}

export type PlayersSearchFilter = {
    value: string,
    category: string
}

export type GridProps = {
    isListEmpty: boolean,
    message: string,
    playersData: PlayerData[]
}