import { sleep } from 'ut2';
import { Mockjs } from 'mockjs-extend';
import { MockHttpItem } from 'vite-plugin-mock-dev-server';

// 模拟接口延迟时间
const DELAY_TIME = 100;

// 响应数据基础结构
const ResponseBasicConstructor = {
  errCode: '0000', // 响应码 0000-成功
  errMsg: 'mock success' // 响应信息
};

// 参数类型
type MockHttpItemResponse = NonNullable<MockHttpItem['response']>;
type MockHttpItemResponseParams = Parameters<MockHttpItemResponse>;
type MockDataType = Record<string, any> | undefined | void;
type MockFuncType<T = any> = (
  req: MockHttpItemResponseParams[0],
  res: MockHttpItemResponseParams[1]
) => T | Promise<T>;
type MockDataParam = MockDataType | MockFuncType<MockDataType>;

// 模拟数据
export const mockData = (data: MockDataParam = {}) => {
  const fn: MockFuncType = async (req, res) => {
    await sleep(DELAY_TIME);

    let realData = data;
    if (typeof data === 'function') {
      realData = await data(req, res);
    }
    const result = Mockjs.mock({
      ...ResponseBasicConstructor,
      ...Object(realData)
    });
    res.end(JSON.stringify(result));
  };
  return fn;
};

// 模拟分页数据
export const mockPageData = <T extends object>(pageData: T) => {
  return mockData({
    data: {
      'pageData|10': [pageData], // 对象列表
      curPage: 1, //  页码
      pageSize: 10, //  每页记录数
      'total|11-150': 20 //  总记录数
    }
  });
};
