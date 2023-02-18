import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { React, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { FaCar} from "react-icons/fa";

const My = () => {
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

 const [item, setItems] = useState({
  marka: "",
  model: "",
  rocznik: "",
  ocena: "",
 })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = ({ currentTarget: input }) => {
    setItems({ ...item, [input.name]: input.value })
    console.log(item)
  };

  const handleSubmit = async (e) =>{
    e.preventDefault()

    try{
      const url = "http://localhost:3001/api/opinion"
      const { item: res } = await axios.post(url, item)

      navigate("/")

      console.loge(res.message)
    } catch{
      if(error.response && error.response.status >= 400 && error.response.stats <= 500) {
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
            <Nav.Link href="/">All opinions</Nav.Link>
            <NavDropdown title="Your account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#">Add opinion</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  href="/login" onClick={handleLogout}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar><div className="kontener"><p><h2>Add your opinion</h2></p>
        <Form onSubmit={handleSubmit}><Form.Label>Marka</Form.Label>
        <Form.Control
          required
          type="text"
          name="marka"
          placeholder="Marka"
          value={item.marka}
          onChange={handleChange}
          className={styles.input}
        />
        <Form.Label>Model</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Model"
            name="model"
            value={item.model}
            onChange={handleChange}
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
            value={item.rocznik}
            onChange={handleChange}
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
            value={item.ocena}
            onChange={handleChange}
            className={styles.input}
          />
        <Button variant="success" type="submit">Submit</Button> 
        </Form></div></>
  )
}

export default My

