import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { useState, useEffect } from "react";
import { FaCar} from "react-icons/fa";
import { MdStarRate } from "react-icons/md"

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/opinion/list')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

     const handleDelete = (id) => {
      fetch("http://localhost:3001/api/opinion/delete/"+id, {
        method: 'DELETE'
      })
        .then(res => res.json())
        .then(item => {
          setData(data.filter(item => item._id !== id));
        })
        .catch(error => {
          console.log(error);
       });
    };

    const handleUpdate = (id) => {
      navigate("/update/"+id)
    }

  return (
    <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><i>Rate Your Car </i><FaCar /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">All opinions</Nav.Link>
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
    </Navbar><div className="kontener"><h1>Welcome on our site!</h1><p><h2>See how users rate their cars</h2></p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Marka</th>
              <th>Model</th>
              <th>Rocznik</th>
              <th>Ocena <MdStarRate /></th>
              <th>Edycja</th>
              <th>Usuń</th>
            </tr>
          </thead>
          {data.map((item) => (
          <tbody>
            <tr>
                <td key={item._id}></td>
                <td>{item.marka}</td>
                <td>{item.model}</td>
                <td>{item.rocznik}</td>
                <td>{item.ocena}</td>
                <td><Button variant="warning" onClick={() => handleUpdate(item._id)}>Update</Button></td>
                <td><Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button></td>
            </tr>
            </tbody>
            ))}
        </Table>
      </div></>
  )
}

export default Main
