import React from 'react';
import './TeslaBattery.css';
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';
import TeslaCar from '../components/TeslaCar/TeslaCar';
import TeslaStats from '../components/TeslaStats/TeslaStats';
import { getModelData } from '../services/BatteryService';

class TeslaBattery extends React.Component {
	// constructor to set the initial values
	constructor(props) {
		super(props);

		// explicit binding in the constructor is required to access 'this' in the class
		this.calculateStats = this.calculateStats.bind(this);
		this.statsUpdate = this.statsUpdate.bind(this);

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

	calculateStats = (models, value) => {
		const dataModels = getModelData();
		return models.map(model => {
			// ES6 boject destructuring syntax takes out required values and creates references to them
			const { speed, temperature, climate, wheels } = value;
			const miles = dataModels[model][wheels][climate ? 'on' : 'off'].speed[speed][temperature];
			return {
				model,
				miles
			};
		});
	}

	statsUpdate () {
		const carModels = ['60', '60D', '75', '75D', '90D', 'P100D'];
		// fetch model info from BatteryService and calculate then update state
		this.setState({
			carstats: this.calculateStats(carModels, this.state.config)
		})
	}

	componentDidMount() {
		this.statsUpdate();
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