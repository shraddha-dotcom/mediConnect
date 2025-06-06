import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

const customRender = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Footer component', () => {
    beforeEach(() => {
        customRender(<Footer />);
    });

    it('renders the logo', () => {
        expect(screen.getByTestId('footer-logo')).toBeInTheDocument();
    });

    it('renders copyright text', () => {
        expect(screen.getByTestId('footer-copy')).toHaveTextContent(/Developed by Shraddha/i);
    });

    it('renders all social links', () => {
        const socialIcons = screen.getByTestId('social-links').querySelectorAll('a');
        expect(socialIcons.length).toBe(4); // You have 4 social links
    });

    it('renders all quick links', () => {
        const quickLinks = screen.getAllByTestId(/quick-link-/);
        expect(quickLinks.length).toBe(4); // You have 4 quick links
    });

    it('renders all support links', () => {
        const supportLinks = screen.getAllByTestId(/support-link-/);
        expect(supportLinks.length).toBe(2); // You have 2 support links
    });
});
