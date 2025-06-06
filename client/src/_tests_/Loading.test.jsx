import { render, screen } from "@testing-library/react";
import Loading from "../components/Loading";

describe("Loading component", () => {
    test("renders the spinner", () => {
        render(<Loading />);
        const spinner = screen.getByTestId("loading-spinner");
        expect(spinner).toBeInTheDocument();
    });
});
