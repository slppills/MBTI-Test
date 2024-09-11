import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData, navigate) => {
  console.log(userData);
  const response = await axios.post(`${API_URL}/register`, userData);
  console.log("response.data", response.data);
  if (response.data.success) {
    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    navigate("/login");
  }
};

export const login = async (userData, navigate, setUserId, setUserNickname) => {
  const { nickname, ...rest } = userData;
  const response = await axios.post(`${API_URL}/login`, rest);
  console.log("response.data", response.data);
  if (response.data.success) {
    localStorage.setItem("accessToken", response.data.accessToken);
    setUserId(response.data.userId);
    setUserNickname(response.data.nickname);
    alert("로그인이 완료되었습니다. 메인 페이지로 이동합니다.");
    navigate("/");
  }
};

export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.nickname;
};

export const updateProfile = async (formData, token) => {
  await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
