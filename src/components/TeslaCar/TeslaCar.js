import React from 'react';
import './TeslaCar.css';
import PropTypes from 'prop-types';

const TeslaCar = (props) => (
	<div className="tesla-car">
		<div className="tesla-wheels">
			<div className={`tesla-wheel tesla-wheel--front tesla-wheel--${props.wheelsize}`}></div>
			<div className={`tesla-wheel tesla-wheel--rear tesla-wheel--${props.wheelsize}`}></div>
		</div>
	</div>
);

// specify propTypes to check props passed to the component
// React.PropTypes has been deprecated. Documentation: https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes
// https://www.npmjs.com/package/prop-types
TeslaCar.propTypes = {
	wheelsize: PropTypes.number
}

export default TeslaCar;



