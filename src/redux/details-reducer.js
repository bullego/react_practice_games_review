import { gamesAPI } from '../api/api';

const FETCH_GAME_DETAILS = 'games_review/FETCH_GAME_DETAILS';
const LOADING_GAME_DETAILS = 'games_review/LOADING_GAME_DETAILS';

const initState = {
	gameDetails: {
		platforms: []
	},
	screenshot: {
		results: []
	},
	isLoading: true
}

const detailsReducer = (state = initState, action) => {
	switch(action.type) {
		case FETCH_GAME_DETAILS:
			return {
				...state,
				gameDetails: action.gameDetails,
				screenshot: action.screenshot,
				isLoading: false
			}
		case LOADING_GAME_DETAILS:
			return {
				...state,
				isLoading: true
			}
		default:
			return {...state}
	}
}
export default detailsReducer;


//Action Creator
const showGameDetailsAC = (gameDetails, screenshot) => {
	return {
		type: FETCH_GAME_DETAILS,
		gameDetails,
		screenshot
	}
}
const loadingGameDetailsAC = () => {
	return {
		type: LOADING_GAME_DETAILS
	}
}

//Thunk Creator
export const fetchGameDetailsTC = (game_id) => async (dispatch) => {
  try {
		dispatch(loadingGameDetailsAC());

		const gameDetails = await gamesAPI.getGameDetails(game_id);
		const screenshot = await gamesAPI.getScreenShot(game_id);
		
		const detailsData = gameDetails.data;
		const screenData = screenshot.data;

    dispatch(showGameDetailsAC(detailsData, screenData));
	}
	catch(error) {
    alert(`Download details game ${error}`)
  }
};