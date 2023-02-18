import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState, useEffect } from "react";
import { FaCar} from "react-icons/fa";
import { MdStarRate } from "react-icons/md"

const SeeOpinion = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/opinion/list')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><i>Rate Your Car </i><FaCar /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="#">All opinions</Nav.Link>
          </Nav>
          <Button variant="outline-secondary" href="/login">Back</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar><div className="kontener"><p><h2>See how users rate their cars</h2></p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Marka</th>
              <th>Model</th>
              <th>Rocznik</th>
              <th>Ocena <MdStarRate /></th>
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
            </tr>
            </tbody>
            ))}
        </Table>
      </div></>
  )
}

export default SeeOpinion