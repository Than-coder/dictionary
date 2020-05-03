import React from "react";

import Search from "../components/Search";

function Navbar() {
  return (
    <div className="navbar-fixed">
      <nav className="teal">
        <div className="nav-wrapper">
          <Search />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
