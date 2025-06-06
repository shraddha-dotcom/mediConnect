import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../pages/Register/Signup";
import { toast } from "react-toastify";
import { MemoryRouter } from "react-router-dom";  // Import MemoryRouter

vi.mock("react-toastify", () => ({
    toast: {
        error: vi.fn(),
        success: vi.fn(),
    },
}));

describe("Signup Component", () => {
    beforeEach(() => {
        toast.error.mockClear();
        toast.success.mockClear();
    });

    test("shows error if gender is not selected", async () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Enter Your Name/i), {
            target: { value: "Test User" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter Your email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: "password123" },
        });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Please select your gender.");
        });
    });
});
