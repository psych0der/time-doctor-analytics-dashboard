import React from 'react';
import Types from '../../Types';
import addWidget from '../../commons/assets/icons/add-widget.svg';
import removeWidget from '../../commons/assets/icons/remove-widget.svg';
import './index.css';

export class UserActivityWidgetDescription extends React.Component {
    render() {
        // widgetAction button changes according to presence of userActivityWidget in
        // containers
        let widgetActionButton = (
            <div className="addWidgetButton"
                onClick={()=>{
                        this.props.addWidget('widget_container_1', Types.USER_WIDGET)
                        /* set revert action so that this action can be undone */
                        this.props.setRevertAction(() => {
                            this.props.emptyContainer('widget_container_1');
                        });
                    }
                }
            >
                <img src={addWidget} alt="add-widget"/>
                <span>Add widget</span>
            </div>
        );
        // store reference to widget container for deleting it
        let userWidgetContainer = null;
        /* iterate over widget container state to find if userActivityWidget is present */
        for (let key in this.props.widgetContainerState) {
            if (this.props.widgetContainerState[key] === Types.USER_WIDGET) {
                userWidgetContainer= key;
                break;
            }
        }

        // if the widget is container in a container then show delete button
        if(userWidgetContainer){
            widgetActionButton = (
                    <div className="removeWidgetButton"
                        onClick={()=>{
                                /* set revert action so that this action can be undone */
                                this.props.emptyContainer(userWidgetContainer);
                                this.props.setRevertAction(()=> {
                                    this.props.addWidget(userWidgetContainer, Types.USER_WIDGET);
                                })
                            }
                        }
                    >
                        <img src={removeWidget} alt="remove-widget"/>
                        <span>Remove widget</span>
                    </div>
                )
        }
        return (
            <div className="widgetSelection">
                <div className="widgetPreview">
                    <div className="sampleProgressbar">
                        <div className="lightGreen"></div>
                        <div className="darkGreen"></div>
                    </div>
                </div>
                <div className="widgetDescription">
                    <div className="widgetDescriptionTitle">
                        Users worked More than required
                    </div>
                    <div className="widgetDescriptionDetail">
                        Users who worked more or less than their minimum hours required in daily, weekly
                        and monthly
                    </div>
                    <div className="widgetDescriptionTags">
                        <span className="widgetTagStart">Variables:</span>
                        <span className="widgetTag">Users</span>
                        <span className="widgetTag">Website</span>
                        <span className="widgetTag">Apps</span>
                        <span className="widgetTag">Time</span>
                        <span className="widgetTag">Date</span>
                    </div>
                </div>
                <div className="widgetAction pull-right">
                    {widgetActionButton}
                </div>
            </div>
        )

    }

}

export default UserActivityWidgetDescription;