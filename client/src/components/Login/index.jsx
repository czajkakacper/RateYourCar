import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import styles from "./style.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaCar} from "react-icons/fa";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:3001/api/auth"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            window.location = "/"
            
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    return (
        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><i>Rate Your Car </i><FaCar /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/SeeOpinion">All opinions</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar><div className="kontener"><h1>Login to Your Account</h1><Form className="formularz" onSubmit={handleSubmit}>
            <h4>Enter your login details</h4>
            <Form.Group className="mb-3" controlId="formLoginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className={styles.input}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control  
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className={styles.input}
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </Form.Group>
            <Button variant="success" type="submit">
                Log in
            </Button>
        </Form><div className="kontener3">
                <h4>Haven't registered yet?</h4>
                <p>Click on the link below to register and add an opinion!</p>
                <Link to="/signup">
                    <Button variant="primary">Create an account</Button>
                </Link></div></div></>
    );
}

export default Login