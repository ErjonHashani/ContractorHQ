import { render, screen, fireEvent } from "@testing-library/react";
import UserProfileClient from "../auth/UserProfileClient";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock next/navigation useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock next-auth signOut
jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("UserProfileClient", () => {
  const mockUser = {
    _id: "123",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: "2023-01-01T00:00:00.000Z",
  };

  const pushMock = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (signOut as jest.Mock).mockResolvedValue(null);
    pushMock.mockClear();
    (signOut as jest.Mock).mockClear();
  });

  it("renders user info correctly", () => {
    render(<UserProfileClient user={mockUser} />);

    expect(screen.getByText("Profile Overview")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("user")).toBeInTheDocument();
    expect(screen.getByText("Member Since")).toBeInTheDocument();
    expect(screen.getByText("1/1/2023")).toBeInTheDocument(); // depending on locale this might differ
  });

  it("calls signOut and redirects on sign out button click", async () => {
    render(<UserProfileClient user={mockUser} />);

    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    fireEvent.click(signOutButton);

    // signOut should have been called once
    expect(signOut).toHaveBeenCalledWith({ redirect: false });

    // Wait for async calls, then router.push should be called
    // Since handleSignOut is async, wrap assertions in act
    await Promise.resolve();

    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
