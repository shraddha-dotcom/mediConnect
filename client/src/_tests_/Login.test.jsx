import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../pages/Register/Login";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

vi.mock("react-toastify", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("Login Component", () => {
    const dispatchMock = vi.fn();

    beforeEach(() => {
        dispatchMock.mockClear();
        toast.error.mockClear();
        toast.success.mockClear();
    });

    test("successful login flow", async () => {
        // Mock fetch response
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        message: "Login successful",
                        data: { id: "user123", name: "Test User" },
                        token: "fake-token",
                        role: "patient",
                    }),
            })
        );

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ dispatch: dispatchMock }}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByTestId("email-input"), "test@example.com");
        await user.type(screen.getByTestId("password-input"), "password123");

        await user.click(screen.getByTestId("login-button"));

        await waitFor(() => {
            expect(dispatchMock).toHaveBeenCalledWith({
                type: "LOGIN_SUCCESS",
                payload: {
                    user: { id: "user123", name: "Test User" },
                    token: "fake-token",
                    role: "patient",
                },
            });

            expect(toast.success).toHaveBeenCalledWith("Login successful");
        });
    });

    test("shows error on failed login", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () =>
                    Promise.resolve({
                        message: "Invalid credentials",
                    }),
            })
        );

        render(
            <MemoryRouter>
                <AuthContext.Provider value={{ dispatch: dispatchMock }}>
                    <Login />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const user = userEvent.setup();

        await user.type(screen.getByTestId("email-input"), "wrong@example.com");
        await user.type(screen.getByTestId("password-input"), "wrongpassword");

        await user.click(screen.getByTestId("login-button"));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
            expect(dispatchMock).not.toHaveBeenCalled();
        });
    });
});
