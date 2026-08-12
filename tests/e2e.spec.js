const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutStepOnePage } = require('../pages/CheckoutStepOnePage');
const { CheckoutStepTwoPage } = require('../pages/CheckoutStepTwoPage');
const { CheckoutCompletePage } = require('../pages/CheckoutCompletePage');

test.describe('E2E: полный цикл покупки', () => {

  test('Покупка самого дорогого товара', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.open();

    
    await loginPage.login('standard_user', 'secret_sauce');

    
    const inventoryPage = new InventoryPage(page);
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');

    
    await inventoryPage.sortByPriceHighToLow();

    
    const firstItem = page.locator('.inventory_item').first();
    const expensiveItemName = await firstItem.locator('.inventory_item_name').textContent();

    
    await inventoryPage.addItemToCart(expensiveItemName);

    
    await inventoryPage.openCart();

    
    const cartPage = new CartPage(page);
    const cartItemName = await cartPage.getItemName();
    expect(cartItemName).toBe(expensiveItemName);

    
    await cartPage.goToCheckout();

    
    const stepOne = new CheckoutStepOnePage(page);
    await stepOne.fillUserInfo('Test', 'User', '12345');

    

    
    const stepTwo = new CheckoutStepTwoPage(page);
    await stepTwo.finishCheckout();

    
    const completePage = new CheckoutCompletePage(page);
    const message = await completePage.getCompletionMessage();
    expect(message).toContain('Thank you for your order!');
  });
});