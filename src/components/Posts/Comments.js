import React from 'react'
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

const Comments = (props) => {
    if (props.commentError) {
        return <Fatal error={props.commentError} />
    }
    if (props.commentLoading && !props.comments.length) {
        return <Spinner />
    }
    const displayComments = () => (
        props.comments.map(comment => (
            <li key={comment.id}>
                <b><u>{comment.email}</u></b> <br />
                {comment.body}
            </li>
        ))
    )

    return (
        <ul>
            { displayComments() }
        </ul>
        )
}

const mapStateToProps = ({ postsReducer }) => postsReducer;

export default connect(mapStateToProps)(Comments);