import { useState } from "react";
import "./App.css";
import Authenticate from "./Authenticate";
import jwt_decode from "jwt-decode";
import FileUpload from "./FileUpload";

function App() {
  const [user, setUser] = useState({});
  const handleCallbackResponse = (response) => {
    // console.log("Encoded JWT ID token: " + response.credential);
    var currUser = jwt_decode(response.credential);
    fetch(`http://localhost:3000/users/${currUser.aud}`);

    setUser(currUser);
  };

  return (
    <div className="App">
      {/* <FileUpload /> */}
      {Object.keys(user).length > 0 ? (
        <FileUpload user={user} setUser={setUser} />
      ) : (
        <Authenticate handleCallbackResponse={handleCallbackResponse} />
      )}
    </div>
  );
}

export default App;
