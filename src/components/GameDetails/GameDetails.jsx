import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { smallImage } from '../../util';
import playstation from '../../assets/playstation.svg';
import steam from '../../assets/steam.svg';
import xbox from '../../assets/xbox.svg';
import nintendo from '../../assets/nintendo.svg';
import apple from '../../assets/apple.svg';
import gamepad from '../../assets/gamepad.svg';
import starEmpty from '../../assets/star-empty.png';
import starFull from '../../assets/star-full.png';


const GameDetails = () => {
	const {screenshot, gameDetails, isLoading} = useSelector(state => state.details);
	const history = useHistory();

	const exitGameDetailsHandler = (e) => {
		const elem = e.target;

		if(elem.classList.contains('popup_shadow')) {
			document.body.style.overflow = 'auto';
			history.push('/')
		}
	}

	const getRatingStars = () => {
		const stars = [];
		const rating = Math.floor(gameDetails.rating);

		for(let i=1; i<=5; i++) {
			if(i <= rating) {
				stars.push(<img key={i} src={starFull} alt='rating'/>)
			} else {
				stars.push(<img key={i} src={starEmpty} alt='rating'/>)
			}
		}
		return stars;
	}

	const getPlayPlatform = (platform) => {
		switch(platform) {
			case 'PlayStation 4': 
				return playstation
			case 'Xbox One': 
				return xbox
			case 'PC': 
				return steam
			case 'Nintendo Switch': 
				return nintendo
			case 'iOS': 
				return apple
			default:
				return gamepad
		}
	}

	return (
		<>
			{ !isLoading && (
				<div className="card_popup popup_shadow"
						 onClick={exitGameDetailsHandler}>
					<div className="detail">
						<div className="stats">
							<div className="rating">
								<h3>{gameDetails.name}</h3>
								<p>Rating: {gameDetails.rating}</p>
								{getRatingStars()}
							</div>

							<div className="info">
								<h3>Platforms</h3>
								<div className="platforms">
									{gameDetails.platforms.map(data => (
										<img key={data.platform.id}
												 src={getPlayPlatform(data.platform.name)}
												 alt={data.platform.name}/>
									))}
								</div>
							</div>
						</div>

						<div className="media">
							<img src={gameDetails.background_image && smallImage(gameDetails.background_image)}
									 alt={gameDetails.name}/>
						</div>

						<div className="desc">
							<p>{gameDetails.description_raw}</p>
						</div>

						<div className="gallery">
							{screenshot.results.map(data => (
								<img key={data.id}
										 src={data.image && smallImage(data.image)}
										 alt="game"/>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default GameDetails;