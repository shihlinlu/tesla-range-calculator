import React from 'react';
import './Header.css';
import logoURL from '../../assets/logo.svg';

const Header = () => (
	<div className="header">
		<img src={logoURL} alt="Tesla" />
	</div>
)

export default Header;