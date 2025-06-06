// Profile.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "../pages/Profile/user-account/Profile";
import { AuthContext } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

// Mock user
const mockUser = {
    _id: "user123",
    name: "Test User",
    email: "test@example.com",
    photo: "http://example.com/photo.jpg",
    gender: "female",
    bloodType: "B+",
};

// Mock fetch
global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Profile updated" }),
    })
);

// Mock Cloudinary uploader
vi.mock("../../utils/uploadCloudinary", () => ({
    default: vi.fn(() =>
        Promise.resolve({ url: "http://example.com/updated-photo.jpg" })
    ),
}));

describe("Profile Component", () => {
    const token = "mockToken";

    const renderComponent = () =>
        render(
            <AuthContext.Provider value={{ token }}>
                <MemoryRouter>
                    <Profile user={mockUser} />
                </MemoryRouter>
            </AuthContext.Provider>
        );

    test("renders user data correctly", async () => {
        renderComponent();

        expect(screen.getByTestId("input-name")).toHaveValue("Test User");
        expect(screen.getByTestId("input-email")).toHaveValue("test@example.com");
        expect(screen.getByTestId("select-gender")).toHaveValue("female");
        expect(screen.getByTestId("input-bloodType")).toHaveValue("B+");
    });

    test("submits the form successfully", async () => {
        renderComponent();

        fireEvent.change(screen.getByTestId("input-name"), {
            target: { value: "Updated Name" },
        });

        fireEvent.change(screen.getByTestId("select-gender"), {
            target: { value: "male" },
        });

        fireEvent.click(screen.getByTestId("update-button"));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining("/users/user123"),
                expect.objectContaining({
                    method: "PUT",
                    headers: expect.objectContaining({
                        Authorization: `Bearer ${token}`,
                    }),
                })
            );
        });
    });
});

