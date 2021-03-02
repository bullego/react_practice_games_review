import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchGamesTC, clearSearchedGamesAC } from '../../redux/games-reducer';
import Game from '../../components/Game';
import GameDetails from '../../components/GameDetails';
import Navbar from '../../components/Navbar';
//Animation
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { fadeIn } from '../../animation';

const HomePage = () => {
	const dispatch = useDispatch();
	const {popularGames, upcomingGames, newGames, searchedGames} = useSelector(state => state.games);
	const location = useLocation();
	const pathId = location.pathname.split('/')[2]; //get 'id' from URL

  useEffect(() => {
    dispatch(fetchGamesTC())
  }, [dispatch])

	const clearSearchedGames = () => {
		dispatch(clearSearchedGamesAC())
	}

	return (
		<AnimateStyle variants={fadeIn} initial='hidden' animate='show'>
			<div className='homepage_container'>
				<Navbar/>

				{ pathId && <GameDetails/> }

				{ searchedGames.length ? (
					<>
						<div className='searched_wrap'>
							<h2>Searched Games</h2>
							<button onClick={clearSearchedGames}>Reset search</button>
						</div>
						
						<div className='game_items'>
							{ searchedGames.map(game => (
								<Game key={game.id}
											id={game.id}
											name={game.name}
											released={game.released}
											imagePath={game.background_image}/>
							))}
						</div>
					</>
				) : null}

				<h2>Upcoming Games</h2>
				<div className='game_items'>
					{ upcomingGames.map(game => (
						<Game key={game.id}
									id={game.id}
									name={game.name}
									released={game.released}
									imagePath={game.background_image}/>
					))}
				</div>

				<h2>Popular Games</h2>
				<div className='game_items'>
					{ popularGames.map(game => (
						<Game key={game.id}
									id={game.id}
									name={game.name}
									released={game.released}
									image={game.background_image}/>
					))}
				</div>

				<h2>New Games</h2>
				<div className='game_items'>
					{ newGames.map(game => (
						<Game key={game.id}
									id={game.id}
									name={game.name}
									released={game.released}
									image={game.background_image}/>
					))}
				</div>
			</div>
		</AnimateStyle>
	)
}

const AnimateStyle = styled(motion.div)``;

export default HomePage;
