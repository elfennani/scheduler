import SignIn from "../pages/SignIn";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as nextAuth from "next-auth/react";
import * as nextNav from "next/navigation";
import { act } from "react-dom/test-utils";

jest.mock("next/navigation");
jest.mock("next-auth/react");

const nextAuthReactMocked = nextAuth as jest.Mocked<typeof nextAuth>;
const nextNavMocked = nextNav as jest.Mocked<typeof nextNav>;

describe("Sign in page", () => {
    it("Should show logo", () => {
        render(<SignIn />);
        const logoText = screen.getByTestId("logo");

        expect(logoText.textContent).toEqual("Scheduler");
    });

    it("should redirect", async () => {
        const signInFunc = jest.fn((provider: any, options: any) =>
            Promise.resolve({
                ok: true,
                error: undefined,
                status: 200,
                url: "t",
            })
        );
        nextAuthReactMocked.signIn.mockImplementation(signInFunc);
        let href: string = "";
        const push = jest.fn((h) => (href = h));
        nextNavMocked.useRouter.mockReturnValue({
            back() {},
            forward() {},
            prefetch(href) {},
            refresh() {},
            replace(href, options) {},
            push: (href) => push(href),
        });
        render(<SignIn />);

        const form = await waitFor(() => screen.getByTestId("signin-form"));

        await act(async () => fireEvent.submit(form));
        expect(push).toBeCalledTimes(1);
        expect(href).toBe("/dashboard");
    });

    it("should show error", async () => {
        const error = "Unauthorized";
        const signInFunc = jest.fn((provider: any, options: any) =>
            Promise.resolve({
                ok: false,
                error: error,
                status: 401,
                url: "",
            })
        );

        nextAuthReactMocked.signIn.mockImplementation(signInFunc);
        await waitFor(() => render(<SignIn />));

        const form = screen.getByTestId("signin-form");
        await act(async () => fireEvent.submit(form));

        const errorCard = await waitFor(() => screen.getByRole("alert"));
        expect(errorCard.textContent).toEqual(`${error}`);
    });

    it("should send correct data", async () => {
        let email;
        let password;
        let provider;

        nextAuthReactMocked.signIn.mockImplementation(
            (userProvider, option) => {
                provider = userProvider;
                email = option?.email;
                password = option?.password;

                return Promise.resolve({
                    ok: true,
                    error: undefined,
                    status: 200,
                    url: "",
                });
            }
        );

        render(<SignIn />);

        const emailInput = await waitFor(() =>
            screen.getByLabelText<HTMLInputElement>("Email")
        );
        const passInput = await waitFor(() =>
            screen.getByLabelText<HTMLInputElement>("Password")
        );
        const mockEmail = "elfennani2002@gmail.com";
        const mockPass = "nizar2002";

        await act(() =>
            fireEvent.change(emailInput, {
                target: { value: mockEmail },
            })
        );

        await act(() =>
            fireEvent.change(passInput, {
                target: { value: mockPass },
            })
        );

        await act(async () =>
            fireEvent.submit(screen.getByTestId("signin-form"))
        );

        expect(email).toEqual(mockEmail);
        expect(password).toEqual(mockPass);
    });
});

export {};
