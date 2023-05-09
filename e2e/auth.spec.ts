import { test, expect } from '@playwright/test';

test('succesful login and logout', async ({ page }) => {
	await page.goto('/login');

	// Fill in login form
	await page.fill('input[name="email"]', 'test@example.com');
	await page.fill('input[name="password"]', 'secret');
	await page.click('#submit');

	// Wait for redirect to complete
	await page.waitForNavigation({ waitUntil: 'networkidle' });

	// Wait for the dashboard page to load
	await page.waitForSelector('#logo');

	// Assert that the h1 tag contains the expected text
	const logoTextContent = await page.$eval('#logo', (logo) => logo.textContent);
	expect(logoTextContent).toContain('Research');

	await page.click('#logout');

	// Wait for redirect to complete
	await page.waitForNavigation({ waitUntil: 'networkidle' });

	// Wait for the dashboard page to load
	await page.waitForSelector('h2');

	// Assert that the h2 tag contains the expected text
	const h2TextContent = await page.$eval('h2', (h2) => h2.textContent);
	expect(h2TextContent).toContain('Welcome');
});
