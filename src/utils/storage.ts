import { TLoginData } from '@/services/types/login';
import { Cache, Storage } from 'cache2';
import { name } from '../../package.json';

/**本地存储命名空间，建议使用项目名，可以区分同域下不同应用的缓存 */
export const STORE_NAMESPACE = name;

/** 浏览器存储，支持数据过期时间 */
/** session 存储，支持数据过期时间 */
export const sessionCache = new Cache(STORE_NAMESPACE, {
  storage: window.sessionStorage
});
/** 本地存储，支持数据过期时间 */
export const localCache = new Cache(STORE_NAMESPACE, {
  storage: window.localStorage
});
/** 内存存储，支持数据过期时间 */
export const memoryCache = new Cache(STORE_NAMESPACE);

/**浏览器存储 */
const prefix = `${STORE_NAMESPACE}_`;
/** session 存储 */
export const session = new Storage(window.sessionStorage, { prefix });
/** 本地存储 */
export const local = new Storage(window.localStorage, { prefix });
/** 内存存储 */
export const memory = new Storage(undefined, { prefix });

/**登录信息 */
const LOGIN_INFO_KEY = 'loginInfo';
/** 获取登录信息 */
export const getLoginInfo = () => sessionCache.get<TLoginData>(LOGIN_INFO_KEY);
/** 设置登录信息 */
export const setLoginInfo = (data: TLoginData) => {
  sessionCache.set(LOGIN_INFO_KEY, data);
};
/** 移除登录信息 */
export const removeLoginInfo = () => {
  sessionCache.del(LOGIN_INFO_KEY);
};
