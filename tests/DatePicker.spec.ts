import {test,expect} from "@playwright/test"

test('date picker',async({page})=>{

  await page.goto('https://demoqa.com/date-picker');
  await page.locator('#datePickerMonthYearInput').fill('2026-09-01');
  await expect(page.locator('#datePickerMonthYearInput')).toHaveValue('2026-09-01');
  console.log(`Entered date: ${await page.locator('#datePickerMonthYearInput').inputValue()}`);
  await page.waitForTimeout(5000);

});



