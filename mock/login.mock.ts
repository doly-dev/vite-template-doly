import { defineMock } from 'vite-plugin-mock-dev-server';
import { mockData } from './utils';

export default defineMock([
  {
    url: '/api/login',
    response: mockData({
      data: {
        username: '@cname',
        mobile: '@mobile',
        token: '@guid'
      }
    }),
    method: 'POST'
  }
]);
