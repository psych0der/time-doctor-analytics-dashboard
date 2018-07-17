import React  from 'react';
import { DropTarget } from 'react-dnd';
import Types from '../../Types';



const widgetContainerTarget = {
  // canDrop(props) {
  //   return props.children === false;
  // },
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
    const style = {
      height: '350px',
      width: '500px',
      border: 'thin dashed black',
      display: 'inline-block',
      verticalAlign: 'top'
    };

    return connectDropTarget(
      <div style={style} className={this.props.widgetId}>
        {!this.props.children && "Drop here"}
        {this.props.children}
      </div>
    )
  }
}


// Wrap widget container to make it droppable
export default DropTarget(Types.USER_WIDGET, widgetContainerTarget, collect)(WidgetContainer);
