import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchedGamesTC } from '../../redux/games-reducer';
import logo from '../../assets/logo.svg';
//Animation
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { fadeIn } from '../../animation';


const Navbar = () => {
	const dispatch = useDispatch();
	const [textInput, setTextInput] = useState('');

	const inputHandler = (e) => {
		setTextInput(e.target.value);
	}

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(fetchSearchedGamesTC(textInput));

		setTextInput('');
	}

	return (
		<AnimateStyle variants={fadeIn} initial='hidden' animate='show'>
			<div className="navbar_container">
				<div className="logo_wrap">
					<img src={logo}
							alt="logo"/>
					<h1>Game review</h1>
				</div>

				<form className="search"
							onSubmit={submitHandler}>
					<input type="text"
								onChange={inputHandler}
								value={textInput}/>
					<button type='submit'>Search</button>
				</form>
			</div>
		</AnimateStyle>
	)
}

const AnimateStyle = styled(motion.div)``;

export default Navbar;
