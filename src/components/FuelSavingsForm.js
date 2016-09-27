import React, {PropTypes} from 'react';
import debounce from 'lodash/debounce';

class FuelSavingsForm extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.save = this.save.bind(this);
    }

    save() {
        this.props.saveFuelSavings(this.props.fuelSavings);
    }

    render() {
        const {fuelSavings} = this.props;

        return (
            <div>
                <h2>Fuel Savings Analysis</h2>
                <input type="text" defaultValue={fuelSavings.fooBar} onChange={debounce(this.save, 500)}/>
                <input type="submit" value="Save" onClick={debounce(this.save, 500)}/>
                <div>{fuelSavings.dateModified}</div>
            </div>
        );
    }
}

FuelSavingsForm.propTypes = {
    saveFuelSavings: PropTypes.func.isRequired,
    calculateFuelSavings: PropTypes.func.isRequired,
    fuelSavings: PropTypes.object.isRequired
};

export default FuelSavingsForm;
