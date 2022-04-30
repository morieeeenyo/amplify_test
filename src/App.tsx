import { Amplify } from "aws-amplify";

import {
  AmplifyProvider,
  Authenticator,
  withAuthenticator,
} from "@aws-amplify/ui-react";

import { View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          {user && (
            <>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </>
          )}
        </main>
      )}
    </Authenticator>
  );
}

export default withAuthenticator(App);
