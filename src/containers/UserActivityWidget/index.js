import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import memoize from 'memoize-one';
import {setSortOrder, setUserCount} from '../../reducers/userWidget';
import UserWidgetHeader from '../../components/UserWidgetHeader';
import UserBlock from '../../components/UserBlock';
import userData from './data.json';
import './index.css';

class UserActivityWidget extends React.Component {
  constructor(props) {
    super(props)
    this.normalizedData = userData;
    this.denormalizedData = {
      users: []
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

  clickDropDown = () => {}

  render() {
    let {sortOrder, userCount} = this.props;
    /* sort users according to state */
    let users = this.sortAndSlice(this.denormalizedData.users, sortOrder, userCount);
    return (
      <div>

        <div className="userActivityWidget">
          <UserWidgetHeader/>
          <div className="userBoxes">
            {users.map((item, i) => (<UserBlock
              userid={item.id}
              name={item.fullname}
              activity={item.weekly}
              key={item.id}/>))}
          </div>

          <div>
            <button onClick={() => this.setUserCount(3)}>
              Make it 3
            </button>
            <button onClick={() => this.setUserCount(5)}>
              Make it 3
            </button>
            <button onClick={() => this.setSortOrder('dsc')}>
              DSC
            </button>
            <button onClick={() => this.setSortOrder('asc')}>
              ASC
            </button>
          </div>
        </div>

      </div>

    );
  }
}

const mapStateToProps = ({userWidget}) => ({userCount: userWidget.userCount, sortOrder: userWidget.sortOrder});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSortOrder,
  setUserCount
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserActivityWidget);
