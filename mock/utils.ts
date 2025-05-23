import { MockUtilClass } from 'mockjs-extend';
import { MockRequest, MockHttpItem } from 'vite-plugin-mock-dev-server';

type MockHttpItemResponse = NonNullable<MockHttpItem['response']>;
type MockResponse = Parameters<MockHttpItemResponse>[1];

const mockUtil = new MockUtilClass<MockRequest, MockResponse>({
  // 模拟请求延迟时间
  delay: 500,
  // 响应数据发送方法
  sendMethod: 'end',
  // 响应基本数据结构
  responseBasic: {
    errCode: '0000', // 响应码 0000-成功
    errMsg: 'mock success' // 响应信息
  },
  // 响应分页数据结构
  responsePage(pageData) {
    return {
      data: {
        'pageData|10': [pageData], // 对象列表
        curPage: 1, //  页码
        pageSize: 10, //  每页记录数
        'total|11-150': 20 //  总记录数
      }
    };
  }
});

export default mockUtil;
