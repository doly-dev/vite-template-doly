import { defineMock } from 'vite-plugin-mock-dev-server';
import mockUtil from './utils';

export default defineMock([
  {
    url: '/api/login',
    response: mockUtil.mockData({
      data: {
        username: '@cname',
        mobile: '@mobile',
        token: '@guid'
      }
    }),
    method: 'POST'
  }
]);
