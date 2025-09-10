import { useState } from "react";

const useCommentTree = (intialComments) => {
    const [comments, setComments] = useState(intialComments);
    const insertNode = (tree, commentId, content) => {
        return tree?.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    replies: [...comment.replies, content]
                }
            } else if (comment.replies?.length) {
                return {
                    ...comment,
                    replies: insertNode(comment.replies, commentId, content)
                }
            }
            return comment;
        })

    }
    const insertComment = (commentId, content) => {
        const newComment = {
            id: Date.now(),
            content,
            votes: 0,
            timestamp: new Date().toISOString(),
            replies: []
        };
        if (commentId) {
            setComments((prevComments) => insertNode(prevComments, commentId, newComment));
        } else {
            setComments((prevComments) => [newComment, ...prevComments]);
        }
    };

    const editNode = (tree, commentId, content) => {
        return tree?.map((comment) => {
            if (comment.id === commentId) {
                return {
                    ...comment,
                    content,
                    timestamp: new Date().toISOString(),
                }
            } else if (comment.replies?.length) {
                return {
                    ...comment,
                    replies: editNode(comment.replies, commentId, content)
                }
            }
            return comment;
        })

    }
    const editComment = (commentId, content) => {
        setComments((prevComments) => editNode(prevComments, commentId, content));
    };
    const deleteCommentNode = (tree, commentId) => {
        return tree?.reduce((acc, comment) => {
            if (comment.id === commentId) {
                return acc;
            } else if (comment.replies?.length) {
                comment.replies = deleteCommentNode(comment.replies, commentId,)
            }
            return [...acc, comment];
        }, []);

    }
    const deleteComment = (commentId) => {
        setComments((prevComments) => deleteCommentNode(prevComments, commentId));
    };

    const upVoteComment = (commentId) => {
        setComments((prevComments) => upVoteCommentNode(prevComments, commentId));
    }
    const upVoteCommentNode = (tree, commentId) => {
        return tree?.map((comment) => {
            if (comment.id === commentId) {
                return { ...comment, votes: comment.votes + 1 };
            }
            return {...comment, replies: upVoteCommentNode(comment.replies, commentId)};
        })
    }

    const downVoteComment = (commentId) => {
        setComments((prevComments) => downVoteCommentNode(prevComments, commentId));
    }
    const downVoteCommentNode = (tree, commentId) => {
        return tree?.map((comment) => {
            if (comment.id === commentId) {
                if (comment.votes > 0) {
                    return { ...comment, votes: comment.votes - 1 };
                }
                return comment;
            }
            return {...comment, replies: downVoteCommentNode(comment.replies, commentId)};
        })
    }
    return {
        comments,
        insertComment,
        editComment,
        deleteComment,
        upVoteComment,
        downVoteComment,
    }
}

export default useCommentTree;