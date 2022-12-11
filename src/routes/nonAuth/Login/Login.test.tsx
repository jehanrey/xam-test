import { render, screen, waitFor, renderHook } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useAuthStore from "stores/auth";
import Login from "../Login";

const originalState = useAuthStore.getState();
beforeEach(() => {
  useAuthStore.setState(originalState);
});

test("renders the login form", () => {
  render(<Login />);
  const header = screen.getByText("Login");
  expect(header).toBeInTheDocument();
  const branchIdField = screen.getByPlaceholderText(/branch id/i);
  expect(branchIdField).toBeInTheDocument();
  const usernameField = screen.getByPlaceholderText(/user name/i);
  expect(usernameField).toBeInTheDocument();
  const passwordField = screen.getByPlaceholderText(/password/i);
  expect(passwordField).toBeInTheDocument();
  const loginButton = screen.getByRole("button");
  expect(loginButton).toHaveTextContent("LOGIN");
});

test("required fields error", async () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  userEvent.click(loginButton);
  await waitFor(() => {
    const requiredFieldsError = screen.queryByText(/all fields are required/i);
    expect(requiredFieldsError).toBeInTheDocument();
  });
  const branchIdField = screen.getByPlaceholderText(/branch id/i);
  userEvent.type(branchIdField, "1");
  const usernameField = screen.getByPlaceholderText(/user name/i);
  userEvent.type(usernameField, "user");
  const passwordField = screen.getByPlaceholderText(/password/i);
  userEvent.type(passwordField, "pass");
  userEvent.click(loginButton);
  await waitFor(() => {
    const requiredFieldsError = screen.queryByText(/all fields are required/i);
    expect(requiredFieldsError).not.toBeInTheDocument();
  });
});

test("user not found", async () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  const branchIdField = screen.getByPlaceholderText(/branch id/i);
  userEvent.type(branchIdField, "1");
  const usernameField = screen.getByPlaceholderText(/user name/i);
  userEvent.type(usernameField, "fake-user");
  const passwordField = screen.getByPlaceholderText(/password/i);
  userEvent.type(passwordField, "pass");
  userEvent.click(loginButton);
  await waitFor(() => {
    const userNotFoundError = screen.queryByText(/user not found/i);
    expect(userNotFoundError).toBeInTheDocument();
  });
});

test("invalid credentials", async () => {
  render(<Login />);
  const loginButton = screen.getByRole("button");
  const branchIdField = screen.getByPlaceholderText(/branch id/i);
  const usernameField = screen.getByPlaceholderText(/user name/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  userEvent.type(usernameField, "testuser01");
  userEvent.type(branchIdField, "1");
  userEvent.type(passwordField, "pass");
  userEvent.click(loginButton);
  await waitFor(() => {
    const invalidCredentialsError = screen.queryByText(
      /branch id and password is incorrect/i
    );
    expect(invalidCredentialsError).toBeInTheDocument();
  });
  userEvent.clear(branchIdField);
  userEvent.type(branchIdField, "10001");
  userEvent.click(loginButton);
  await waitFor(() => {
    const invalidPasswordError = screen.queryByText(/password is incorrect/i);
    expect(invalidPasswordError).toBeInTheDocument();
  });
  userEvent.clear(branchIdField);
  userEvent.clear(passwordField);
  userEvent.type(branchIdField, "0");
  userEvent.type(passwordField, "pa55w0rd001");
  userEvent.click(loginButton);
  await waitFor(() => {
    const invalidBranchIdError = screen.queryByText(/branch id is incorrect/i);
    expect(invalidBranchIdError).toBeInTheDocument();
  });
});

test("login successfully", async () => {
  render(<Login />);
  const { result: auth } = renderHook(() => useAuthStore());
  expect(auth.current.currentUser).toEqual(undefined);
  const loginButton = screen.getByRole("button");
  const branchIdField = screen.getByPlaceholderText(/branch id/i);
  const usernameField = screen.getByPlaceholderText(/user name/i);
  const passwordField = screen.getByPlaceholderText(/password/i);
  userEvent.type(usernameField, "testuser01");
  userEvent.type(branchIdField, "10001");
  userEvent.type(passwordField, "pa55w0rd001");
  userEvent.click(loginButton);
  await waitFor(() => {
    expect(auth.current.currentUser).toEqual("testuser01");
  });
});
