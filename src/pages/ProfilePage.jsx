import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";


export default function ProfilePage() {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useLocalStorage('authToken', null);

    useEffect(() => {
        if (!authToken) {
            navigate('/login');
        }
    }, [authToken, navigate]);


    const handleLogout = () => {
        setAuthToken('');
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