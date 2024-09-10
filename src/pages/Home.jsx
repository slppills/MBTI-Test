import React from "react";

const TextBox = ({ title, content }) => {
  return (
    <div className="p-[1rem] w-[350px] bg-white rounded-[8px]">
      <h2>{title}</h2>
      <p className="mt-[1.5rem] leading-6">{content}</p>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <h1 className="text-[2.5rem] font-bold">무료 성격 테스트</h1>
      <p className="mt-[2rem]">자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.</p>
      <div className="flex gap-[1rem] mt-[3rem]">
        <TextBox
          title="성격 유형 검사"
          content="자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지 알아보세요."
        />
        <TextBox title="성격 유형 이해" content="다른 사람들이 어떻게 행동하는지 이해하는데 도움을 줄 수 있습니다." />
        <TextBox
          title="팀 평가"
          content="팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을 배워보세요."
        />
      </div>
      <button className="mt-[4rem] bg-red-400 hover:bg-red-500 transition text-white py-[15px] px-[25px] rounded-[24px]">
        내 성격 알아보러 가기
      </button>
    </>
  );
};

export default Home;
