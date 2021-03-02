import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGameDetailsTC } from '../../redux/details-reducer';
import { smallImage } from '../../util';
//Animation
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { popup } from '../../animation';


const Game = ({id, name, released, imagePath}) => {
	const dispatch = useDispatch();

	const gameDetailsHandler = () => {
		//block global scroll with popup
		document.body.style.overflow = 'hidden';

		dispatch(fetchGameDetailsTC(id));
	}

	return (
		<AnimateStyle variants={popup} initial='hidden' animate='show'>
			<div className='game_container'
					onClick={gameDetailsHandler}>
				<Link to={`/game/${id}`}>
					<h3>{name}</h3>
					<p>{released}</p>
					<div>
						<img src={imagePath && smallImage(imagePath)} alt={name}/>
					</div>
				</Link>
			</div>
		</AnimateStyle>
	)
}

const AnimateStyle = styled(motion.div)``;

export default Game;