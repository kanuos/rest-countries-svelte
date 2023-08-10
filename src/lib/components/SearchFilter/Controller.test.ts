import { describe, it, expect, beforeEach } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/svelte";
import Controller from "./Controller.svelte";


beforeEach(() => {
    cleanup();
    render(Controller, { searchKeyword: "", selectedRegion: "", regions: ["Region 1", "Region 2", "Region 3", "Region 4"] })
})

describe(Controller.name, () => {
    const { getByRole, queryByRole } = screen;
    it("should render the header component", () => {
        const headerEl = getByRole("banner")

        expect(headerEl).not.toBeNull();
        expect(headerEl.tagName).toMatch(/header/i);
        expect(headerEl.classList.contains("min-h-[20vh]")).toBe(true);
        expect(headerEl.classList.contains("sm:min-h-[30vh]")).toBe(true);
    })
    it("should render the search box", () => {
        const inputEl = getByRole("textbox", { name: /country search box/i });
        expect(inputEl).not.toBeNull();
        expect(inputEl.tagName).toMatch(/input/i);
        expect(inputEl.getAttribute("placeholder")).toBe("Search for a country ...")
        expect(inputEl.getAttribute("type")).toBe("text");
        expect(inputEl.getAttribute("autocomplete")).toBe("off");
        expect(inputEl.getAttribute("maxlength")).toBe("20");
        expect(inputEl.classList.contains("font-semibold")).toBe(true);
    })
    it("should render the region selector", async () => {
        let regionTogglerBtn = getByRole("button", { name: 'region menu toggler' });
        expect(regionTogglerBtn).not.toBeNull();
        expect(regionTogglerBtn.textContent).toMatch(/filter by region/i)
        let regionMenu = queryByRole("list", { name: 'region menu' });
        expect(regionMenu).toBeNull()

        // click the toggler button
        await fireEvent.click(regionTogglerBtn)

        regionMenu = queryByRole("list", { name: 'region menu' });
        expect(regionMenu).not.toBeNull();
        expect(regionMenu?.tagName).toBe("UL");


        const regionItems = regionMenu?.querySelectorAll("button");

        if (!regionItems) return;
        // 4 menus - and 1 default menu
        expect(regionItems?.length).toBe(4 + 1);
        regionItems?.forEach((btn, i) => {
            if (i !== 0)
                expect(btn.textContent).toMatch(`Region ${i}`)
        })


        const randomIndex = Math.floor(Math.random() * regionItems.length)
        const randomRegion = [...regionItems][randomIndex];
        const randomRegionLabel = randomRegion.textContent?.trim();
        await fireEvent.click(randomRegion)

        let updatedBtn = queryByRole("button", { name: 'region menu toggler' });

        if (randomRegionLabel === "All regions") {
            expect(updatedBtn?.textContent).toBe(`Filter by Region`)
        }
        else {
            expect(updatedBtn?.textContent?.trim()).toBe(`Region : ${randomRegionLabel}`)
        }

    })
})