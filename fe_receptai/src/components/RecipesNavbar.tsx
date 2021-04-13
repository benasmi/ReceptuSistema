import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

export default function RecipesNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/app/home">Recipes</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/app/home">Home</Nav.Link>
          <Nav.Link href="/app/my-recipes">My recipes</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};
