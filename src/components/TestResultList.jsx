import React from "react";
import useUserStore from "../zustand/userStore";
import TestResultItem from "./TestResultItem";

const TestResultList = ({ testResults, mutation }) => {
  const { userId } = useUserStore();

  return (
    <>
      {testResults.map((testResult, index) => {
        if (testResult.visibility === false && testResult.userId !== userId) return;
        const utcDate = new Date(testResult.date);
        const formattedDate = utcDate.toLocaleString();
        return <TestResultItem key={index} mutation={mutation} testResult={testResult} formattedDate={formattedDate} />;
      })}
    </>
  );
};

export default TestResultList;
