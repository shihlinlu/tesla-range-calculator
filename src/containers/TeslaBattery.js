import React from 'react';
import './TeslaBattery.css';
import TeslaNotice from '../components/TeslaNotice/TeslaNotice';
import TeslaCar from '../components/TeslaCar/TeslaCar';
import TeslaStats from '../components/TeslaStats/TeslaStats';
import TeslaCounter from '../components/TeslaCounter/TeslaCounter';
import { getModelData } from '../services/BatteryService';

class TeslaBattery extends React.Component {
	// constructor to set the initial values
	constructor(props) {
		super(props);

		// explicit binding in the constructor is required to access 'this' in the class
		this.calculateStats = this.calculateStats.bind(this);
		this.statsUpdate = this.statsUpdate.bind(this);
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
		this.updateCounterState = this.updateCounterState.bind(this);

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

	updateCounterState(title, newValue) {
		const config = { ...this.state.config};
		//update config state with new value
		title === 'Speed' ? config['speed'] = newValue :
			config['temperature'] = newValue;
		//update our state
		this.setState({ config });
	}

	increment(e, title) {
		e.preventDefault();
		let currentValue, maxValue, step;
		const { speed, temperature } = this.props.counterDefaultVal;
		if (title === 'Speed') {
			currentValue = this.state.config.speed;
			maxValue = speed.max;
			step = speed.step;
		} else {
			currentValue = this.state.config.temperature;
			maxValue = temperature.max;
			step = temperature.step;
		}

		if (currentValue < maxValue) {
			const newValue = currentValue + step;
			this.updateCounterState(title, newValue);
		}
	}

	decrement(e, title) {
		e.preventDefault();
		let currentValue, minValue, step;
		const { speed, temperature } = this.props.counterDefaultVal;
		if (title === 'Speed') {
			currentValue = this.state.config.speed;
			minValue = speed.min;
			step = speed.step;
		} else {
			currentValue = this.state.config.temperature;
			minValue = temperature.min;
			step = temperature.step;
		}

		if (currentValue > minValue) {
			const newValue = currentValue - step;
			this.updateCounterState(title, newValue);
		}
	}

	render() {
		// ES6 object structuring syntax
		// takes out required values and creates references to them
		const { config, carstats } = this.state;
		return (
			<form className="tesla-battery">
				<h1>Range Per Charge</h1>
				<TeslaCar wheelsize= {config.wheels} />
				<TeslaStats carstats={carstats} />
				<div className="tesla controls cf">
					<TeslaCounter
						currentValue={this.state.config.speed}
						initValues={this.props.counterDefaultVal.speed}
						increment={this.increment}
						decrement={this.decrement}
					/>
					<div className="tesla-climate-container cf">
						<TeslaCounter
							currentValue={this.state.config.temperature}
							initValues={this.props.counterDefaultVal.temperature}
							increment={this.increment}
							decrement={this.decrement}
						/>
					</div>
				</div>
				<TeslaNotice />
			</form>
		)
	}
}

export default TeslaBattery;