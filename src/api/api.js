import axios from 'axios';

// const API_KEY = 'c5cb83f1e52842d9a4c11ef8100979c1';
const baseURL = 'https://api.rawg.io/api/';

//create current date for API request
//month
const getCurrentMonth = () => {
	const month = new Date().getMonth() + 1;

	if(month < 10) {
		return `0${month}`
	} else {
		return month
	}
}
//day
const getCurrentDay = () => {
	const day = new Date().getDate();

	if(day < 10) {
		return `0${day}`
	} else {
		return day
	}
}
//year/month/day
const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();

//full date
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`

//popular games
const popular_games_url = `games?dates=${lastYear},${currentDate}&ordering=-rating&page_size=9`;
const popularGamesURL = () => `${baseURL}${popular_games_url}`;
//upcoming games
const upcoming_games_url = `games?dates=${currentDate},${nextYear}&ordering=-added&page_size=9`;
const upcomingGamesURL = () => `${baseURL}${upcoming_games_url}`;
//new games
const new_games_url = `games?dates=${lastYear},${currentDate}&ordering=-released&page_size=9`;
const newGamesURL = () => `${baseURL}${new_games_url}`;
//game details
const gameDetailsURL = (game_id) => `${baseURL}games/${game_id}`
//game screenshot
const gameScreenShotURL = (game_id) => `${baseURL}games/${game_id}/screenshots`
//search game
const searchedGameURL = (game_name) => `${baseURL}games?search=${game_name}&page_size=6`


export const gamesAPI = {
	getPopularGames() {
		return axios.get(popularGamesURL())
	},
	getUpcomingGames() {
		return axios.get(upcomingGamesURL())
	},
	getNewGames() {
		return axios.get(newGamesURL())
	},
	getGameDetails(game_id) {
		return axios.get(gameDetailsURL(game_id))
	},
	getScreenShot(game_id) {
		return axios.get(gameScreenShotURL(game_id))
	},
	getSearchedGames(game_name) {
		return axios.get(searchedGameURL(game_name))
	}
}