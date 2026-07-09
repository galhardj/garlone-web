import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/src/components/common/Forms/Login";
import { getLoginUserData } from "@/src/lib/api/login";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/src/lib/api/login", () => ({
  getLoginUserData: jest.fn(),
}));

const mockedGetLoginUserData = getLoginUserData as jest.MockedFunction<
  typeof getLoginUserData
>;

describe("LoginForm", () => {
  const user = userEvent.setup();

  const getByTestId = (testId: string): HTMLElement =>
    screen.getByTestId(testId);

  beforeEach(() => {
    jest.clearAllMocks();
    render(<LoginForm />);
  });

  describe("Common flow", () => {
    it("renders the email and password inputs and login button", () => {
      expect(getByTestId("login-email")).toBeInTheDocument();
      expect(getByTestId("login-password")).toBeInTheDocument();
      expect(getByTestId("login-submit")).toBeInTheDocument();
    });

    it("toggles password visibility when clicking the eye button", async () => {
      const passwordInput = getByTestId("login-password");
      const getTogglePasswordButton = screen.getByRole("button", {
        name: "toggle password visibility",
      });
      expect(passwordInput).toHaveAttribute("type", "password");

      await user.click(getTogglePasswordButton);
      expect(passwordInput).toHaveAttribute("type", "text");

      await user.click(getTogglePasswordButton);
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  describe("Include error flow", () => {
    const EMPTY_OR_WHITESPACE = /^\s*$/;
    const getAlert = (): HTMLElement => screen.getByRole("alert");

    describe("Error from input fields", () => {
      it("shows error when submitting with empty fields", async () => {
        await user.click(getByTestId("login-submit"));

        expect(getAlert()).toBeInTheDocument();
        expect(getAlert()).not.toHaveTextContent(EMPTY_OR_WHITESPACE);
        expect(mockedGetLoginUserData).not.toHaveBeenCalled();
      });

      it("shows error when email format is invalid", async () => {
        await user.type(getByTestId("login-email"), "not-an-email");
        await user.type(getByTestId("login-password"), "password123");
        await user.click(getByTestId("login-submit"));

        expect(getAlert()).toBeInTheDocument();
        expect(getAlert()).not.toHaveTextContent(EMPTY_OR_WHITESPACE);
        expect(mockedGetLoginUserData).not.toHaveBeenCalled();
      });
    });

    describe("getLoginUserData; Success & Error", () => {
      it("calls getLoginUserData and redirects on successful login", async () => {
        mockedGetLoginUserData.mockResolvedValueOnce({} as never);

        await user.type(getByTestId("login-email"), "user@example.com");
        await user.type(getByTestId("login-password"), "password123");
        await user.click(getByTestId("login-submit"));

        expect(mockedGetLoginUserData).toHaveBeenCalledWith(
          "user@example.com",
          "password123",
        );
        expect(mockPush).toHaveBeenCalledWith("/about-us");
      });

      it("shows error message when login request fails", async () => {
        mockedGetLoginUserData.mockRejectedValueOnce(
          new Error("Invalid credentials"),
        );

        await user.type(getByTestId("login-email"), "user@example.com");
        await user.type(getByTestId("login-password"), "wrong-password");
        await user.click(getByTestId("login-submit"));

        expect(getAlert()).toBeInTheDocument();
        expect(getAlert()).not.toHaveTextContent(EMPTY_OR_WHITESPACE);
        expect(mockPush).not.toHaveBeenCalled();
      });
    });

    describe("Any input clears error message from UI", () => {
      const queryAlert = () => screen.queryByRole("alert");

      it("clears error when typing in the email field", async () => {
        await user.click(getByTestId("login-submit"));
        expect(getAlert()).toBeInTheDocument();

        await user.type(getByTestId("login-email"), "a");
        expect(queryAlert()).not.toBeInTheDocument();
      });

      it("clears error when typing in the password field", async () => {
        await user.click(getByTestId("login-submit"));
        expect(getAlert()).toBeInTheDocument();

        await user.type(getByTestId("login-password"), "a");
        expect(queryAlert()).not.toBeInTheDocument();
      });
    });
  });
});
