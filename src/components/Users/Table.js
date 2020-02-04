import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../css/icons.css';

const Table = (props) => {

    const addRows = () => (
        props.users.map((user, key) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.website}</td>
            <td>
              <Link to={`/posts/${key}`}>
                <div className="eye-solid icon"></div>
              </Link>
            </td>
          </tr>
        ))
    );

    return (
        <table className="col">
            <thead>
            <tr>
                <th>
                Name
                </th>
                <th>
                Email
                </th>
                <th>
                Website
                </th>
            </tr>
            </thead>
            <tbody>
            { addRows() }
            </tbody>
      </table>
    )
}

const mapStateToProps = (reducers) => {
    return reducers.usersReducer;
}

export default connect(mapStateToProps)(Table);