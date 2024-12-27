import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../src/components/LoginForm";

describe("LoginForm Component", () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleInputChange = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockSignIn = jest.fn();

  beforeEach(() => {
    render(
      <LoginForm
        email=""
        password=""
        error=""
        setEmail={mockSetEmail}
        setPassword={mockSetPassword}
        handleInputChange={mockHandleInputChange}
        handleSubmit={mockHandleSubmit}
        signIn={mockSignIn}
      />
    );
  });

  test("renders the form", () => {
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
  });

  test("calls handleInputChange on input change", () => {
    const emailInput = screen.getByPlaceholderText(/Enter your email address/i);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  test("calls handleSubmit on form submission", () => {
    const submitButton = screen.getByText(/Sign In/i);
    fireEvent.click(submitButton);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  test("calls signIn with correct provider on Google button click", () => {
    const googleButton = screen.getByText(/Google/i);
    fireEvent.click(googleButton);
    expect(mockSignIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });

  test("calls signIn with correct provider on GitHub button click", () => {
    const githubButton = screen.getByText(/GitHub/i);
    fireEvent.click(githubButton);
    expect(mockSignIn).toHaveBeenCalledWith("github", { callbackUrl: "/" });
  });
});
