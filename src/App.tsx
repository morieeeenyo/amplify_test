import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./providers/auth/authContext";

function App() {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate()

  const moveToMFASettings = () => {
    navigate("/users/setup-mfa")
  }

  return (
    <Authenticator>
      {isAuthenticated && (
        <>
          <h1>Hello {user?.getUsername()}</h1>
          <button onClick={() => moveToMFASettings()}>SETUP TOTP</button>
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </Authenticator>
  );
}

export default withAuthenticator(App);
