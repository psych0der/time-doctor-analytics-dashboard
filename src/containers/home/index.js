import React from 'react'
// import WidgetContainer from '../../components/WidgetContainer';
// import DashboardHeader from '../../components/DashboardHeader';
import {WidgetContainer, DashboardHeader, WidgetCreationModal} from '../../components';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  moveWidget,
  emptyContainer,
  setWidgetDropZone
} from '../../reducers/widgetContainer';
import Types from '../../Types';
import './index.css';

import UserActivityWidget from '../UserActivityWidget';

// Returns appropriate widget according to type
function getWidget(widgetType, containerId, emptyContainer){
  switch(widgetType) {
    case Types.USER_WIDGET:
      return <UserActivityWidget containerId = {containerId} removeWidget = {() => {emptyContainer(containerId)}}/>
    default:
      return null;
  }
}

const containerKeyPrefix = "widget_container_";
export class Home extends React.Component {
  state ={
    showModal: false
  }

  closeModal = ()=>{
    this.setState({showModal: false});
  }

  openModal = ()=>{
    this.setState({showModal: true});
  }
  render(){
    return (
    <div>
      <DashboardHeader openModal={this.openModal}/>
      <WidgetCreationModal
        show = {
          this.state.showModal
        }
        closeModal = {
          this.closeModal
        }
        widgetContainerState = {
          this.props.widgetContainer
        }
        addWidget = {
          this.props.setWidgetDropZone
        }

        emptyContainer = {
          this.props.emptyContainer
        }
      />
      <div className="dropzoneContainer">
        {[1, 2, 3, 4,5,6].map((item) => (
          <WidgetContainer acceptDrop={(widgetType, previousContainer)=> {this.props.moveWidget(widgetType, previousContainer, `${containerKeyPrefix}${item}`, this.props.emptyContainer); }}    widgetId={`${containerKeyPrefix}${item}`} key={`widget-${item}`}>
            {
              Object.keys(this.props.widgetContainer).length > 0
              && `${containerKeyPrefix}${item}` in this.props.widgetContainer
              && getWidget(this.props.widgetContainer[`${containerKeyPrefix}${item}`], `${containerKeyPrefix}${item}`, this.props.emptyContainer)
            }
          </WidgetContainer>
        ))}
      </div>

    </div>
  )
  // layout is an array of objects, see the demo for more complete usage
  }

}

const mapStateToProps = ({widgetContainer}) => ({widgetContainer});

const mapDispatchToProps = dispatch => bindActionCreators({
  moveWidget,
  emptyContainer,
  setWidgetDropZone
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
