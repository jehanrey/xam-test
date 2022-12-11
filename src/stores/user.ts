import create from "zustand";

import { users as initUsers } from "data/users_data";

type User = typeof initUsers[0];

interface State {
  users: Map<string, User>;
  addUser: (user: User) => void;
  removeUser: (userName: string) => void;
}

const useUsersStore = create<State>((set, get) => ({
  users: new Map(initUsers.map((user) => [user.userName, user])),
  addUser: (userToAdd: User) => {
    const newState = new Map(get().users);
    if (newState.has(userToAdd.userName)) return;
    newState.set(userToAdd.userName, userToAdd);
    set({ users: newState });
  },
  removeUser: (userToDelete: string) => {
    const newState = new Map(get().users);
    if (!newState.has(userToDelete)) return;
    newState.delete(userToDelete);
    set({ users: newState });
  },
}));

export default useUsersStore;
