import React  from 'react';
import { DropTarget } from 'react-dnd';
import Types from '../../Types';
import './index.css';

/* Helpers to make widget container droppable */
const widgetContainerTarget = {
  drop(props, monitor) {
    let {type, containerId} = monitor.getItem();
    props.acceptDrop(type, containerId, props.widgetId);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export class WidgetContainer extends React.Component {
  render() {
    const { connectDropTarget} = this.props;
    return connectDropTarget(
      <div  className={`widgetContainer ${this.props.widgetId}`} style={this.props.children === false ? {} : {border:"none"}}>
        {!this.props.children && (<div className="vCenter dropPlaceHolder">Drop Here</div>)}
        {this.props.children}
      </div>
    )
  }
}


// Wrap widget container to make it droppable
export default DropTarget(Types.USER_WIDGET, widgetContainerTarget, collect)(WidgetContainer);
