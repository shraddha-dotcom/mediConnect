import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MyAccount from "../pages/Profile/user-account/MyAccount";
import { AuthContext } from "../context/AuthContext";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";


// Mock user data
const mockUserData = {
    name: "John Doe",
    email: "john@example.com",
    bloodType: "O+",
    photo: "https://example.com/photo.jpg",
};

const mockAppointments = [
    {
        _id: "1",
        doctor: {
            _id: "doc1",
            name: "Dr. Smith",
        },
        date: "2025-06-05",
    },
];

vi.mock("../hooks/useFetchData", () => ({
    default: (url) => {
        if (url.includes("appointments")) {
            return {
                data: mockAppointments,
                loading: false,
                error: null,
            };
        }

        // default for user profile endpoint
        return {
            data: mockUserData,
            loading: false,
            error: null,
        };
    },
}));


describe("MyAccount Component", () => {
    const dispatchMock = vi.fn();

    beforeEach(() => {
        dispatchMock.mockClear();
    });

    test("renders user info and toggles tabs", async () => {
        render(
            <AuthContext.Provider value={{ dispatch: dispatchMock }}>
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>

            </AuthContext.Provider>
        );

        // Check if user data is rendered
        const userNameElement = await screen.findByTestId("user-name");
        expect(userNameElement).toHaveTextContent("John Doe");


        expect(screen.getByText("john@example.com")).toBeInTheDocument();
        expect(screen.getByText(/Blood Type:/)).toBeInTheDocument();
        expect(screen.getByText("O+")).toBeInTheDocument();

        // Tabs buttons exist
        const bookingsTab = screen.getByTestId("tab-bookings");
        const settingsTab = screen.getByTestId("tab-settings");

        expect(bookingsTab).toBeInTheDocument();
        expect(settingsTab).toBeInTheDocument();

        // Default tab is bookings
        expect(screen.getByText("My Appointments")).toHaveClass("bg-primaryColor");

        // Click settings tab
        const user = userEvent.setup();
        await user.click(settingsTab);

        // Profile tab should be active now
        await waitFor(() => {
            expect(settingsTab).toHaveClass("bg-primaryColor");
            expect(bookingsTab).not.toHaveClass("bg-primaryColor");
        });
    });

    test("calls logout dispatch when logout button clicked", async () => {
        render(
            <AuthContext.Provider value={{ dispatch: dispatchMock }}>
                <MemoryRouter>
                    <MyAccount />
                </MemoryRouter>

            </AuthContext.Provider>
        );

        const logoutBtn = await screen.findByTestId("logout-button");
        await userEvent.click(logoutBtn);


        expect(dispatchMock).toHaveBeenCalledWith({ type: "LOGOUT" });
    });
});
