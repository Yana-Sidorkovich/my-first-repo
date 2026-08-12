class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  
  async getItemName() {
    return await this.cartItems.locator('.inventory_item_name').first().textContent();
  }

    async goToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };