import {test,expect} from '@playwright/test'

test('File Downloads', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  
  await expect(page.getByRole('heading',{name:'File Downloader'})).toHaveText('File Downloader');
  await page.waitForTimeout(4000);
  console.log("User lands on the File Downloader application");

});



test('File Downloads1', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');

  
  await expect(page.getByRole('heading',{name:'File Downloader'})).toHaveText('File Downloader');
  await page.waitForTimeout(4000);
  console.log("User lands on the File Downloader application");

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link',{name:'test1.txt'}).click();
  const download = await downloadPromise;
  await page.waitForTimeout(4000);
  const filename = await download.suggestedFilename(); //returns the filename suggested by the browser or server for a downloaded file.

  console.log(filename);
  
  
   expect(filename).toBe('test1.txt');

   // Or save
   await download.saveAs(`downloads/${filename}`);


});
