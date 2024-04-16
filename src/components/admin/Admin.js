import React from "react";
import { Container, Button, Nav, Navbar } from "react-bootstrap";
import { Link, BrowserRouter, Route } from "react-router-dom";

const Admin = (props) => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Navbar>
          <Nav.Link className="justify-content-end">
            <button class="btn btn-danger" onClick={props.signOut}>
              Log Out
            </button>
          </Nav.Link>
        </Navbar>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <Link to="/auth/projects">
            <Button variant="primary" className="m-2">
              Projects
            </Button>
          </Link>
          <Link to="/auth/events">
            <Button variant="primary" className="m-2">
              Events
            </Button>
          </Link>
          <Link to="/auth/board">
            <Button variant="primary" className="m-2">
              Board
            </Button>
          </Link>
          <Button variant="primary" className="m-2">
            Mentorship
          </Button>
        </div>
      </div>
    </>
  );
};

export default Admin;
