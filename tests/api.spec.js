const { test, expect } = require('@playwright/test');

test.describe.serial('API-тесты для Restful-booker', { tag: '@api' }, () => {  
  const baseURL = 'https://restful-booker.herokuapp.com';
  
  
  let bookingId;
  let authToken;
  
  
  test('1. Создание бронирования', async ({ request }) => {
    const bookingData = {
      firstname: 'Yana',
      lastname: 'Test',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-01-01',
        checkout: '2026-01-05'
      },
      additionalneeds: 'Breakfast'
    };

    
    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData
    });

    
    expect(response.status()).toBe(200);

    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('bookingid');
    bookingId = responseBody.bookingid; 
    console.log('Создан bookingId:', bookingId);

    
    expect(responseBody.booking.firstname).toBe(bookingData.firstname);
    expect(responseBody.booking.lastname).toBe(bookingData.lastname);
    expect(responseBody.booking.totalprice).toBe(bookingData.totalprice);
    expect(responseBody.booking.depositpaid).toBe(bookingData.depositpaid);
    expect(responseBody.booking.additionalneeds).toBe(bookingData.additionalneeds);
  });

  
  test('2. Получение информации о бронировании', async ({ request }) => {
    
    const response = await request.get(`${baseURL}/booking/${bookingId}`);

    
    expect(response.status()).toBe(200);

    
    const responseBody = await response.json();
    expect(responseBody.firstname).toBe('Yana');
    expect(responseBody.lastname).toBe('Test');
    expect(responseBody.totalprice).toBe(150);
    expect(responseBody.depositpaid).toBe(true);
    expect(responseBody.additionalneeds).toBe('Breakfast');
  });

  
  test('3. Обновление бронирования', async ({ request }) => {
    
    const authResponse = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });
    
    expect(authResponse.status()).toBe(200);
    const authBody = await authResponse.json();
    authToken = authBody.token;
    console.log('Получен токен:', authToken);

    
    const updatedData = {
      firstname: 'Yana',
      lastname: 'Updated',
      totalprice: 200,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-01-01',
        checkout: '2026-01-05'
      },
      additionalneeds: 'Breakfast'
    };

    
    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      data: updatedData,
      headers: {
        'Cookie': `token=${authToken}`
      }
    });

    
    expect(response.status()).toBe(200);

    
    const responseBody = await response.json();
    expect(responseBody.lastname).toBe('Updated');
    expect(responseBody.totalprice).toBe(200);
  });

  
  test('4. Удаление бронирования', async ({ request }) => {
    
    const response = await request.delete(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Cookie': `token=${authToken}`
      }
    });

    
    expect(response.status()).toBe(201);

    
    const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });
});