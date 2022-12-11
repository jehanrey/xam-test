import Button from "components/Button";
import { TableColumns } from "components/Table";

export const getUserTableColumns = ({
  removeUser,
}: {
  removeUser: (username: string) => void;
}): TableColumns => [
  {
    key: "no",
    title: "#",
    width: "5%",
    render: (_data, _row, ix) => ix + 1,
  },
  {
    key: "branchId",
    title: "Branch ID",
    width: "15%",
  },
  {
    key: "userName",
    title: "Username",
    width: "15%",
  },
  {
    key: "name",
    title: "Name",
    width: "25%",
    render: (_data, { firstName, middleName, lastName }) => {
      const middleInitial = Boolean(middleName)
        ? ` ${middleName.charAt(0)}. `
        : " ";
      return `${firstName}${middleInitial}${lastName}`;
    },
  },
  {
    key: "position",
    title: "Position",
    width: "20%",
    render: (data) => data || "---",
  },
  {
    key: "action",
    title: "Action",
    width: "15%",
    render: (_data, { userName }) => (
      <Button
        className="border border-1 border-black text-xs leading-none px-2 py-1"
        rounded={false}
        onClick={() => removeUser(userName)}
      >
        REMOVE
      </Button>
    ),
  },
];
