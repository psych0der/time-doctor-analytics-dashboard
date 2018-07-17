import React from 'react'
import WidgetContainer from '../../components/WidgetContainer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  moveWidget
} from '../../reducers/widgetContainer';
import './index.css';

import UserActivityWidget from '../UserActivityWidget';

function getWidget(widgetType, containerId){
  return <UserActivityWidget containerId={containerId}/>
}

const Home = props => {
  // layout is an array of objects, see the demo for more complete usage
  return (
    <div className="dropzoneContainer">
      {[1, 2, 3, 4].map((item) => (
        <WidgetContainer acceptDrop={(widgetType, previousContainer)=> {props.moveWidget(widgetType, previousContainer, `widget-container-${item}`); }}    widgetId={`widget-container-${item}`} key={`widget-${item}`}>
          {
            Object.keys(props.widgetContainer).length > 0
            && `widget-container-${item}` in props.widgetContainer
            && getWidget(props.widgetContainer[`widget-container-${item}`], `widget-container-${item}`)
          }
        </WidgetContainer>
      ))}
    </div>

  )
}
const mapStateToProps = ({widgetContainer}) => ({widgetContainer});

const mapDispatchToProps = dispatch => bindActionCreators({
  moveWidget,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
