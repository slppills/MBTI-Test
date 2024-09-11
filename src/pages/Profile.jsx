import { useEffect, useState } from "react";
import { getUserProfile, updateProfile } from "../api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "../zustand/userStore";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const [nickname, setNickname] = useState("");
  const token = localStorage.getItem("accessToken");
  const queryClient = useQueryClient();
  const { setUserNickname } = useUserStore();

  const { data, isPending, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: () => getUserProfile(token),
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: () => updateProfile({ nickname }, token),
    onSuccess: () => {
      alert("닉네임 변경이 완료되었습니다.");
      queryClient.invalidateQueries(["userData"]);
    },
  });

  useEffect(() => {
    if (data) {
      setNickname(data);
      setUserNickname(data);
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
    <div className="bg-white p-[30px] rounded-[8px]">
      <h1 className="text-[1.5rem] font-semibold">프로필 수정</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="w-[400px] flex flex-col"
      >
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
