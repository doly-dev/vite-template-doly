import { useState } from 'react';
import { useAsync } from 'rc-hooks';
import router from '@/router';
import PageContainer from '@/components/PageContainer';
import { login } from '@/services/login';
import { getLoginInfo, setLoginInfo, removeLoginInfo } from '@/utils/storage';
import reactLogo from '@/assets/react.svg';
import styles from './Home.module.less';

const pages = [
  {
    name: '列表页',
    link: '/repos/list'
  },
  {
    name: '不存在的页面',
    link: '/abc'
  }
];

const Home = () => {
  const [logined, setLogined] = useState(() => !!getLoginInfo()?.token);
  const { loading, run } = useAsync(
    () => login({ username: 'test', password: '12345' }).then((res) => res.data),
    {
      autoRun: false,
      onSuccess: (res) => {
        setLoginInfo(res);
        setLogined(true);
      }
    }
  );

  const toggleLogin = () => {
    if (logined) {
      removeLoginInfo();
      setLogined(false);
    } else {
      run();
    }
  };

  return (
    <PageContainer>
      <div className={styles.wrapper}>
        <h1>vite-template-doly</h1>
        <p>欢迎使用！</p>
        <mark>
          注意：请根据业务修改 <strong>public</strong> 目录下的文件和内容。
        </mark>
        <p>路由在 src/router.tsx 中配置</p>
        <h3>示例页面</h3>
        <ul>
          {pages.map((item) => (
            <li key={item.name}>
              {/* <Link to={item.link}>{item.name}</Link> */}
              {/* 这里是为了演示 router 用法，建议使用 Link */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.navigate(item.link);
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <h3>mock 示例</h3>
        <p>点击按钮调用 /api/login 接口</p>
        <button disabled={loading} onClick={toggleLogin}>
          {logined ? '已登录，点击退出登录' : loading ? '登录中' : '点击登录'}
        </button>
        <h3>图片资源</h3>
        <p>
          引入 public 目录文件，该目录用于存放第三方库、字体、图片等不需要构建的资源。如 logo ：
        </p>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="doly logo" />
        <p>引入项目中 src/assets 目录文件。如 示例图片：</p>
        <img src={reactLogo} alt="react logo" />
      </div>
    </PageContainer>
  );
};

export default Home;
