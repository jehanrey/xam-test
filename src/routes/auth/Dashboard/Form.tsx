import { FC } from "react";
import { useForm } from "@mantine/form";

import Input from "components/Input";
import Button from "components/Button";
import useUsersStore from "stores/user";

interface UserForm {
  branchId: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  password: string;
}

interface Props {
  className?: string;
}

const Form: FC<Props> = ({ className }) => {
  const { users, addUser } = useUsersStore();

  const form = useForm<UserForm>({
    initialValues: {
      branchId: "",
      userName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      position: "",
      password: "",
    },
    validate: {
      branchId: (value) => (!Boolean(Number(value.trim())) ? "invalid" : null),
      userName: (value) => {
        if (!value.trim()) return "required";
        if (users.has(value.trim())) return "duplicate";
        return null;
      },
      firstName: (value) => (value.trim() ? null : "required"),
      lastName: (value) => (value.trim() ? null : "required"),
      password: (value) => (value.trim() ? null : "required"),
    },
  });

  const handleAdd = ({ branchId, ...rest }: UserForm) => {
    addUser({ branchId: Number(branchId), ...rest });
    form.reset();
  };

  return (
    <form
      onSubmit={form.onSubmit(handleAdd)}
      onReset={form.onReset}
      className={`${className} p-5 flex flex-col bg-zinc-400`}
    >
      <Input
        className="mt-3"
        placeholder="Branch ID"
        type="number"
        {...form.getInputProps("branchId")}
      />
      <Input
        className="mt-3"
        placeholder="Username"
        {...form.getInputProps("userName")}
      />
      <Input
        className="mt-3"
        placeholder="First Name"
        {...form.getInputProps("firstName")}
      />
      <Input
        className="mt-3"
        placeholder="Middle Name"
        {...form.getInputProps("middleName")}
      />
      <Input
        className="mt-3"
        placeholder="Last Name"
        {...form.getInputProps("lastName")}
      />
      <Input
        className="mt-3"
        placeholder="Position"
        {...form.getInputProps("position")}
      />
      <Input
        className="mt-3"
        placeholder="Password"
        type="password"
        {...form.getInputProps("password")}
      />
      <div className="mt-3 flex justify-end gap-2">
        <Button className="w-1/3 text-xs" type="reset">
          RESET
        </Button>
        <Button className="w-1/3 text-xs" primary type="submit">
          ADD
        </Button>
      </div>
    </form>
  );
};

export default Form;
