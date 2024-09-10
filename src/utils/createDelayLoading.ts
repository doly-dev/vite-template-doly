// import { Toast } from 'antd-mobile';
// import { delay } from 'ut2';

// function createDelayLoading() {
//   let toastHandler: undefined | ReturnType<typeof Toast.show>;
//   let timer: any = null;

//   function show() {
//     timer = delay(() => {
//       toastHandler = Toast.show({
//         icon: 'loading',
//         content: '加载中…',
//         duration: 0
//       });
//     }, 200);
//   }

//   function close() {
//     clearTimeout(timer);
//     toastHandler?.close();
//   }

//   return {
//     show,
//     close
//   };
// }

// export default createDelayLoading;
