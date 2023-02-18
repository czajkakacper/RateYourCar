import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from "./style.css"
import { FaCar} from "react-icons/fa";

const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:3001/api/users"
            const { data: res } = await axios.post(url, data)
            navigate("/login")
            console.log(res.message)
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
        </Navbar><div className="kontener"><h1>Create a new account</h1><Form className="formularz" onSubmit={handleSubmit}>
            <h4>Enter your registration details</h4>
            <Form.Group className="mb-3" controlId="formSignupFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleChange}
                    value={data.firstName}
                    required
                    className={styles.input} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSignupLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    value={data.lastName}
                    required
                    className={styles.input} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSignupEmail">
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
            <Form.Group className="mb-3" controlId="formSignupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
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
                Sign Up
            </Button>
        </Form><div className="kontener3">
                    <h4>Already have an account?</h4>
                    <p>Click the link below to log in and add an opinion!</p>
                    <Link to="/Login">
                        <Button variant="primary">Log in</Button>
                    </Link></div></div></>
    )
}
export default Signup