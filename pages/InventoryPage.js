class InventoryPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  
  async sortByPriceHighToLow() {
    await this.sortDropdown.selectOption('hilo');
  }

  
  async addItemToCart(itemName) {
    const item = this.page.locator('.inventory_item', { hasText: itemName });
    await item.locator('button').first().click();
  }

 
  async openCart() {
    await this.cartIcon.click();
  }
}

module.exports = { InventoryPage };