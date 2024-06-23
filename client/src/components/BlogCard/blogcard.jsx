import React from 'react'
import './blogcard.css'
import { useNavigate } from 'react-router-dom';

const BlogCard = () => {
    const navigate = useNavigate();

    const openBlog = () => {
        navigate('/blogs/ojas');
    };
    return (
        <div className='blog-card' onClick={openBlog}>
            <div className='image'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSUvdYFz0aM2ZL-P-I_m-Hm0bML8e9iCDEZQ&s" alt="Image for Blog" />
            </div>
            <div className='description'>
                <span className='about tert-text'>Blog articles</span>
                <h2 className='heading'>5 principles of an ideal SEO team structure</h2>
                <p className='description-starting-text'>
                    There is a method to (re)structuring an SEO team.
                    In this article, I explain the 5 guiding principles to..
                </p>
                <span className='description-metadata tert-text'>
                    Oct 18, 2021 4 min read
                </span>
            </div>
        </div>
    )
}

export default BlogCard