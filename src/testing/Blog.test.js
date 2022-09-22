import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { getByText, render, screen } from '@testing-library/react'
import userEvent from  '@testing-library/user-event'
import Blog from '../components/Blog'
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
    const buttons = container.querySelectorAll('.toggable button')
    const likeButton = Array.from(buttons)[1]
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)

})