import TeslaWheels from '../components/TeslaWheels/TeslaWheels';
import { connect } from 'react-redux';
import { changeWheel } from '../actions';

const mapStateToProps = (state) => {
    return {
        value: state.config.wheels
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeWheels: (size) => {
            dispatch(changeWheel(size))
        }
    }
};

const TeslaWheelContainer = connect(mapStateToProps, mapDispatchToProps)(TeslaWheels);

export default TeslaWheelContainer;
