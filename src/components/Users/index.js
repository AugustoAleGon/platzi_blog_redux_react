import React from 'react';
import { connect } from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import Fatal from '../General/Fatal';
import Spinner from '../General/Spinner';
import Table from './Table';

class User extends React.Component {

  componentDidMount () {
    if (!this.props.users.length) {
      this.props.fetchUsers();
    }
  }

  displayContent = () =>{
    if (this.props.loading) {
      return(
        <Spinner />
      )
    }

    if (this.props.error) {
      return (
        <Fatal error={this.props.error} />
      )
    }

    return (
      <Table />
    )
  }

  render () {
    return (
      <div className="col text-center">
        <h1>
          Users
        </h1>
        {this.displayContent()}
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

export default connect(mapStateToProps, usersActions)(User);
