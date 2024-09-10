import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (loginStatus) => set(() => ({ isLogin: loginStatus })),
    }),
    {
      name: "isLogin",
    }
  )
);

export default useUserStore;
