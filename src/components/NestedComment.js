import { useState } from "react";
import useCommentTree from "../hooks/useCommentTree";
import Comment from "./Comment";

const NestedComment = ({comments, onSubmit, onEdit, onDelete, onUpVote, onDownVote}) => {
    console.log("comments", comments);
    const {comments: commentsData, insertComment, editComment, deleteComment, upVoteComment, downVoteComment} = useCommentTree(comments);
    const [comment, setComment] = useState("");

    const onChange = (e) => {
        setComment(e.target.value);
    }

    const handleReply = (commenId, content) => {
        insertComment(commenId, content);
        onSubmit(content);
    }
    const handleEdit = (commentId, content) => {
        editComment(commentId, content);
        onEdit(content);
    }
    const handleSubmit = () => {
        if (comment) {
            handleReply(undefined, comment);
            setComment("");
        }
        
    }

    const handleDelete = (commentId) => {
        deleteComment(commentId);
        onDelete(commentId);
    }

    const handleUpVote = (commentId) => {
        upVoteComment(commentId);
        onUpVote(commentId);
    }
    const handleDownVote = (commentId) => {
        downVoteComment(commentId);
        onDownVote(commentId);
    }
    return (
        <>
         <div className="add-comment">
            <textarea rows={3} cols={50} placeholder="Add a new comment..." value={comment} onChange={onChange} className="comment-area"/>
            <button onClick={handleSubmit} className="comment-button">Add Comment</button>
        </div>
    {commentsData?.map((comment) => <Comment key={comment.id} comment={comment} onSubmitComment={handleReply} onEditComment={handleEdit} onDeleteComment={handleDelete} onUpVoteComment={handleUpVote} onDownVoteComment={handleDownVote} />)}
        </>
       
    )
}

export default NestedComment;