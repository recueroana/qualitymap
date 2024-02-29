// @ts-check
const { test, expect } = require('@playwright/test');
const { LOGIN_URL } = require('./config');


test('Fazer um registro com sucesso', async ({ page }) => {
  await page.goto(LOGIN_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("nopCommerce demo store");

  //Acessar registro
  const registerLink = await page.getByRole('link', { name: 'Register' });
  await registerLink.click();
  await expect(page).toHaveTitle("nopCommerce demo store. Register");

  //Preencher dados do registro
  await page.getByLabel('Male', { exact: true }).check();
  await page.getByLabel('First name:').click();
  await page.getByLabel('First name:').fill('João');
  await page.getByLabel('Last name:').click();
  await page.getByLabel('Last name:').fill('Silva2');
  await page.locator('select[name="DateOfBirthDay"]').selectOption('13');
  await page.locator('select[name="DateOfBirthMonth"]').selectOption('9');
  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('cadastro3@cadast.com');
  await page.getByLabel('Company name:').click();
  await page.getByLabel('Company name:').fill('company');
  await page.getByLabel('Password:', { exact: true }).click();
  await page.getByLabel('Password:', { exact: true }).fill('123456');
  await page.getByLabel('Confirm password:').click();
  await page.getByLabel('Confirm password:').fill('123456');
  await page.getByRole('button', { name: 'Register' }).click(); 
  
 
});

test('Validar mensagem de erro quando first name esta em branco', async ({ page }) => {
  await page.goto(LOGIN_URL);

  //Acessar registro
  const registerLink = await page.getByRole('link', { name: 'Register' });
  await registerLink.click();
  await expect(page).toHaveTitle("nopCommerce demo store. Register");
   
 //Campo first name em branco
 await page.getByLabel('First name:').click();
 await page.getByLabel('First name:').fill('');
 await page.getByRole('button', { name: 'Register' }).click();

 const errorMessage = await page.$eval('#FirstName-error', (element) => element.textContent);
    expect(errorMessage).toBe('First name is required.');
});

test('Validar mensagem de erro quando Last Name esta em branco', async ({ page }) => {
  await page.goto(LOGIN_URL);

  //Acessar registro
  const registerLink = await page.getByRole('link', { name: 'Register' });
  await registerLink.click();
  await expect(page).toHaveTitle("nopCommerce demo store. Register");

  await page.getByLabel('Male', { exact: true }).check();
  await page.getByLabel('First name:').click();
  await page.getByLabel('First name:').fill('José');

  await page.getByLabel('Last name:').click();
  await page.getByLabel('Last name:').fill('');
  await page.getByRole('button', { name: 'Register' }).click();

  const errorMessage = await page.$eval('#LastName-error', (element) => element.textContent);
  expect(errorMessage).toBe('Last name is required.');

});

test('Validar mensagem de erro quando Email esta em branco', async ({ page }) => {
  await page.goto(LOGIN_URL);

  //Acessar registro
  const registerLink = await page.getByRole('link', { name: 'Register' });
  await registerLink.click();
  await expect(page).toHaveTitle("nopCommerce demo store. Register");

  await page.getByLabel('Male', { exact: true }).check();
  await page.getByLabel('First name:').click();
  await page.getByLabel('First name:').fill('José');

  await page.getByLabel('Last name:').click();
  await page.getByLabel('Last name:').fill('Maria');

  await page.locator('select[name="DateOfBirthDay"]').selectOption('13');
  await page.locator('select[name="DateOfBirthMonth"]').selectOption('9');

  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('');
  await page.getByRole('button', { name: 'Register' }).click();

  const errorMessage = await page.$eval('#Email-error', (element) => element.textContent);
  expect(errorMessage).toBe('Email is required.');

});

test('Validar mensagem de erro quando senha esta em branco', async ({ page }) => {
  await page.goto(LOGIN_URL);

  //Acessar registro
  const registerLink = await page.getByRole('link', { name: 'Register' });
  await registerLink.click();
  await expect(page).toHaveTitle("nopCommerce demo store. Register");

  await page.getByLabel('Male', { exact: true }).check();
  await page.getByLabel('First name:').click();
  await page.getByLabel('First name:').fill('José');

  await page.getByLabel('Last name:').click();
  await page.getByLabel('Last name:').fill('Maria');

  await page.locator('select[name="DateOfBirthDay"]').selectOption('13');
  await page.locator('select[name="DateOfBirthMonth"]').selectOption('9');

  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('tes@c.com');

  await page.getByLabel('Password:', { exact: true }).click();
  await page.getByLabel('Password:', { exact: true }).fill('');
  await page.getByRole('button', { name: 'Register' }).click();

  const errorMessage = await page.$eval('#Password-error', (element) => element.textContent);
  expect(errorMessage).toBe('Password is required.');

});

test('Validar mensagem de erro quando confirmação de senha esta em branco', async ({ page }) => {
  await page.goto(LOGIN_URL);

  //Acessar registro
  const registerLink = await page.getByRole('link', { name: 'Register' });
  await registerLink.click();
  await expect(page).toHaveTitle("nopCommerce demo store. Register");

  await page.getByLabel('Male', { exact: true }).check();
  await page.getByLabel('First name:').click();
  await page.getByLabel('First name:').fill('José');

  await page.getByLabel('Last name:').click();
  await page.getByLabel('Last name:').fill('Maria');

  await page.locator('select[name="DateOfBirthDay"]').selectOption('13');
  await page.locator('select[name="DateOfBirthMonth"]').selectOption('9');

  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('tes@c.com');

  await page.getByLabel('Password:', { exact: true }).click();
  await page.getByLabel('Password:', { exact: true }).fill('123456');

  await page.getByLabel('Confirm password:').click();
  await page.getByLabel('Confirm password:').fill('');
  await page.getByRole('button', { name: 'Register' }).click();

  const errorMessage = await page.$eval('#ConfirmPassword-error', (element) => element.textContent);
  expect(errorMessage).toBe('Password is required.');

});

test('Validar mensagem de erro quando senha tem menos de 6 caracteres', async ({ page }) => {
  await page.goto(LOGIN_URL);

  //Acessar registro
  const registerLink = await page.getByRole('link', { name: 'Register' });
  await registerLink.click();
  await expect(page).toHaveTitle("nopCommerce demo store. Register");

  await page.getByLabel('Male', { exact: true }).check();
  await page.getByLabel('First name:').click();
  await page.getByLabel('First name:').fill('José');

  await page.getByLabel('Last name:').click();
  await page.getByLabel('Last name:').fill('Maria');

  await page.locator('select[name="DateOfBirthDay"]').selectOption('13');
  await page.locator('select[name="DateOfBirthMonth"]').selectOption('9');

  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('test@c.com');

  await page.getByLabel('Password:', { exact: true }).click();
  await page.getByLabel('Password:', { exact: true }).fill('1234');
  await page.getByRole('button', { name: 'Register' }).click();

  const errorMessage = await page.$eval('#Password-error', (element) => element.textContent);
  expect(errorMessage).toBe('Password must meet the following rules: must have at least 6 characters');

});

test('Validar mensagem de erro quando confirmação de senha não é igual a senha', async ({ page }) => {
  await page.goto(LOGIN_URL);

  //Acessar registro
  const registerLink = await page.getByRole('link', { name: 'Register' });
  await registerLink.click();
  await expect(page).toHaveTitle("nopCommerce demo store. Register");

  await page.getByLabel('Male', { exact: true }).check();
  await page.getByLabel('First name:').click();
  await page.getByLabel('First name:').fill('José');

  await page.getByLabel('Last name:').click();
  await page.getByLabel('Last name:').fill('Maria');

  await page.locator('select[name="DateOfBirthDay"]').selectOption('13');
  await page.locator('select[name="DateOfBirthMonth"]').selectOption('9');

  await page.getByLabel('Email:').click();
  await page.getByLabel('Email:').fill('tes@c.com');

  await page.getByLabel('Password:', { exact: true }).click();
  await page.getByLabel('Password:', { exact: true }).fill('123456');

  await page.getByLabel('Confirm password:').click();
  await page.getByLabel('Confirm password:').fill('123546');
  await page.getByRole('button', { name: 'Register' }).click();

  const errorMessage = await page.$eval('#ConfirmPassword-error', (element) => element.textContent);
  expect(errorMessage).toBe('The password and confirmation password do not match.');

});