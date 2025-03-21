import './index.less';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router';
// import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
// reportWebVitals(console.log);
