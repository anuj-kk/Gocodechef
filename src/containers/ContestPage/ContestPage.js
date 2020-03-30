import React, { useEffect, useState } from "react";

import ProblemPage from "../ProblemPage/ProblemPage";

import styles from "./ContestPage.module.css";
import NavbarPage from "../../components/NavBar";

const ContestInput = props => {
  useEffect(() => {
    fetchRanklist();
  }, []);

  const [ranklist, setRanklist] = useState([]);
  const [problem, setProblem] = useState();

  const fetchRanklist = async () => {
    let res = await fetch(
      `https://api.codechef.com/rankings/${props.details.code}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${props.token}`
        }
      }
    );
    res = await res.json();
    res = res.result.data.content.slice(0, 50);
    setRanklist(res);
  };

  const displayProblems = props.details.problems.map(problem => {
    return (
      <li onClick={() => fetchProblem(problem.problemCode)}>
        {problem.problemCode}
      </li>
    );
  });

  const displaySuccessfulSubmissions = props.details.problems.map(problem => (
    <li>
      {problem.problemCode} - {problem.successfulSubmissions}
    </li>
  ));

  const displayRanklist =
    ranklist.length !== 0
      ? ranklist.map(rank => {
          return (
            <li>
              {rank.username} - {rank.totalScore}
            </li>
          );
        })
      : null;

  const fetchProblem = async probCode => {
    let res = await fetch(
      `https://api.codechef.com/contests/${props.details.code}/problems/${probCode}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${props.token}`
        }
      }
    );
    res = await res.json();
    console.log(res);
    setProblem(res.result.data.content);
  };

  return !problem ? (
    <>
    <NavbarPage />
    <div className={styles.container}>
      <div className={styles.questions_container}>
        <div className={styles.header_container}>
          <h1>Contest Name : {props.details.name}</h1>
          <h1>Start : {props.details.date}</h1>
        </div>
        <div>
          <span>
            <ul>{displayProblems}</ul>
          </span>
        </div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.activity_container}>
          <div className={styles.header_container}>
            <h1>Successful Submissions</h1>
          </div>
          <div>
            <ul>{displaySuccessfulSubmissions}</ul>
          </div>
        </div>
        <div className={styles.ranklist_container}>
          <div className={styles.activity_container}>
            <div className={styles.header_container}>
              <h1>Rank List</h1>
            </div>
            <div>
              <ol>{displayRanklist}</ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>) : (
    <ProblemPage details={problem} token={props.token} />
  );
};

export default ContestInput;
