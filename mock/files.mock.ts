import { createReadStream } from 'node:fs';
import mockUtil from './utils';
import { defineMock } from 'vite-plugin-mock-dev-server';

export default defineMock([
  {
    url: '/api/files/upload',
    response: mockUtil.mockData({
      data: '@guid'
    }),
    type: '120x120.jpg',
    method: 'POST'
  },
  {
    url: '/api/files/download',
    response(req, res) {
      res.setHeader('Access-Control-Expose-Headers', '*');
      res.setHeader('Content-Type', 'image/jpeg');
      res.setHeader('Content-Disposition', 'attachment;filename=120x120.jpg');
    },
    headers: {
      'Access-Control-Expose-Headers': '*',
      // 'Content-Type': 'image/jpeg',
      'Content-Disposition': 'attachment;filename=120x120.jpg'
    },
    body: () => createReadStream(`${__dirname}/assets/120x120.jpg`),
    type: '120x120.jpg',
    method: 'POST'
  }
]);
