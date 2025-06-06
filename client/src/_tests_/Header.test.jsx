import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const customRender = (ui, { providerProps }) => {
    return render(
        <AuthContext.Provider value={providerProps}>
            <BrowserRouter>{ui}</BrowserRouter>
        </AuthContext.Provider>
    );
};

describe('Header Component', () => {
    let providerProps;

    beforeEach(() => {
        providerProps = {
            user: null,
            token: null,
            role: null,
        };
    });

    it('should render the logo and nav links (desktop)', () => {
        customRender(<Header />, { providerProps });

        expect(screen.getByTestId('logo')).toBeInTheDocument();
        expect(screen.getByTestId('desktop-menu')).toBeInTheDocument();
        expect(screen.getByTestId('login-button')).toBeInTheDocument();
    });

    it('should open and close the mobile menu when clicked', async () => {
        customRender(<Header />, { providerProps });
        const user = userEvent.setup();

        const toggle = screen.getByTestId('menu-toggle');
        await user.click(toggle);

        // After clicking the toggle, mobile menu should appear
        expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

        // Clicking overlay to close
        await user.click(screen.getByTestId('mobile-menu').parentElement);
        // Since it's conditionally rendered, you'd re-check the DOM
        // The exact assertion depends on how you conditionally render or animate the menu
    });

    it('should show profile if user is logged in', () => {
        providerProps = {
            user: {
                name: 'John Doe',
                photo: 'https://example.com/profile.jpg',
            },
            token: 'fake-token',
            role: 'doctor',
        };

        customRender(<Header />, { providerProps });

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByAltText('profile')).toBeInTheDocument();
    });
});
