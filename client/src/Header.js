const { Navbar, Nav, Container, Form, Button } = require('react-bootstrap');

function Header() {
    return (
        < Navbar bg="light" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand href="#home"> To Do List </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
                    <Button className="ml-auto btn btn-sm btn-secondary">Login</Button>
                    <Button className="ml-auto btn btn-sm btn-secondary">Sign up</Button>
                </Form>

            </Container>
        </Navbar >
    )
}

export default Header;