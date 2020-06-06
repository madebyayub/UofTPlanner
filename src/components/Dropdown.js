import React from "react";
import "../stylesheets/dropdown.css";

const Dropdown = (props) => {
  return (
    <div
      className={`${props.dropdownState ? "show-dropdown" : "hide-dropdown"}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="menu-item p-2" onClick={props.onSaveClick}>
        <i className="fas fa-save mr-3"></i>
        <span>Save Planner</span>
      </div>
      <div className="menu-item p-2" onClick={props.onSignOutClick}>
        <i className="fas fa-sign-out-alt mr-3"></i>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Dropdown;
