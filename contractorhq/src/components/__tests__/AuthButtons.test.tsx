/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import AuthButtons from "../auth/AuthButtons";
import * as nextAuth from "next-auth/react";

jest.mock("next-auth/react");

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));


describe("AuthButtons simple tests", () => {
  const useSessionMock = jest.spyOn(nextAuth, "useSession");

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("shows Sign in button when no session", () => {
    useSessionMock.mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: jest.fn(),
    } as any);
    render(<AuthButtons />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test("shows user first letter when logged in", () => {
    useSessionMock.mockReturnValue({
      data: {
        user: {
          id: "123",
          name: "Erjon",
          email: "erjon@example.com",
          role: "user",
        },
      },
      status: "authenticated",
      update: jest.fn(),
    } as any);
    render(<AuthButtons />);
    expect(screen.getByText("E")).toBeInTheDocument();
  });
});
