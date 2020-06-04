import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "595927962375-ftvok8ri640e1fnn9te2g49u4c3opddl.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      const img = this.auth.currentUser.get().getBasicProfile().getImageUrl();
      return (
        <button
          className="google-login logged-in py-2 pl-2 pr-3"
          onClick={this.onSignOutClick}
        >
          <img id="profile-logo" src={img} alt="Profile"></img>
          <span className="pl-2">Sign Out</span>
        </button>
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
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
