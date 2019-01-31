import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home <span class="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <span class="navbar-text">Logout</span>
      </div>
    </nav>
  );
}

export default NavBar;
