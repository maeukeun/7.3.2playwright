const { test, expect } = require("@playwright/test");
const userData = require("../user.js")

test("Successful authorization", async ({ page }) => {

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill("input[type=password]", userData.password);
  await page.fill("input[type=email]", userData.email);
  await page.click("button[data-testid='login-submit-btn']")
  await expect(page.locator("h2")).toHaveText("Моё обучение");
});

test("Unsuccessful authorization", async ({ page }) => {

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill("input[type=password]", "1234567890");
  await page.fill("input[type=email]", "notexist@user.io");
  await page.click("button[data-testid='login-submit-btn']")
  await expect(page.locator("div[data-testid='login-error-hint']")).toHaveText("Вы ввели неправильно логин или пароль");
});
