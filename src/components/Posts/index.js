import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';

import * as usersActions from '../../actions/usersActions';
import * as postsActions from '../../actions/postsActions';
import Fatal from '../General/Fatal';

import Comments from './Comments';

import '../styles/Posts.css';

class Posts extends Component {

    async componentDidMount () {
        const {
            fetchUsers,
            fetchPostsByUserId,
            match: { params: { key } }
        } = this.props;
        if (!this.props.usersReducer.users.length) {
            await fetchUsers();
        }
        if (this.props.usersReducer.error) {
            return;
        }
        if(!('postsKey' in this.props.usersReducer.users[key])) {
            fetchPostsByUserId(key);
        }
    }

    displayUser = () => {
        const {
            usersReducer,
            match: { params: { key } }
        } = this.props;

        if (usersReducer.error) {
            return <Fatal error={usersReducer.error} />
        }

        if (!usersReducer.users.length || usersReducer.loading) {
            return <Spinner />
        }

        const userName = usersReducer.users[key].name

        return (
            <h1>
                Posts from { userName }
            </h1>
        )
    }

    displayPosts = () => {
        const {
            usersReducer,
            usersReducer: { users },
            postsReducer,
            postsReducer: { posts },
            match: { params: { key }}
        } = this.props;

        if (usersReducer.error) return;

        if (!users.length) return;

        if (postsReducer.loading) {
            return <Spinner />;
        }

        if (postsReducer.error) {
            return <Fatal error={postsReducer.error} />
        }

        if (!posts.length) return;

        if(!('postsKey' in users[key])) return;

        return this.displayInfo();
    }

    displayInfo = () => {
        const {
            usersReducer: { users },
            postsReducer: { posts },
            match: { params: { key }}
        } = this.props;
        const { postsKey } = users[key];
        return (
            posts[postsKey].map((post, commentKey) => {
                return(
                    <div
                        className="post-title"
                        key={post.id}
                        onClick={ () => this.displayComments(postsKey, commentKey, post.comments) }
                    >
                        <h2>{post.title}</h2>
                        <h3>{post.body}</h3>
                        {
                            (post.isOpen) ? 
                            <Comments comments={post.comments} /> : null
                        }
                    </div>
                )
            })
        )
    }

    displayComments = (postsKey, commentKey, comments) => {
        this.props.openClose(postsKey, commentKey)
        if (!comments.length) {
            this.props.fetchCommentsByPostId(postsKey, commentKey);
        }

    }

    render() {
        return (
            <div>
                { this.displayUser() }
                {this.displayPosts() }
            </div>
        )
    }
}

const mapStateToProps = ({usersReducer, postsReducer}) => {
    return {
        usersReducer,
        postsReducer
    };
}

const mapDispatchToProps = {
    ...usersActions,
    ...postsActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);