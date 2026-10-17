import { test, expect } from '@playwright/test'

test.describe('JavaScript dialogs', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  });

  // ---- Page load ----

  test('page loads with the JavaScript Alerts heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'JavaScript Alerts' })).toHaveText('JavaScript Alerts');
  });

  // ---- Alert ----

  test('accepts a JS alert', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
  });

  // ---- Confirm (OK / Cancel) ----

  test('accepts a JS confirm', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('I am a JS Confirm');
      await dialog.accept();       // OK
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

  test('dismisses a JS confirm', async ({ page }) => {
    page.once('dialog', async dialog => {
      await dialog.dismiss();      // Cancel
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
  });

  // ---- Prompt ----

  test('enters text in a JS prompt', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('I am a JS prompt');
      await dialog.accept('testuser');
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

    await expect(page.locator('#result')).toHaveText('You entered: testuser');
  });

  // ---- Waiting for a dialog explicitly ----

  test('waits for a dialog with waitForEvent', async ({ page }) => {
    const dialogPromise = page.waitForEvent('dialog');

    // Don't await the click on its own: the open dialog blocks it until it's accepted
    const clickPromise = page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    const dialog = await dialogPromise;

    expect(dialog.message()).toBe('I am a JS Confirm');
    await dialog.accept();

    await clickPromise;   // click can finish now that the dialog is handled

    await expect(page.locator('#result')).toHaveText('You clicked: Ok');
  });

});
