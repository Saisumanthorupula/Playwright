import {test,expect} from '@playwright/test'

test('Locators', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await expect(page.getByText('Swag Labs')).toHaveText('Swag Labs');
  await page.waitForTimeout(4000);
  console.log("User lands on the swag labs application");

  //1.By ID
  await page.locator('#user-name').fill('standard_user');
  await page.waitForTimeout(2000);

  await page.locator('#password').fill('secret_sauce');
  await page.waitForTimeout(2000);

  //2.By name attribute (It should use in square braces)
  await page.locator('[name="login-button"]').click();
  await page.waitForTimeout(2000);
  
  await expect(page.getByText('Products')).toHaveText('Products');
  await page.waitForTimeout(2000);
 
  // 3. By Class
  await page.locator('.inventory_item').first().isVisible();
  await page.waitForTimeout(2000);

  // 4. By CSS Selector
  await page.locator('.inventory_item_name').first().click();
  await page.waitForTimeout(2000);
    
  // 5. By XPath
  await page.locator('//button[@id="add-to-cart"]').click();
  await page.waitForTimeout(2000);

});