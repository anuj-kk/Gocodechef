import React, { useState, useEffect } from "react";

import ContestPage from "../ContestPage/ContestPage";

import styles from "./ContestInput.module.css";
import NavbarPage from  "../../components/NavBar";


const ContestInput = props => {
  const [code, setCode] = useState("");
  const [contests, setContests] = useState();
  const [details, setDetails] = useState({
    code: "",
    name: "",
    date: "",
    problems: []
  });

  const fetchContests = async () => {
    let res = await fetch(`https://api.codechef.com/contests`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${props.token}`
      }
    });
    res = await res.json();
    res = res.result.data.content;
    setContests(res.contestList);
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchDetails = async () => {
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

  const regex = new RegExp(code, "i");
  const filter =
    code === ""
      ? []
      : contests
          .filter(contest => regex.test(contest.code))
          .map(contest => (
            <div
              className={styles.contest}
              onClick={() => setCode(contest.code)}
            >
              {contest.code}
            </div>
          ))
          .slice(0, 5);

  return details.code == "" ? (
    <div className={styles.container}>
      <div className={styles.login_container}>
        <h1>Enter Contest Code or Name</h1>
        <input
          type="text"
          placeholder="Code or Name"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <div className={styles.filter_container}>{filter}</div>
        <button onClick={() => fetchDetails()}>Go!</button>
      </div>
    </div>
  ) : (
    <ContestPage details={details} token={props.token} />
  );
};

export default ContestInput;