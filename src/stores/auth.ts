import create from "zustand";
import { persist } from "zustand/middleware";

interface State {
  currentUser?: string;
  login: (username: string) => void;
  logout: () => void;
}

const useAuthStore = create<State>()(
  persist(
    (set) => ({
      currentUser: undefined,
      login: (username) => set({ currentUser: username }),
      logout: () => set({ currentUser: undefined }),
    }),
    { name: "auth" }
  )
);

export default useAuthStore;
