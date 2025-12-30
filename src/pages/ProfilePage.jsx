import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";


export default function ProfilePage() {
    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        navigate('/login');
    }

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <>
            <Container>
                <Row>
                    <ProfileSideBar handleLogout={handleLogout} />
                    <ProfileMidBody />
                </Row>
            </Container>
        </>
    )
}