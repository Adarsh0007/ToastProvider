import { useState } from "react";
import "../styles.css";
const Comment = ({ comment, onSubmitComment, onEditComment, onDeleteComment, onUpVoteComment, onDownVoteComment }) => {
    console.log("comment", comment);
    const [expand, setExpand] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const onChange = (e) => {
        if (editMode) {
            setEditContent(e.target.value);
        } else {
            setReplyContent(e.target.value);
        }
    }
    const handleReplySubmit = () => {
        if (replyContent) {
            onSubmitComment(comment.id, replyContent);
            setReplyContent('');
            toggleExpand(false);
        }
    }
    const toggleExpand = () => {
        setExpand(!expand);
    }
    const toggleEditMode = () => {
        setEditMode(!editMode);
        setEditContent(comment.content);
    }
    const handleEditSubmit = () => {
        if (editContent) {
            onEditComment(comment.id, editContent);
            setEditMode(false);
        }
    }
    return (
        <div className="comment">
           { !editMode ? <>
                <p className="comment-content">{comment.content}</p>
                <p className="comment-info">Votes: {comment.votes}</p>
                <p className="comment-info">{new Date(comment.timestamp).toLocaleString()}</p>
            </> : (
                <div>
                      <div className="add-comment">
                        <textarea rows={3} cols={50}  value={editContent} onChange={onChange} className="comment-area" />
                        <button onClick={handleEditSubmit} className="comment-button">Save Edit </button>
                        <button onClick={toggleEditMode} className="comment-button">Cancel Edit</button>
                    </div>
                </div>
            )
}
            <div className="comment-actions">
                <button className="comment-button" onClick={() => onUpVoteComment(comment.id)}>👍🏻 UpVote</button>
                <button className="comment-button" onClick={() => onDownVoteComment(comment.id)}>👎🏻 DownVote</button>
                <button className="comment-button" onClick={toggleExpand}>{expand ? 'Hide Replies' : 'Reply'}</button>
                <button className="comment-button" onClick={toggleEditMode}>Edit</button>
                <button className="comment-button" onClick={() => onDeleteComment(comment.id)}>Delete</button>
            </div>

            {expand && (
                <div className="comment-replies">
                    <div className="add-comment">
                        <textarea rows={3} cols={50} placeholder="Add a new comment..." value={replyContent} onChange={onChange} className="comment-area" />
                        <button onClick={handleReplySubmit} className="comment-button">Add Comment</button>
                    </div>
                    {comment?.replies?.map((reply) => <Comment key={reply.id} comment={reply} onSubmitComment={onSubmitComment} onEditComment={onEditComment} onDeleteComment={onDeleteComment}  onUpVoteComment={onUpVoteComment} onDownVoteComment={onDownVoteComment}/>)}
                </div>

            )}
        </div>
    )
}

export default Comment;