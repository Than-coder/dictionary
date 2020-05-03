import React from "react";

function Floating_Button() {
  return (
    <div className="fixed-action-btn">
      <a href="#!" className="btn-floating btn-large red">
        <i className="large material-icons">mode_edit</i>
      </a>
      <ul>
        <li>
          <a href="#!" className="btn-floating red">
            <i className="material-icons">insert_chart</i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Floating_Button;
