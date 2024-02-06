import { test, expect } from "@playwright/test";

test("Assignment 1A", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/auth?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
  );
  await page.getByText("Sign Up").click();
  await page.getByPlaceholder("name").click();
  await page.getByPlaceholder("name").fill("testy@testy.nl");
  await page.getByPlaceholder("name").press("Tab"); // This is not strictly needed, but is generated by the recorder
  await page.getByPlaceholder("email@gmail.com").fill("test@testy.nl");
  await page.getByPlaceholder("email@gmail.com").press("Tab"); // This is not strictly needed, but is generated by the recorder
  await page.getByPlaceholder("********").fill("test");
  await page.getByLabel("Sign Up").click();
  await page.getByPlaceholder("email@gmail.com").click(); // This is not strictly needed, but is generated by the recorder
  await page.getByPlaceholder("email@gmail.com").fill("test@testy.nl");
  await page.getByPlaceholder("email@gmail.com").press("Tab"); // This is not strictly needed, but is generated by the recorder
  await page.getByPlaceholder("********").fill("test");
  await page.getByTestId("auth-page").getByLabel("Sign In").click();
  await expect(page.getByRole("paragraph")).toContainText("No Todos found.");
});

test("Assignment 1B", async ({ page }) => {
  await page.goto(
    "http://localhost:3000/auth?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
  );
  await page.getByText("Sign Up").click();
  await page.getByPlaceholder("name").click();
  await page.getByPlaceholder("name").fill("testy@testy.nl");
  await page.getByPlaceholder("name").press("Tab"); // This is not strictly needed, but is generated by the recorder
  await page.getByPlaceholder("email@gmail.com").fill("test@testy.nl");
  await page.getByPlaceholder("email@gmail.com").press("Tab"); // This is not strictly needed, but is generated by the recorder
  await page.getByPlaceholder("********").fill("test");
  await page.getByLabel("Sign Up").click();
  await page.getByPlaceholder("email@gmail.com").click(); // This is not strictly needed, but is generated by the recorder
  await page.getByPlaceholder("email@gmail.com").fill("test@testy.nl");
  await page.getByPlaceholder("email@gmail.com").press("Tab"); // This is not strictly needed, but is generated by the recorder
  await page.getByPlaceholder("********").fill("test");
  await page.getByTestId("auth-page").getByLabel("Sign In").click();
  await expect(page.getByRole("paragraph")).toContainText("No Todos found.");
});
