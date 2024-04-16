import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../professional-events/firebaseConfig";
import {
  useHistory,
  Link,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Admin from "../admin/Admin";
import ProjectsAdmin from "../admin/projectsAdmin/ProjectsAdmin";
import EventsAdmin from "../admin/eventsAdmin/EventsAdmin";
import BoardAdmin from "../admin/boardAdmin/BoardAdmin";
import { Navbar, Nav } from "react-bootstrap";
const Authenticate = () => {
  const [authUser, setAuthUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const sign_Out = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => console.log(error));
  };

  const admin = () => {
    return <Admin signOut={sign_Out} />;
  };
  return (
    <>
      <div>
        {authUser ? (
          <>
            <Switch>
              <Route exact path="/auth" component={admin} />
              <Route exact path="/auth/projects" component={ProjectsAdmin} />
              <Route exact path="/auth/events" component={EventsAdmin} />
              <Route exact path="/auth/board" component={BoardAdmin} />
            </Switch>
            <Navbar>
              <Nav.Link className="justify-content-end">
                <button class="btn btn-danger" onClick={sign_Out}>
                  Log Out
                </button>
              </Nav.Link>
            </Navbar>
          </>
        ) : (
          <>
            <h1>login first</h1>
            <h1>login first</h1>
            <h1>login first</h1>
            <h1>login first</h1>
            <h1>login first</h1>
            <Link to={"/login"} class="btn btn-primary">
              Log In
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Authenticate;
