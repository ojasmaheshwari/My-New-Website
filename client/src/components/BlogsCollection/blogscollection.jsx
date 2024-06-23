import React from 'react'
import BlogCard from '../BlogCard/blogcard'
import './blogscollection.css'

const BlogsCollection = () => {
    return (
        <>
            <main className='blogscollection-main'>
                <h1>Blog articles</h1>
                <span>Blog articles about Tech, Life and Culture</span>
                <div className='blogcards'>
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>
            </main>
        </>
    )
}

export default BlogsCollection;