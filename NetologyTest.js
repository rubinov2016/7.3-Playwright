const { chromium } = require("playwright");
//1.Подготовьте тестовые данные:
const userFile = require('./user');
let userName = userFile.userName;
let passwordName = userFile.passwordName;

//2. Создайте Тест 1. Успешная авторизация.
//3. Проверьте ожидаемый результат. Проверьте что открылась страница профиля
(async () => {
  const browser = await chromium.launch({
//    headless: false,
//    slowMo: 5000,
//    devtools: true
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");

  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', userName);
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', passwordName);
  await page.click('button:has-text("Войти")');

  //assertion
  const check = await page.waitForSelector("text=Мои курсы и профессии");
  await browser.close();
})();

//4. Создайте Тест 2. Неуспешная авторизация
//5. Проверьте результат. Появился блок с текстом - Вы ввели неправильно логин или пароль
(async () => {
  const browser = await chromium.launch({
//    headless: false,
 //   slowMo: 5000,
  //  devtools: true
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  
  const userNameDummy = "test" + userName;
  // Fill [placeholder="Email"]
  await page.fill('[placeholder="Email"]', userNameDummy);
  // Fill [placeholder="Пароль"]
  await page.fill('[placeholder="Пароль"]', passwordName);
  await page.click('button:has-text("Войти")');

  //assertion
  const check = await page.waitForSelector("text=Вы ввели неправильно логин или пароль");
  await browser.close();
})();