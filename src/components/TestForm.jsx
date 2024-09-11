import React, { useState } from "react";
import { questions } from "../data/questions";
import { useNavigate } from "react-router-dom";

const TestForm = ({ onSubmit, showResult, setShowResult, myMBTI }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const navigate = useNavigate();

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (answers.includes(null)) {
    //   alert("모든 항목을 체크해주세요.");
    // } else {
    onSubmit(answers);
    setShowResult(true);
    // }
  };

  return !showResult ? (
    <form onSubmit={handleSubmit} className="space-y-16 p-8 bg-gray-100 rounded shadow-md">
      {questions.map((q, index) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">{q.question}</p>
          {q.options.map((option, i) => (
            <label key={i} className="block mt-4">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleChange(index, option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-blue-500 text-white py-4 transition rounded hover:bg-blue-600"
      >
        제출하기
      </button>
    </form>
  ) : (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">당신의 MBTI는 ?</h1>
      <p className="text-6xl font-bold mb-8">{myMBTI}</p>
      <button
        onClick={() => navigate("/results")}
        className="bg-red-400 hover:bg-red-500 transition px-6 py-4 text-white font-medium rounded-[8px]"
      >
        결과 페이지로 이동하기
      </button>
    </div>
  );
};

export default TestForm;
