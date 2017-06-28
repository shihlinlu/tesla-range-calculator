import React from 'react';
import './TeslaBattery.css';
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';
import TeslaCar from '../components/TeslaCar/TeslaCar';
import TeslaStats from '../components/TeslaStats/TeslaStats';

class TeslaBattery extends React.Component {
	// constructor to set the initial values
	constructor(props) {
		super(props);

		this.state = {
			carstats: [],
			config: {
				speed: 55,
				temperature: 20,
				climate: true,
				wheels: 19
			}
		}
	}

	render() {
		// ES6 object structuring syntax
		// takes out required values and creates references to them
		const { config } = this.state;
		return (
			<form className="tesla-battery">
				<h1>Range Per Charge</h1>
				<TeslaCar wheelsize= {config.wheels} />
				<TeslaStats carstats={carstats} />
				<TeslaNotice />
			</form>
		)
	}
}

export default TeslaBattery;