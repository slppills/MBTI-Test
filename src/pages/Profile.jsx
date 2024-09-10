import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const [updateNickname, setUpdateNickname] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const newNickname = await updateProfile({ nickname }, token);
      alert("닉네임 변경이 완료되었습니다.");
      setNickname(newNickname);
      setUpdateNickname(!updateNickname);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const name = await getUserProfile(token);
        setNickname(name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [updateNickname]);

  return (
    <div className="bg-white p-[30px] rounded-[8px]">
      <h1 className="text-[1.5rem] font-semibold">프로필 수정</h1>

      <form onSubmit={handleSubmit} className="w-[400px] flex flex-col">
        <label className="mt-[30px]">닉네임</label>
        <input
          type="text"
          className="mt-[10px] h-[50px] pl-[8px] rounded-[8px] border-[2px] border-gray-300"
          value={nickname || ""}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button
          type="submit"
          className="h-[50px] pl-[8px] mt-[20px] rounded-[8px] bg-red-400 text-white hover:bg-red-500 transition"
        >
          프로필 업데이트
        </button>
      </form>
    </div>
  );
};

export default Profile;
