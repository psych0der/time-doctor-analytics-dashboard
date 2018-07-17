import React from 'react';
import {
    Radio, FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import saveIcon from '../../commons/assets/icons/save.svg';
import cancelIcon from '../../commons/assets/icons/cancel.svg';
import NumericInput from 'react-numeric-input';
import './index.css';

class UserWidgetSettings extends React.Component {
    state = {
        'userCount': this.props.userCount,
        'sortOrder': this.props.sortOrder
    }

    resetForm = () => {
        this.setState({'userCount': 5, 'sortOrder': 'asc'});
        this.props.closeSettingsForm();
    }
    userCountUpdater = (value) => {
        this.setState({'userCount': value});
    }

    sortOrderUpdater = (event) => {
        this.setState({'sortOrder': event.target.value});
    }

    applySettings = (event) => {
        this.props.updateValues(this.state.userCount, this.state.sortOrder);
        this.props.closeSettingsForm();
    }

    render() {
        let {userCount, sortOrder} = this.state;
        return (
            <form
                className="userWidgetSettingsForm"
                onSubmit={e => {
                e.preventDefault();
            }}>
                <FormGroup
                    controlId="formControlsSelect"
                    className="userWidgetSettingsDropdown">
                    <div>
                        <ControlLabel className="settingsFormLabel">Number of Users</ControlLabel>
                    </div>

                    <NumericInput
                        min={0}
                        max={this.props.maxUserCount}
                        value={userCount}
                        className="userCountSelector"
                        onChange={this.userCountUpdater}
                        strict/>
                </FormGroup>

                <FormGroup>
                    <div>
                        <ControlLabel className="settingsFormLabel">Activity</ControlLabel>
                    </div>
                    <Radio
                        name="radioGroup"
                        inline
                        value={'dsc'}
                        onChange={this.sortOrderUpdater}
                        checked={sortOrder === "dsc"}>
                        Highest
                    </Radio>{' '}
                    <div className="rightRadioButton">
                        <Radio
                            name="radioGroup"
                            inline
                            className="ml"
                            value={'asc'}
                            onChange={this.sortOrderUpdater}
                            checked={sortOrder === "asc"}>
                            Lowest
                        </Radio>{' '}
                    </div>

                </FormGroup>

                <FormGroup
                    controlId="formControlsSelect"
                    className="userWidgetSettingsDropdown">
                    <div>
                        <ControlLabel>Time</ControlLabel>
                    </div>
                    <FormControl componentClass="select" placeholder="select" disabled>
                        <option value="select">Mobile time</option>
                    </FormControl>
                </FormGroup>
                <FormGroup
                    controlId="formControlsSelect"
                    className="userWidgetSettingsDropdown">
                    <div>
                        <ControlLabel>Date</ControlLabel>
                    </div>
                    <FormControl componentClass="select" placeholder="select" disabled>
                        <option value="select">Weekly</option>
                    </FormControl>
                </FormGroup>

                <div className="userWidgetFormButtons pull-right">

                    <div className="settingsButton" onClick={this.resetForm}>
                        <img src={cancelIcon} alt="cancel"/>
                    </div>
                    <div className="settingsButton  ml2" onClick={this.applySettings}>
                        <img src={saveIcon} alt="save"/>
                    </div>

                </div>

            </form>
        )
    }
}

UserWidgetSettings.propTypes = {
    userCount: PropTypes.number.isRequired,
    sortOrder: PropTypes.string.isRequired,
    maxUserCount: PropTypes.number.isRequired,
    closeSettingsForm: PropTypes.func.isRequired,
    updateValues: PropTypes.func.isRequired
}

export default UserWidgetSettings