import { Amplify, Auth } from "aws-amplify";

import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";

import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
import { useState } from "react";

import QRCode from "qrcode.react";
import { CognitoUser } from "aws-amplify/node_modules/@aws-amplify/auth";

Amplify.configure(awsExports);

function App() {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [QRCodeUrl, setQRCodeUrl] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const getTOTP = (user: CognitoUser) => {
    Auth.getPreferredMFA(user, {
      bypassCache: false,
    }).then((data) => {
      console.log("Current preferred MFA type is: " + data);
    });
  };

  const setUpTOTP = (user: CognitoUser) => {
    Auth.setupTOTP(user).then((code) => {
      console.log(user);
      const issuer = encodeURI("AWSCognito");
      const str =
        "otpauth://totp/AWSCognito:" +
        user.getUsername() +
        "?secret=" +
        code +
        "&issuer=" +
        issuer;
      setQRCodeUrl(str);
      setShowQRCode(true);
    });
  };

  const veryfyToken = (e: React.FormEvent, user: CognitoUser) => {
    e.preventDefault();
    Auth.verifyTotpToken(user, token).then(() => {
      Auth.setPreferredMFA(user, "TOTP");
    });
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value as string);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          {user && (
            <>
              <h1>Hello {user.username}</h1>
              <button onClick={(e) => getTOTP(user)}>GET TOTP</button>
              <button onClick={(e) => setUpTOTP(user)}>SETUP TOTP</button>
              {showQRCode && (
                <>
                  <QRCode value={QRCodeUrl} />
                  <form onSubmit={(e) => veryfyToken(e, user)}>
                    <input
                      type="text"
                      placeholder="type veryfication code"
                      value={token}
                      onChange={handleTokenChange}
                    />
                    <button>VERIFY</button>
                  </form>
                </>
              )}
              <button onClick={signOut}>Sign out</button>
            </>
          )}
        </main>
      )}
    </Authenticator>
  );
}

export default withAuthenticator(App);
