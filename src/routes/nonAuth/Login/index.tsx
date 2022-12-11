import { FC } from "react";
import { useForm, FormErrors } from "@mantine/form";

import Input from "components/Input";
import Button from "components/Button";
import useAuthStore from "stores/auth";
import useUsersStore from "stores/user";

type LoginForm = {
  branchId: string;
  username: string;
  password: string;
};

const getErrorMessage = (errors: FormErrors) => {
  if (Object.keys(errors).some((key) => errors[key] === "required")) {
    return "All fields are required.";
  }
  if (errors.username === "incorrect") {
    return "User not found.";
  }
  let retVal = "";
  if (errors.branchId === "incorrect") {
    retVal += "Branch ID";
  }
  if (errors.password === "incorrect") {
    if (retVal) {
      retVal += " and ";
    }
    retVal += "Password";
  }
  return `${retVal} is incorrect.`;
};

const Login: FC = () => {
  const { login } = useAuthStore();

  const { users } = useUsersStore();

  const form = useForm<LoginForm>({
    initialValues: {
      branchId: "",
      username: "",
      password: "",
    },
    validate: ({ branchId, username, password }) => {
      if (
        branchId.trim() === "" ||
        username.trim() === "" ||
        password.trim() === ""
      ) {
        return {
          branchId: branchId.trim() === "" ? "required" : null,
          username: username.trim() === "" ? "required" : null,
          password: password.trim() === "" ? "required" : null,
        };
      }
      const validUsername = users.has(username);
      const branchIdError = () => {
        if (isNaN(Number(branchId))) return "invalid";
        if (validUsername && users.get(username)?.branchId !== Number(branchId))
          return "incorrect";
        return null;
      };
      const passwordError = () => {
        if (validUsername && users.get(username)?.password !== password)
          return "incorrect";
        return null;
      };
      return {
        branchId: branchIdError(),
        username: validUsername ? null : "incorrect",
        password: passwordError(),
      };
    },
  });

  const handleLogin = (values: LoginForm) => {
    if (users.has(values.username)) {
      const record = users.get(values.username);
      if (
        record?.branchId === Number(values.branchId) &&
        record.password === values.password
      ) {
        login(values.username);
      }
    }
  };

  const renderError = Boolean(Object.keys(form.errors).length);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form
        className="p-5 w-1/5 border border-2 border-gray-700"
        onSubmit={form.onSubmit(handleLogin)}
      >
        <h1 className="text-black text-lg font-semibold mb-3">Login</h1>
        <Input
          className="mt-3"
          placeholder="Branch id"
          {...form.getInputProps("branchId")}
        />
        <Input
          className="mt-3"
          placeholder="User name"
          {...form.getInputProps("username")}
        />
        <Input
          className="mt-3"
          placeholder="Password"
          type="password"
          {...form.getInputProps("password")}
        />
        <Button className="w-full my-3 font-semibold" primary type="submit">
          LOGIN
        </Button>
        {renderError && (
          <div className="px-1 py-3 font-semibold text-rose-600 bg-rose-300">
            {`Error: ${getErrorMessage(form.errors)}`}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
