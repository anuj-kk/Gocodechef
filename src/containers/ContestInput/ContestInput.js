import React, { useState } from "react";

import ContestPage from "../ContestPage/ContestPage";

import styles from "./ContestInput.module.css";
import NavbarPage from  "../../components/NavBar";


const ContestInput = props => {
  const [code, setCode] = useState("");
  const [details, setDetails] = useState({
    code: "",
    name: "",
    date: "",
    problems: []
  });

  const fetchDetails = async () => {
    console.log("here");
    let res = await fetch(`https://api.codechef.com/contests/${code}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${props.token}`
      }
    });
    res = await res.json();
    res = res.result.data.content;
    setDetails({
      code: res.code,
      name: res.name,
      date: res.startDate,
      problems: res.problemsList
    });
  };

  return details.code == "" ? (
    <>
    <NavbarPage />
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h1>Enter Contest Code or Name</h1>
        <input
          type="text"
          placeholder="Code or Name"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button onClick={() => fetchDetails()}>Go!</button>
      </div>
    </div>
    </>
  ) : (
    <ContestPage details={details} token={props.token} />
  );
};

export default ContestInput;
