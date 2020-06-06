import React from "react";
import { connect } from "react-redux";
import { signIn, signOut, fetchPreviousState } from "../actions";
import Dropdown from "./Dropdown";
import uoftAPI from "../api/UofTAPI";

class GoogleAuth extends React.Component {
  container = React.createRef();
  state = { showDropdown: false };
  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({ showDropdown: false });
    }
  };
  toggleDropdown = () => {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
  };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "259069119446-rplk4jftaecdjkl08rsdcdku9qmvkt5g.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
      this.props.fetchPreviousState(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };
  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
    this.toggleDropdown();
  };
  onSaveClick = () => {
    uoftAPI({
      method: "post",
      url: `/user/${this.auth.currentUser.get().getId()}`,
      data: {
        userID: this.auth.currentUser.get().getId(),
        state: this.props.selectedPrograms,
      },
    });
    this.toggleDropdown();
  };
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      const img = this.auth.currentUser.get().getBasicProfile().getImageUrl();
      return (
        <span ref={this.container}>
          <button
            className="google-login logged-in py-2 ml-2"
            onClick={this.toggleDropdown}
          >
            <img id="profile-logo" src={img} alt="Profile"></img>
            <i className="fas fa-caret-down ml-2"></i>
          </button>
          <Dropdown
            onSaveClick={this.onSaveClick}
            onSignOutClick={this.onSignOutClick}
            dropdownState={this.state.showDropdown}
          />
        </span>
      );
    } else {
      return (
        <button
          className="google-login not-logged-in py-2 pl-2 pr-3"
          onClick={this.onSignInClick}
        >
          <img
            id="google-logo"
            src="http://pngimg.com/uploads/google/google_PNG19635.png"
            alt="Profile"
          ></img>
          <span className="pl-2">Sign in with Google</span>
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.currentUserId,
    selectedPrograms: state.selectedPrograms,
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  fetchPreviousState,
})(GoogleAuth);
