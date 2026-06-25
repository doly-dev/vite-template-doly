/**是否添加水印标记 0-不添加;1-添加*/
export enum EWaterFlag {
  No,
  Yes
}

/**颜色 red-红;green-绿;blue-蓝*/
export enum EColor {
  Red = 'red',
  Green = 'green',
  Blue = 'blue'
}

// --- 替代枚举 ---
// 使用常量+联合类型替代枚举，避免 enum 编译后生成冗余的 JavaScript 对象。
// type Union<T> = T[keyof T];

// /**颜色 red-红;green-绿;blue-蓝*/
// export const WaterFlag = {
//   No: 0,
//   Yes: 1
// } as const;

// export type WaterFlag_Type = Union<typeof WaterFlag>;
