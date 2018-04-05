import TeslaCar from '../components/TeslaCar/TeslaCar';
import { connect } from 'react-redux';

/**
 * TeslaCarContainer
 *
 * Smart component that grabs the wheelsize in the current store and passes it as props; TeslaCar component then renders.
 */
const mapStateToProps = (state) => {
    return {
        wheelsize: state.config.wheels
    }
};

const TeslaCarContainer = connect(mapStateToProps, null)(TeslaCar);

export default TeslaCarContainer;