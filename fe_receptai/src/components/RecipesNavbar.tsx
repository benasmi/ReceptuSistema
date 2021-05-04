import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export default function RecipesNavbar() {
  return (
    <div style={{width: '100%', height: '50px'}}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/app/home">Recipes</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/app/home">Home</Nav.Link>
          <Nav.Link href="/app/my-recipes">My recipes</Nav.Link>
          <Nav.Link href="/app/profile">Profile</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};
