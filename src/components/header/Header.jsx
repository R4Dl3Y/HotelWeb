import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Autenticacao } from "../../contexts/autenticacao";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

export const Header = (props) => {
  const user = props.user ? props.user : null;
  const isAdmin = user?.admin ? true : false;

  const { Logout } = Autenticacao();

  const navigate = useNavigate();

  const redirectpage = () => {
    navigate("/");
    Logout();
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Hotel4U</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-start">
              <NavLink className={"nav-link"} to="/">Home Page</NavLink>
              <NavLink className={"nav-link"} to="/contactos">Contacts</NavLink>

              {isAdmin ? (
                <NavDropdown title="Administração" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/backoffice">
                    Home Page
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/backoffice/users">
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/backoffice/hoteis">
                    Hotels
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/backoffice/quartos">
                    Rooms
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/backoffice/reservas">
                    Reservations
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>

          {user !== null ? (
            <NavDropdown
              title={`${user.nome}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/perfil">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="/perfil/editar">
                Edit account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => redirectpage()}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav className="justify-content-end">
              <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="/login">LogIn</Nav.Link>
                <Nav.Link href="/registrar">SignUp</Nav.Link>
              </Navbar.Collapse>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};
