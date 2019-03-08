import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

/**
 * 注册用户
 * @param {any} params
 */
export async function register(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

/**
 * 用户登录
 * @param {any} params
 */
export async function logout() {
  return request('/api/logout', {
    method: 'POST'
  });
}

/**
 * 用户登录
 * @param {any} params
 */
export async function login(params) {
  return request('/api/login', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取验证码
 * @param {any} mobile
 */
export async function getCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
