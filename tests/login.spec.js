// Импортируем 'test' и 'expect' из библиотеки Playwright
const { test, expect } = require('@playwright/test');

// Описываем наш набор тестов
test.describe('Авторизация на Sauce Demo', { tag: '@ui' }, () => {

  // Создаем тест-кейс
  test('Пользователь должен успешно войти в систему', async ({ page }) => {
    // 1. Переходим на страницу
    await page.goto('https://www.saucedemo.com/');

    // 2. Вводим логин
    await page.locator('#user-name').fill('standard_user');

    // 3. Вводим пароль
    await page.locator('[placeholder="Password"]').fill('secret_sauce');

    // 4. Нажимаем кнопку входа
    await page.locator('[data-test="login-button"]').click();

    // 5. Проверяем, что URL изменился и содержит нужную часть
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  // Дополнительное задание: неуспешный вход
  test('Заблокированный пользователь не должен войти в систему', async ({ page }) => {
    // 1. Переходим на страницу
    await page.goto('https://www.saucedemo.com/');

    // 2. Вводим логин заблокированного пользователя
    await page.locator('#user-name').fill('locked_out_user');

    // 3. Вводим пароль
    await page.locator('[placeholder="Password"]').fill('secret_sauce');

    // 4. Нажимаем кнопку входа
    await page.locator('[data-test="login-button"]').click();

    // 5. Проверяем сообщение об ошибке
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});