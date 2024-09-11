import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userId: "",
      userNickname: "",
      setUserId: (newUserId) => set(() => ({ userId: newUserId })),
      setUserNickname: (newUserNickname) => set(() => ({ userNickname: newUserNickname })),
    }),
    {
      name: "userInfo-store",
    }
  )
);

export default useUserStore;
