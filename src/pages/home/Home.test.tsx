import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { HashRouter as Router, Route, Routes } from 'react-router';
import Home from './Home';

test('renders correctly', async () => {
  const result = render(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
  expect(result.container).toMatchSnapshot();

  const loginBtn = result.getByText('点击登录');

  await userEvent.click(loginBtn);
  expect(loginBtn).toMatchSnapshot();
});
