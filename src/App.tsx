import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          {user && (
            // ユーザーがログインしているときのみ表示
            <>
              <h1>Hello {user.username}</h1>
              <button onClick={(e) => setUpTOTP()}>SETUP TOTP</button>
              <button onClick={signOut}>Sign out</button>
            </>
          )}
        </main>
      )}
    </Authenticator>
  );
}

export default withAuthenticator(App);
