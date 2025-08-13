import asyncio
import os
from playwright.async_api import async_playwright, expect

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path to the HTML file
        file_path = os.path.abspath('index.html')
        await page.goto(f"file://{file_path}")

        # Scroll to the carousel section
        carousel_section = page.locator("#trabajos")
        await carousel_section.scroll_into_view_if_needed()
        await page.wait_for_timeout(500)

        # Target the first *visible* slide
        first_visible_slide = page.locator(".slick-slide.slick-active").first

        # Hover over the first visible slide to show the zoom icon
        await first_visible_slide.hover()
        await page.screenshot(path="jules-scratch/verification/01_zoom_icon.png")
        print("Took screenshot of zoom icon on hover.")

        # Click the LINK inside the first visible slide to open the lightbox
        await first_visible_slide.locator('a').click()

        # Wait for the lightbox to appear
        lightbox = page.locator("#lg-backdrop")
        await expect(lightbox).to_be_visible()
        await page.wait_for_timeout(1000) # Wait for animation

        await page.screenshot(path="jules-scratch/verification/02_lightbox_open.png")
        print("Took screenshot of the open lightbox.")

        await browser.close()
        print("Lightbox verification script completed successfully.")

if __name__ == "__main__":
    asyncio.run(main())
