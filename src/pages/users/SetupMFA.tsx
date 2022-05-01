import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import { CognitoUser } from "aws-amplify/node_modules/@aws-amplify/auth";
import awsExports from "../../aws-exports";

import { Amplify, Auth } from "aws-amplify";

// Amplifyの設定
Amplify.configure(awsExports);

export const SetupMFA: React.FC = () => {
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const [QRCodeUrl, setQRCodeUrl] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    setUpTOTP()
  }, [])

  // TOTPの設定を行う
  const setUpTOTP = () => {
    Auth.setupTOTP(user).then((code) => {
      console.log(user);
      const issuer = encodeURI("AWSCognito");

      // issuer→Authyに表示されるアプリ名
      // user→アプリ名の下に表示されるユーザー名
      const str =
        "otpauth://totp/AWSCognito:" +
        user.getUsername() +
        "?secret=" +
        code +
        "&issuer=" +
        issuer;
      setQRCodeUrl(str); // QRコードのURLを設定
      setShowQRCode(true); // QRコードを表示
    });
  };

  // tokenの検証
  const verifyToken = (e: React.FormEvent, user: CognitoUser) => {
    e.preventDefault();
    // 入力したtokenが正しい場合に、2段階認証の設定を完了しデバイスを登録する
    Auth.verifyTotpToken(user, token).then(() => {
      Auth.setPreferredMFA(user, "TOTP");
    });
  };

  // tokenの入力を監視
  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value as string);
  };

  return (
    <>
      <QRCode value={QRCodeUrl} />
      <form onSubmit={(e) => verifyToken(e, user)}>
        <input
          type="text"
          placeholder="type veryfication code"
          value={token}
          onChange={handleTokenChange}
        />
        <button>VERIFY</button>
      </form>
    </>
  );
};
