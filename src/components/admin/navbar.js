import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Nav() {
  return (
    <Navbar bg="primary" className="text-white">
      <Container>
        <Navbar.Brand href="#home">HayMart</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="" className="text-decoration-none m-4 text-white">
              Product
            </a>
          </Navbar.Text>
          <Navbar.Text>
            <a href="" className="text-decoration-none m-4 text-white">
              Users
            </a>
          </Navbar.Text>
          <Navbar.Text>
            <a href="" className="text-decoration-none m-4 text-white">
              Sales
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nav;
