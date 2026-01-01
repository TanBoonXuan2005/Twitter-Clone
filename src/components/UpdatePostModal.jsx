import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updatePost } from "../features/posts/postsSlice";

export default function UpdatePostModal({
    show,
    handleClose,
    postId,
    originalPostContent,
}) {
    const { currentUser } = useContext(AuthContext);
    const userId = currentUser.uid;
    const dispatch = useDispatch();
    const [newFile, setNewFile] = useState(null);
    const [newPostContent, setNewPostContent] = useState(originalPostContent);

    const handleUpdate = () => {
        dispatch(updatePost({ userId, postId, newPostContent, newFile }));
        handleClose();
        setNewPostContent(newPostContent);
        setNewFile(null);
    }

    const handleNewFileChange = (e) => {
        setNewFile(e.target.files[0]);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control
                                defaultValue={originalPostContent}
                                as="textarea"
                                rows={3}
                                onChange={(e) => setNewPostContent(e.target.value)}
                            />
                            <br />
                            <Form.Control type="file" onChange={handleNewFileChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary"
                        className="rounded-pill"
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}