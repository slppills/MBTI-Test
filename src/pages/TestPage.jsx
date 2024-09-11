import React, { useState } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import useUserStore from "../zustand/userStore";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/auth";
import { Navigate } from "react-router-dom";

const Test = () => {
  const { userId, userNickname } = useUserStore();
  const [showResult, setShowResult] = useState(false);
  const [myMBTI, setMyMBTI] = useState("");
  const token = localStorage.getItem("accessToken");

  const { isError } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserProfile(token),
    retry: false,
  });

  if (isError) {
    alert("토큰이 만료되었습니다. 다시 로그인 해주세요");
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" />;
  }

  const handleTestSubmit = async (answers) => {
    const result = calculateMBTI(answers);
    const resultData = {
      userId: userId,
      nickname: userNickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true,
    };
    setMyMBTI(await createTestResult(resultData));
  };

  return (
    <div className="mx-auto mt-10 bg-white px-[100px] py-[50px] mb-[70px] rounded-[8px]">
      <h1 className="text-2xl font-bold mb-8">{!showResult && "MBTI 테스트"}</h1>
      <TestForm onSubmit={handleTestSubmit} myMBTI={myMBTI} showResult={showResult} setShowResult={setShowResult} />
    </div>
  );
};

export default Test;
