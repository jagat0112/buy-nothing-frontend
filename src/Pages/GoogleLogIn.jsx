import React from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

const GoogleLogIn = () => {
  const responseGoogleSuccess = (res) => {
    console.log(res);
    axios.post("http://localhost:5002/api/auths/googlelogin", {
      token: res.tokenId,
    });
  };
  const responseFacebook = (res) => {
    console.log(res);
    axios.post("http://localhost:5002/api/auths/facebooklogin", {
      accessToken: res.accessToken,
      userID: res.userID,
    });
  };
  const responseGoogleFailure = () => {};
  return (
    <div className="google-fb-login">
      <div>
        <GoogleLogin
          clientId="572726044409-q4i98b3sa51esf7buq3pihmg0sm6s8be.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <FacebookLogin
        appId="501063744335586"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
};

export default GoogleLogIn;
