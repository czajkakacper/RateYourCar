import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "./style.css"
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom"
import { FaCar} from "react-icons/fa";

const Update = () => {
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }
  const [marka, setMarka] = useState("");
  const [model, setModel] = useState("");
  const [rocznik, setRocznik] = useState("");
  const [ocena, setOcena] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:3001/api/opinion/list/${id}`);
    setMarka(response.data.marka);
    setModel(response.data.model);
    setRocznik(response.data.rocznik);
    setOcena(response.data.ocena);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/opinion/update/${id}`,
        { marka, model, rocznik, ocena });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><i>Rate Your Car </i><FaCar /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">All opinions</Nav.Link>
            <NavDropdown title="Your account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/My">
                Add opinion
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" onClick={handleLogout}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar><div className="kontener"><p><h2>Update your opinion</h2></p>
        <Form onSubmit={handleUpdate}><Form.Label>Marka</Form.Label>
          <Form.Control
            required
            type="text"
            name="marka"
            placeholder="Marka"
            value={marka}
            onChange={(e) => setMarka(e.target.value)}
            className={styles.input}
          />
          <Form.Label>Model</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Model"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={styles.input}
          />
          <Form.Label>Rocznik</Form.Label>
          <Form.Control
            required
            type="number"
            min="1950"
            max="2023"
            placeholder="Rocznik"
            name="rocznik"
            value={rocznik}
            onChange={(e) => setRocznik(e.target.value)}
            className={styles.input}
          />
          <Form.Label>Ocena</Form.Label>
          <Form.Control
            required
            type="number"
            min="1"
            max="5"
            placeholder="Ocena (1-5)"
            name="ocena"
            value={ocena}
            onChange={(e) => setOcena(e.target.value)}
            className={styles.input}
          />
          <Button variant="success" type="submit">Save</Button>
        </Form></div></>
  )
}

export default Update