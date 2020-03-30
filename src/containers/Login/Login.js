import React, { useState } from "react";
import CodechefLogin from "react-codechef-login";

import ContestInput from "../ContestInput/ContestInput";

import styles from "./Login.module.css";

const Login = props => {
  const [token, setToken] = useState();

  const responseCodechef = async response => {
    if (response.result.data) setToken(response.result.data.access_token);
  };

  return !token ? (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h1>LOGIN</h1>
        <CodechefLogin
          clientId="ac53c5f8a6209e5566c3d952c86a57cd"
          clientSecret="2caabc488d5d6124b7f7df61d87b66c7"
          redirectUri="http://localhost:3000"
          state="vghfcgunfcgyuhbj"
          className={styles.codechef_button}
          buttonText="Login With Codechef"
          onSuccess={response => responseCodechef(response)}
          onFailure={response => responseCodechef(response)}
        />
      </div>
    </div>
  ) : (
    <ContestInput token={token} />
  );
};

export default Login;
