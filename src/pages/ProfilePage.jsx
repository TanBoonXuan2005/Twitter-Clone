import { Navbar, Container, Button, NavbarCollapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";


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
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        <i 
                            className="bi bi-twitter"
                            style={{ fontSize: 30, color: 'dodgerblue' }}
                        >
                        </i>
                    </Navbar.Brand>
                    <NavbarCollapse className="justify-content-end">
                        <Button variant="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </NavbarCollapse>
                </Container>
            </Navbar>

            <Container className="mt-3">
                <h2>Your profile</h2>
            </Container>
        </>
    )
}