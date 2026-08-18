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
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.open();
  
    await loginPage.login('standard_user', 'secret_sauce');
    
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');
    
    await inventoryPage.sortByPriceHighToLow();
    const expensiveItemName = await inventoryPage.getFirstItemName();
    await inventoryPage.addItemToCart(expensiveItemName);
    
    await inventoryPage.openCart();
   
    const cartItemName = await cartPage.getItemName();
    expect(cartItemName).toBe(expensiveItemName);
    
    await cartPage.goToCheckout();
    
    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    
    await checkoutStepTwoPage.finishCheckout();
    
    const message = await checkoutCompletePage.getCompletionMessage();
    expect(message).toContain('Thank you for your order!');
  });
});