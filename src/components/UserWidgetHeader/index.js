import React from 'react';
import downArrow from './icons/down.svg';
import settingsLogo from './icons/settings.svg';
import {
    Dropdown,
    MenuItem
} from 'react-bootstrap';
import './index.css'

const UserWidgetHeader = (props) => (
    <div className="widgetHeader">
        <div className="titleText">
            Users activity
        </div>
        <div className="rightContainer">
            <div>
                <span className="activityDurationText">Weekly</span>
                <img src={downArrow} alt="dropdown"/>
            </div>
            <div className="userWidgetSettings">
                <Dropdown bsStyle="Primary" noCaret id="userWidgetDropDown" pullRight>
                    <Dropdown.Toggle className="userWidgetToggle">
                        <img src={settingsLogo} alt="settings"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="userWidgetSettingsMenu">
                        <MenuItem className="userWidgetMenuItem" eventKey="1">Edit widget</MenuItem>
                        <MenuItem className="userWidgetMenuItem" eventKey="2">Delete</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    </div>
)

export default UserWidgetHeader;