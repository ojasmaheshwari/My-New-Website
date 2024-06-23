import React from 'react'
import './home.css'
import Card1 from '../../assets/images/1.png'
import Card from '../Card/card'

const Home = () => {
    return (
        <main className='home-main'
            style={{
                height: 'fit-content',
                paddingBottom: '3rem',
            }}
        >
            <div className="about">
                <h1>Ojas Maheshwari</h1>
                <article>
                    I am a Programmer 👋 <br />I use C/C++, Java, HTML, CSS, JavaScript, PHP
                    and Python
                </article>
            </div>
            <div className="recent-actions">
                <h2>Most Recent Activities and Blogs</h2>
                <div className="cards">
                    <Card
                        image={Card1}
                        description="A web-based code editor made using monaco-editor, piston-api and vite"
                    />
                    <Card
                        image={Card1}
                        description="A web-based code editor made using monaco-editor, piston-api and vite"
                    />
                    <Card
                        image={Card1}
                        description="A web-based code editor made using monaco-editor, piston-api and vite"
                    />
                    <Card
                        image={Card1}
                        description="A web-based code editor made using monaco-editor, piston-api and vite"
                    />
                    <Card
                        image={Card1}
                        description="A web-based code editor made using monaco-editor, piston-api and vite"
                    />
                </div>
            </div>
        </main>

    )
}

export default Home