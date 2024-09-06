import { Cache, Storage } from 'cache2';

// 本地存储命名空间，建议改为项目名
const STORE_NAMESPACE = 'vite-template-doly';
export const sessionCache = new Cache(STORE_NAMESPACE, {
  storage: window.sessionStorage
});
export const localCache = new Cache(STORE_NAMESPACE, {
  storage: window.localStorage
});
export const memoryCache = new Cache(STORE_NAMESPACE);

export const session = new Storage(window.sessionStorage);
export const local = new Storage(window.localStorage);

// 登录信息
const LOGIN_INFO_KEY = 'loginInfo';
export const getLoginInfo = () => sessionCache.get(LOGIN_INFO_KEY) as API.Login['data'] | undefined;
export const setLoginInfo = (data: API.Login['data']) => {
  sessionCache.set(LOGIN_INFO_KEY, data);
};
export const removeLoginInfo = () => {
  sessionCache.del(LOGIN_INFO_KEY);
};
