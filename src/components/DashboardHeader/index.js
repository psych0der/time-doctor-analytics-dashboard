import React from 'react';
import addWidget from '../../commons/assets/icons/add-widget.svg';
import './index.css';

const DashboardHeader = props => {
    return (
        <header className="dashboardHeader">
            <div className="headerText">
                Team dashboard
            </div>
            <div className="pull-right">
                <div className="addWidgetButton" onClick={props.openModal}><img src={addWidget} alt="add-widget"/>
                    <span>Add widget</span>
                </div>
            </div>
        </header>
    )
}

export default DashboardHeader;