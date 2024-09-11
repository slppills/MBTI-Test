import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login, register } from "../api/auth";
import useUserStore from "../zustand/userStore";

const AuthForm = () => {
  const { setUserId, setUserNickname } = useUserStore();
  const location = useLocation();
  const isLoginpage = location.pathname === "/login";
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "id":
        setFormData({ ...formData, id: e.target.value });
        break;
      case "password":
        setFormData({ ...formData, password: e.target.value });
        break;
      default:
        setFormData({ ...formData, nickname: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      !isLoginpage ? register(formData, navigate) : login(formData, navigate, setUserId, setUserNickname);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-[30px] rounded-[8px]">
      <h1 className="text-[1.5rem] font-semibold">{isLoginpage ? "로그인" : "회원가입"}</h1>
      <form
        onSubmit={handleSubmit}
        className="p-[20px] bg-[#eff1f3] mt-[30px] rounded-[8px] flex flex-col gap-[20px] w-[400px]"
      >
        <input
          name="id"
          type="text"
          placeholder="아이디"
          value={formData.id}
          className="h-[50px] pl-[8px] rounded-[8px] border-[2px] border-gray-300"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          className="h-[50px] pl-[8px] rounded-[8px] border-[2px] border-gray-300"
          onChange={handleChange}
        />
        {!isLoginpage && (
          <input
            name="nickname"
            type="text"
            placeholder="닉네임"
            value={formData.nickname}
            className="h-[50px] pl-[8px] rounded-[8px] border-[2px] border-gray-300"
            onChange={handleChange}
          />
        )}
        <button
          type="submit"
          className="h-[50px] pl-[8px] rounded-[8px] bg-red-400 text-white hover:bg-red-500 transition"
        >
          {isLoginpage ? "로그인" : "회원가입"}
        </button>
      </form>
      <p className="mt-[20px] text-center">
        {isLoginpage ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}
        <Link to={isLoginpage ? "/sign-up" : "/login"} className="text-red-500 font-bold p-[5px]">
          {isLoginpage ? "회원가입" : "로그인"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
