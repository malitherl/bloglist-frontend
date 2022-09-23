import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from  '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
//lets test first to see if the Blog component is rendered 

test('renders content', () => {
    const blog = {
        title: "I am a test",
        author: "tester mcgee",
        url: "am not real",
        likes: 68
    }
    render(<Blog blog = {blog}/>)
    const element = screen.getByText('I am a test by tester mcgee')
    expect(element).toBeDefined()
})

test('renders title and author name but not url or likes', () => {
    const blog = {
        title: "I am a test",
        author: "tester mcgee",
        url: "am not real",
        likes: 68
    }
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.toggable')
    expect(div).toHaveStyle('display: none')
})

test('renders url and likes when \'view\' is clicked', async () => {
    const blog = {
        title: "I am a test",
        author: "tester mcgee",
        url: "am not real",
        likes: 68
    }
    const user = userEvent.setup();
    
    const { container } = render(<Blog blog={blog} />)
    const button = container.querySelector('button')
    await user.click(button);
    const div = container.querySelector('.toggable')
    expect(div).not.toHaveStyle('display: none')
})

test('clicking like twice the handlelike prop event handler is called twice', async () => {
    const blog = {
        title: "I am a test",
        author: "tester mcgee",
        url: "am not real",
        likes: 68
    }
    const mockHandler = jest.fn()
    const user = userEvent.setup();

    const {container} = render(<Blog blog={blog} handleLike={mockHandler}/>)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('clicking \'handleBlogSubmit\' will call the event handler when the correct details are added to the blog form', async() => {
    
    const mockHandler = jest.fn();
    const user = userEvent.setup();
    const { container } = render(<BlogForm createBlog={mockHandler}/>)
    screen.debug()
    const input0 = screen.getByPlaceholderText('title')
    const input1 = screen.getByPlaceholderText('author')
    const input2 = screen.getByPlaceholderText('url')
    const saveButton = screen.getByText('create new blog')
    await user.type(input0, 'example title')
    await user.type(input1, 'example author')
    await user.type(input2, 'example url')
    await user.click(saveButton)
    screen.debug(input0)
    screen.debug(input1)
    screen.debug(input2)
    
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('example title')
    expect(mockHandler.mock.calls[0][0].author).toBe('example author')
    expect(mockHandler.mock.calls[0][0].url).toBe('example url')
    

})