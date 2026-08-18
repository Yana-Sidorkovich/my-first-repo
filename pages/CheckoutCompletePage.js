class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }
  
  getCompletionMessage() {
    return this.completeHeader.textContent();
  }
}

module.exports = { CheckoutCompletePage };