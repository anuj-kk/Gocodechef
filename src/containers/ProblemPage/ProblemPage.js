import React, { useEffect, useState } from "react";

import styles from "./ProblemPage.module.css";

const ProblemPage = props => {
  const [program, setProgram] = useState();
  const [inputData, setInputData] = useState();
  const [output, setOutput] = useState();

  const runProgram = async () => {
    console.log(program);
    let res = await fetch(`https://api.codechef.com/ide/run`, {
      method: "POST",
      body: JSON.stringify({
        sourceCode: program,
        language: "C++ 4.3.2",
        input: inputData
      }),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${props.token}`
      }
    });
    res = await res.json();
    res = res.result.data.link;
    console.log(res);
    let newRes = await fetch(
      `https://api.codechef.com/ide/status?link=${res}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${props.token}`
        }
      }
    );
    newRes = await newRes.json();
    console.log(newRes.result.data.output);
    console.log(newRes.result.data);
    setOutput(newRes.result.data.output);
  };

  return (
    <div className={styles.container}>
      <div className={styles.questions_container}>
        <div className={styles.header_container}>
          <h1>{props.details.problemName}</h1>
        </div>
        <div>
          <span dangerouslySetInnerHTML={{ __html: props.details.body }} />
        </div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.activity_container}>
          <div className={styles.header_container}>
            <h1>Submit Solution</h1>
          </div>
          <div>
            <textarea
              rows={20}
              value={program}
              onChange={e => {
                setProgram(e.target.value);
              }}
            />
          </div>
          <div className={styles.header_container}>
            <h2>Run with custom testcases</h2>
          </div>
          <div>
            <textarea
              rows={3}
              value={inputData}
              onChange={e => {
                setInputData(e.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={() => runProgram()}>Run</button>
          </div>
          <div>Output : {output}</div>
        </div>
        <div className={styles.ranklist_container}>
          <div className={styles.activity_container}>
            <div className={styles.header_container}>
              <h1>Submissions</h1>
            </div>
            <div>
              <ul>
                <li>
                  Successful Submissions : {props.details.successfulSubmissions}
                </li>
                <li>Total Submissions : {props.details.totalSubmissions}</li>
                <li>
                  Partial Submissions : {props.details.partialSubmissions}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
