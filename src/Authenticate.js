import React, { useEffect } from "react";

const Authenticate = ({ handleCallbackResponse }) => {
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "65400846458-vj68ns72102qvohlfknsca2arbr3ammf.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  return (
    <div className="flex justify-center mt-32">
      <div id="signInDiv"></div>
    </div>
  );
};

export default Authenticate;
