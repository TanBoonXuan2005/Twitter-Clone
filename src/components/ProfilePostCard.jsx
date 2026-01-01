import { Button, Col, Image, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { likePost, removeLikeFromPost, deletePost } from "../features/posts/postsSlice";
import { AuthContext } from "../components/AuthProvider";
import UpdatePostModal from "./UpdatePostModal";

export default function ProfilePostCard({ post }) {
    const pic = 'https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg';
    const BASE_URL = 'https://4b355dca-9fb9-403e-bf80-0675cc4356df-00-16tntpxz0g1he.sisko.replit.dev';
    const { content, id: postId, imageUrl} = post;
    const dispatch = useDispatch();
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;
    const [likes, setLikes] = useState(post.likes || []);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);


    const isLiked = likes.includes(userId);

    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes());

    const addToLikes = () => {
        setLikes([...likes, userId]);
        dispatch(likePost({ userId, postId }));
    }

    const removeFromLikes = () => {
        setLikes(likes.filter((id) => id !== userId));
        dispatch(removeLikeFromPost({ userId, postId }));
    }
    
    const handleDelete = () => {
        dispatch(deletePost({ userId, postId }));
    }


    return (
        <Row
            className="p-3"
            style={{
                borderTop: '1px solid #D3D3D3',
                borderBottom: '1px solid #D3D3D3'
            }}
        >
            <Col sm={1}>
                <Image src={pic} roundedCircle fluid />
            </Col>
            
            <Col>
                <strong>Haris</strong>
                <span>@haris.samingan · Apr 16</span>
                <p>{content}</p>
                <Image src={imageUrl} style={{ width: 150 }} />
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light" onClick={handleLike}>
                        {isLiked ? (
                            <i className="bi bi-heart-fill text-danger"></i>
                        ) : (
                            <i className="bi bi-heart"></i>
                        )}
                        {likes.length}
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-pencil-square" onClick={handleShowUpdateModal}></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-trash" onClick={handleDelete}></i>
                    </Button>
                    <UpdatePostModal
                        show={showUpdateModal}
                        handleClose={handleCloseUpdateModal}
                        postId={postId}
                        originalPostContent={content}
                    />
                </div>
            </Col>

        </Row>
    )
}