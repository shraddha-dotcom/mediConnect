import { render, screen, fireEvent } from '@testing-library/react';
import MyAppointments from '../pages/Profile/user-account/MyAppointments';
import { vi } from 'vitest';
import { AuthContext } from '../context/AuthContext';

//   Mock the custom hook
vi.mock("../hooks/useFetchData", () => ({
    default: () => ({
        data: [
            {
                _id: "123",
                appointmentDate: "2025-06-05",
                time: "10:00 AM",
                day: "Monday",
                doctor: {
                    _id: "doc1",
                    name: "Dr. Alice",
                    specialization: "Cardiologist",
                    photo: "doctor.jpg",
                    timeSlots: [
                        { day: "Monday", startingTime: "10:00", endingTime: "14:00" }
                    ]
                }
            }
        ],
        loading: false,
        error: null,
        refetch: vi.fn()
    })
}));

describe("MyAppointments component", () => {
    it("renders doctor details correctly", () => {
        render(
            <AuthContext.Provider value={{ token: "mock-token" }}>
                <MyAppointments />
            </AuthContext.Provider>
        );

        //  Assertions
        expect(screen.getByTestId("doctor-name")).toHaveTextContent("Dr. Alice");
        expect(screen.getByTestId("cancel-btn-123")).toBeInTheDocument();
        expect(screen.getByTestId("reschedule-btn-123")).toBeInTheDocument();
    });

    it("calls cancelAppointment on Cancel button click", () => {

        window.confirm = vi.fn(() => true);

        render(
            <AuthContext.Provider value={{ token: "mock-token" }}>
                <MyAppointments />
            </AuthContext.Provider>
        );

        const cancelButton = screen.getByTestId("cancel-btn-123");
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(cancelButton);

    });
});

