import { Button, Col, Image, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function ProfilePostCard({ content, postId }) {
    const pic = 'https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg';
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleUnlike = () => {
        setLiked(false);
        setLikes(likes - 1);
        const token = localStorage.getItem('authToken');

        axios.delete(`https://4b355dca-9fb9-403e-bf80-0675cc4356df-00-16tntpxz0g1he.sisko.replit.dev/likes/${postId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            console.log('Unliked successfully:', response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
            setLiked(true);
            setLikes(likes + 1);
        });
    }

    const handleLike = () => {
        setLiked(true);
        setLikes(likes + 1);
        const token = localStorage.getItem('authToken');
        const decode = jwtDecode(token);
        const userId = decode.id;
        const data = {
            user_id: userId,
            post_id: postId,
        };

        axios.post(`https://4b355dca-9fb9-403e-bf80-0675cc4356df-00-16tntpxz0g1he.sisko.replit.dev/likes`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log('Liked successfully:', response.data);
        }).catch((error) => {
            console.error('Error:', error);
            setLiked(false);
            setLikes(likes - 1);
        
        });
    }
    
    useEffect(() => {
        fetch(`https://4b355dca-9fb9-403e-bf80-0675cc4356df-00-16tntpxz0g1he.sisko.replit.dev/likes/post/${postId}`)
        .then((res) => res.json())
        .then((data) => setLikes(data.length))
        .catch((error) => console.error('Error:', error));
    }, [postId]);


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
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light" onClick={liked ? handleUnlike : handleLike}>
                        {liked ? (
                            <i className="bi bi-heart-fill text-danger"> {likes}</i>
                        ) : (
                            <i className="bi bi-heart"> {likes}</i>
                        )}
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                </div>
            </Col>

        </Row>
    )
}