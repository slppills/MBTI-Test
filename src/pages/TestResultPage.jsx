import React, { useEffect, useState } from "react";
import { deleteTestResult, getTestResults, updateTestResultVisibility } from "../api/testResults";
import useUserStore from "../zustand/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile } from "../api/auth";
import { Navigate } from "react-router-dom";

const TestResultPage = () => {
  const [testResults, setTestResults] = useState([]);
  const { userId } = useUserStore();
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
        console.log(data);
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
      {testResults.map((testResult, index) => {
        if (testResult.visibility === false && testResult.userId !== userId) return;
        const utcDate = new Date(testResult.date);
        const formattedDate = utcDate.toLocaleString();
        return (
          <div key={index} className="bg-[#1C2430] mb-8 px-[30px] pt-[30px] pb-[20px] rounded-[8px]">
            <div className="flex justify-between gap-[100px] items-end mb-[30px] pb-[10px] border-b border-solid border-gray-500">
              <h3 className="text-white font-medium">{testResult.nickname}</h3>
              <p className="text-white text-[12px]">{formattedDate}</p>
            </div>
            <p className="text-center text-[#EDC437] text-[28px]">{testResult.result}</p>
            <div className={`mt-[50px] justify-between ${userId === testResult.userId ? "flex" : "hidden"}`}>
              <button
                className="bg-[#3587F2] text-white font-bold px-[15px] py-[8px] rounded-[8px]"
                onClick={() =>
                  mutation.mutate({
                    action: "changeVisibility",
                    data: { id: testResult.id, visibility: !testResult.visibility },
                  })
                }
              >
                {testResult.visibility ? "비공개로 전환" : "공개로 전환"}
              </button>
              <button
                className="bg-[#F24150] text-white px-[15px] py-[8px] rounded-[8px]"
                onClick={() => mutation.mutate({ action: "delete", data: testResult.id })}
              >
                삭제
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestResultPage;
