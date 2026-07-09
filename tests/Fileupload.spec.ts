import {test,expect} from '@playwright/test'

test('File uploads', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');

  
  await expect(page.getByRole('heading',{name:'File Uploader'})).toHaveText('File Uploader');
  await page.waitForTimeout(4000);
  console.log("User lands on the application");

});

test('File uploads1', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/upload');

  
  await expect(page.getByRole('heading',{name:'File Uploader'})).toHaveText('File Uploader');
  await page.waitForTimeout(4000);
  console.log("User lands on the application");

  await page.locator('#file-upload').setInputFiles("Uploads/test1.txt");
  console.log("File is successfully uploaded")
  await page.waitForTimeout(3000);

  await page.locator('#file-submit').click();
  console.log("Clicked upload button");
  await page.waitForTimeout(3000);

  await expect(page.getByRole('heading', {name:'File Uploaded!'})).toHaveText('File Uploaded!');
});

