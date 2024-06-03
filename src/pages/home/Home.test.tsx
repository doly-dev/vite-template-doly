import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Home from './Home.jsx';

test('renders correctly', async () => {
  const result = render(<Home />);
  expect(result.container).toMatchSnapshot();

  const loginBtn = result.getByText('点击登录');

  await userEvent.click(loginBtn);
  expect(loginBtn).toMatchSnapshot();
});
