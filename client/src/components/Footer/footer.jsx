import React from 'react'

const Footer = () => {
    return (
        <footer className='primary'
            style={{
                height: '3rem',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: "calc(100svh - 4rem)"
            }}
        >
            <p
                style={{
                    color: '#FFFFFF',
                }}
            >
                @2024 Ojas Maheshwari, All rights reserved.
            </p>
        </footer>
    )
}

export default Footer