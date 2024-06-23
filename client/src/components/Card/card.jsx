import React from 'react'
import likeSVG from '../../assets/svg/like.svg'
import dislikeSVG from '../../assets/svg/dislike.svg'
import './card.css'

const Card = ({ image, description }) => {
    return (
        <div className="card">
            <div className="image">
                <img src={image} />
            </div>
            <div className="card-text">
                <div className="head">OjasEditor</div>
                <div className="desc">
                    {description}
                </div>
            </div>
            <div className="card-actions">
                <button className="like">
                    <img src={likeSVG} />
                </button>
                <button className="dislike">
                    <img src={dislikeSVG} />
                </button>
                <a href="#">See &gt;&gt;</a>
            </div>
        </div>
    )
}

export default Card