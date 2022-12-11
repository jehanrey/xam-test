import { FC, useState, useEffect } from "react";

import Table from "components/Table";
import useUsersStore from "stores/user";
import Header from "./Header";
import Form from "./Form";
import { getUserTableColumns } from "./utils";

const Dashboard: FC = () => {
  const { users, removeUser } = useUsersStore();

  const [largeScreen, setLargeScreen] = useState(window.innerWidth > 1200);

  const checkResolution = ({ matches }: MediaQueryListEvent) =>
    setLargeScreen(matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1200px)");
    mediaQuery.addEventListener("change", checkResolution);
    return () => mediaQuery.removeEventListener("change", checkResolution);
  }, []);

  return (
    <div className="py-5 px-10">
      <Header />
      <div className={`my-20 flex ${largeScreen ? "gap-5" : "flex-col"}`}>
        <Form className={largeScreen ? "w-1/3" : "w-full mb-10"} />
        <div className="flex-grow">
          <Table
            dataSource={Array.from(users.values())}
            columns={getUserTableColumns({ removeUser })}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
