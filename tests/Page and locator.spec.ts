import {test,expect} from '@playwright/test'

test('page and locator', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  await expect(page.getByRole('heading',{name:'Test login'})).toHaveText('Test login');
  console.log("User lands on the application");

  // Using locators (recommended approach)
  const username = page.locator('#username');
  await username.fill('student');
  await page.waitForTimeout(1000);

  const password = page.locator('#password');
  await password.fill('Password123');
  await page.waitForTimeout(1000);

  // Using locator.click() (modern, recommended)
  const submitButton = page.locator('#submit');
  await submitButton.click();

  // Alternative approach using page.click() (older method)
  // await page.click('#submit');
  await page.waitForTimeout(2000);

  await expect(page.getByText('Logged In Successfully')).toHaveText('Logged In Successfully');
  console.log('User logged in successfully');
  
  
});
