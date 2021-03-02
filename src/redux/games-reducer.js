import { gamesAPI } from '../api/api';

const FETCH_GAMES = 'games_review/FETCH_GAMES';
const FETCH_SEARCHED_GAMES = 'games_review/FETCH_SEARCHED_GAMES';
const CLEAR_SEARCHED_GAMES = 'games_review/CLEAR_SEARCHED_GAMES';

const initState = {
	popularGames: [],
	upcomingGames: [],
	newGames: [],
	searchedGames: []
}

const gamesReducer = (state = initState, action) => {
	switch(action.type) {
		case FETCH_GAMES:
			return {
				...state,
				popularGames: action.gamesData.popularGames,
				upcomingGames: action.gamesData.upcomingGames,
				newGames: action.gamesData.newGames
			}
		case FETCH_SEARCHED_GAMES:
			return {
				...state,
				searchedGames: action.searchedGamesData
			}
		case CLEAR_SEARCHED_GAMES:
			return {
				...state,
				searchedGames: []
			}
		default:
			return {...state}
	}
}
export default gamesReducer;


//Action Creator
const showGamesAC = (gamesData) => {
	return {
		type: FETCH_GAMES,
		gamesData
	}
}

const showSearchedGamesAC = (searchedGamesData) => {
	return {
		type: FETCH_SEARCHED_GAMES,
		searchedGamesData
	}
}

export const clearSearchedGamesAC = () => {
	return {
		type: CLEAR_SEARCHED_GAMES
	}
}

//Thunk Creator
export const fetchGamesTC = () => async (dispatch) => {
  try {
		const popularGames = await gamesAPI.getPopularGames();
		const upcomingGames = await gamesAPI.getUpcomingGames();
		const newGames = await gamesAPI.getNewGames();

		const data = {
			popularGames: popularGames.data.results,
			upcomingGames: upcomingGames.data.results,
			newGames: newGames.data.results
		}

    dispatch(showGamesAC(data));
	}
	catch(error) {
    alert(`Download games ${error}`)
  }
};

export const fetchSearchedGamesTC = (game_name) => async (dispatch) => {
  try {
		const searchedGames = await gamesAPI.getSearchedGames(game_name);
		const data = searchedGames.data.results;

    dispatch(showSearchedGamesAC(data));
	}
	catch(error) {
    alert(`Download games ${error}`)
  }
};