import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import memoize from 'memoize-one';
import {setSortOrder, setUserCount} from '../../reducers/userWidget';
import UserWidgetHeader from '../../components/UserWidgetHeader';
import UserWidgetSettingsHeader from '../../components/UserWidgetSettingsHeader';
import UserWidgetSettings from '../../components/UserWidgetSettings';
import UserBlock from '../../components/UserBlock';
import userData from './data.json';
import Types from '../../Types';
import { DragSource } from 'react-dnd';
import './index.css';

/* Methods to enable UserActivityWidget draggable */
const userWidgetSource = {
  beginDrag(props) {
    return {type: Types.USER_WIDGET, containerId: props.containerId};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class UserActivityWidget extends React.Component {
  constructor(props) {
    super(props)
    this.normalizedData = userData;
    this.type = Types.USER_WIDGET;
    this.denormalizedData = {
      users: []
    };
    this.state = {
      'displayMode': 'view'
    };
  }

  /**
     * Use memoization to avoid expensive recomputes
     * Method to sort and slice the user list based on props
     * */
  sortAndSlice = memoize((data, sortOrder, userCount) => {
    /* user denormalized data as source */
    let users = data.slice();
    users.sort((a, b) => {
      if (sortOrder === 'asc') {
        return b.weekly - a.weekly;
      }
      return a.weekly - b.weekly;
    });
    /* slice users according to state */
    users = users.slice(0, userCount);
    return users;
  });

  componentDidMount() {
    //  denormalized data
    const data = this.normalizedData;
    const users = [];
    data
      .users
      .forEach((element) => {
        users.push({
          id: element.id,
          name: element.name,
          lastname: element.lastname,
          fullname: `${element.name} ${element.lastname}`,
          daily: data.daily[element.id],
          weekly: data.weekly[element.id],
          monthly: data.monthly[element.id]
        });
      });
    this.denormalizedData = {
      users
    };
    // trigger render after data is prepared
    this.setState({});
  }

  setUserCount = (count) => {
    this
      .props
      .setUserCount(count);
  }

  setSortOrder = (sortOrder) => {
    this
      .props
      .setSortOrder(sortOrder);
  }

  displaySettingsForm = () => {
    this.setState({'displayMode': 'settings'})
  }
  displayViewCard = () => {
    this.setState({'displayMode': 'view'})
  }

  setSettingsValue = (userCount, sortOrder) => {
    this.setSortOrder(sortOrder);
    this.setUserCount(userCount);
  }

  clickDropDown = () => {}

  render() {
    const {connectDragSource, isDragging} = this.props;

    // custom styling for widget container
    let style = {
      opacity: 1,
      cursor: 'move'
    };

    if (isDragging) {
      style['opacity'] = 0.5;
    }
    let {displayMode} = this.state;
    let displayNode = null;

    if (displayMode === 'view') {
      let {sortOrder, userCount} = this.props;
      /* sort users according to state */
      let users = this.sortAndSlice(this.denormalizedData.users, sortOrder, userCount);
      displayNode = (
        <div>
          <UserWidgetHeader
            showSettings={this.displaySettingsForm}
            showCardView={this.showCardView}/>
          <div className="userBoxes">
            {users.map((item, i) => (<UserBlock
              userid={item.id}
              name={item.fullname}
              activity={item.weekly}
              key={item.id}/>))}
          </div>
        </div>

      );
    } else {
      displayNode = (
        <div>
          <UserWidgetSettingsHeader/>
          <UserWidgetSettings
            maxUserCount={this.denormalizedData.users.length}
            closeSettingsForm={this.displayViewCard}
            updateValues={this.setSettingsValue}
            sortOrder={this.props.sortOrder}
            userCount={this.props.userCount}/>
        </div>
      )
    }

    return (connectDragSource(
      <div style={style}>
        <div className="userActivityWidget">
          {displayNode}
        </div>
      </div>
    ));
  }
}

const mapStateToProps = ({userWidget}) => ({userCount: userWidget.userCount, sortOrder: userWidget.sortOrder});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSortOrder,
  setUserCount
}, dispatch);

let draggableUserActivityWidget = DragSource(Types.USER_WIDGET, userWidgetSource, collect)(UserActivityWidget);

export default connect(mapStateToProps, mapDispatchToProps)(draggableUserActivityWidget);

