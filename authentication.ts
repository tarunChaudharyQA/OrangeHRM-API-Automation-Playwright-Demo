import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import * as fs from 'fs';

export const envDetails = [
  {
    env: 'dev',
    val: {
      baseUrl: '',
      username: ''
    }
  },
  {
    env: 'test',
    val: {
      baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',
      loginUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
      username: 'Admin'
    }
  }
];

export async function storeAuthCookie(password: string, environment: string) {
  const authParam = envDetails.filter(function (element) {
    return element.env == environment;
  });

  const authCookie = await generateAuthCookie(authParam[0].val.loginUrl, authParam[0].val.username, password);

  const auth = JSON.parse(fs.readFileSync('auth.json', 'utf-8'));
  auth.baseUrl = authParam[0].val.baseUrl;
  auth.cookie = authCookie;
  fs.writeFileSync('auth.json', JSON.stringify(auth, null, 2), 'utf-8');
}

export async function generateAuthCookie(loginUrl: string, username: string, password: string) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, withCredentials: true }));
  const form = (d: Record<string, string>) => new URLSearchParams(d).toString();

  //First POST to get CSRF token from HTML
  const firstResponse = await client.post(loginUrl, form({ username, password }));
  const token = String(firstResponse.data).match(/:token="&quot;([^"]+)&quot;"/)?.[1];

  //Second POST with _token
  await client.post(loginUrl, form({ username, password, _token: token || '' }));

  const cookies = await jar.getCookies(loginUrl);
  return cookies.find((c) => c.key === 'orangehrm')?.value || '';
}
