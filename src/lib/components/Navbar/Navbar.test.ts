import { describe, it, expect, beforeEach } from "vitest";
import { render, cleanup, screen } from "@testing-library/svelte"

import Navbar from "./Navbar.svelte";

beforeEach(() => {
    cleanup();
    render(Navbar);
});

describe(Navbar.name, () => {
    const { getByRole, getByLabelText } = screen;
    it("should render the Nav component", () => {
        const navEl = getByRole("navigation");
        expect(navEl).not.toBeNull();
        expect(navEl.tagName).toEqual("NAV")
        expect(navEl.classList.contains("bg-dark-text")).toBe(true)
        expect(navEl.classList.contains("dark:bg-dark-el")).toBe(true)
    })
    it("should render the strong text logo", () => {
        const logoEl = getByLabelText("site-logo");
        expect(logoEl).not.toBeNull();
        expect(logoEl.tagName).toBe("STRONG");
        expect(logoEl.textContent).toMatch(/where in the world/i);
    })
    describe("theme-toggler button", () => {

        it("should render the theme status", () => {
            const btnEl = getByRole("button", { name: 'theme-toggler' });
            expect(btnEl).not.toBeNull();
            expect(btnEl.tagName).toBe("BUTTON");
            expect(btnEl.classList.contains("opacity-50")).toBe(true)
            expect(btnEl.classList.contains("hover:opacity-100")).toBe(true)

            expect(btnEl.textContent?.toString()).toMatch(/(Light Mode|Dark Mode)/)

        })

    })
})