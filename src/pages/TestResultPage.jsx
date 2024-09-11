import React, { useEffect, useState } from "react";
import { deleteTestResult, getTestResults, updateTestResultVisibility } from "../api/testResults";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "../api/auth";
import { Navigate } from "react-router-dom";
import TestResultList from "../components/TestResultList";

const TestResultPage = () => {
  const [testResults, setTestResults] = useState([]);
  const queryClient = useQueryClient();
  const token = localStorage.getItem("accessToken");

  const { data, isPending } = useQuery({
    queryKey: ["allResults"],
    queryFn: () => getTestResults(),
  });

  const { isError } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserProfile(token),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: ({ action, data }) => {
      if (action === "changeVisibility") {
        return updateTestResultVisibility(data);
      } else {
        return deleteTestResult(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allResults"]);
    },
  });

  useEffect(() => {
    if (data) {
      setTestResults(data);
    }
  }, [data]);

  if (isPending) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    alert("토큰이 만료되었습니다. 다시 로그인 해주세요");
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" />;
  }

  return (
    <div className="mx-auto mt-10 bg-white px-[100px] py-[30px] mb-[70px] rounded-[8px]">
      <h1 className="text-2xl font-bold mb-8">모든 테스트 결과</h1>
      <TestResultList testResults={testResults} mutation={mutation} />
    </div>
  );
};

export default TestResultPage;
