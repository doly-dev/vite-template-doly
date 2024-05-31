import { defineMock } from 'vite-plugin-mock-dev-server';
import { mockData } from './utils';

const data = [
  {
    name: 'util-helpers',
    full_name: 'doly-dev/util-helpers',
    html_url: 'https://github.com/doly-dev/util-helpers',
    description: '一个基于业务场景的工具方法库'
  },
  {
    name: 'rc-hooks',
    full_name: 'doly-dev/rc-hooks',
    html_url: 'https://github.com/doly-dev/rc-hooks',
    description: 'React Hooks Library.'
  }
];

export default defineMock([
  {
    url: '/users/doly-dev/repos',
    response: mockData({
      data
    }),
    method: 'GET'
  },
  {
    url: '/repos/doly-dev/:repoName',
    response: mockData((req) => {
      const { repoName } = req.params;
      return {
        data: data.find((item) => item.name === repoName)
      };
    }),
    method: 'GET'
  }
]);
