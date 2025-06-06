import { render, screen } from "@testing-library/react";
import Error from "../components/Error";

describe("Error component", () => {
    test("renders the error message", () => {
        const message = "Something went wrong!";
        render(<Error errorMessage={message} />);

        const errorElement = screen.getByTestId("error-message");
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toHaveTextContent(message);
    });
});
