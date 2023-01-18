import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  // let component

  let mockHandler = jest.fn();
  beforeEach(() => {
    const testBlog = {
      title: 'Testing blog title',
      author: 'Testing blog author',
      likes: 23,
      url: 'Testing blog url',
      username: 'starmil',
    };

    render(
      <Blog
        blog={testBlog}
        increaseLike={mockHandler}
        removeBlog={mockHandler}
      />
    );
  });

  test('render blog witchout url or likes count', () => {
    const title = screen.getByText('Testing blog title');
    expect(title).toBeDefined();

    const url = screen.queryByText('Testing blog url');
    expect(url).toBeNull();
  });

  test('after clicking show button it should render likes count', async () => {
    const likes = screen.queryByText('likes');
    expect(likes).toBeNull();

    const user = userEvent.setup();
    const button = screen.getByText('show');
    await user.click(button);

    const likes_after = screen.queryByText('23');
    expect(likes_after).toBeDefined();
  });

  test('Like button clicked twice equal event hadler called twice', async () => {
    const user = userEvent.setup();
    const show = screen.getByText('show');
    await user.click(show);

    const like_button = screen.getByText('like');
    await user.click(like_button);
    await user.click(like_button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test('should mock test work', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show');
    await user.click(button);

    const like_button = screen.getByText('like');
    await user.click(like_button);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});
