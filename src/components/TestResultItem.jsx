import React from "react";
import useUserStore from "../zustand/userStore";

const TestResultItem = ({ testResult, formattedDate, mutation }) => {
  const { userId } = useUserStore();

  return (
    <div className="bg-[#1C2430] mb-8 px-[30px] pt-[30px] pb-[20px] rounded-[8px]">
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
};

export default TestResultItem;
