import React from 'react'
import './Review.css'
import noimage from '../../assets/no-image.png'

function Review({review}) {

    //baseurl for images
    const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;

    //create state for image error
    const [imageError, setImageError] = React.useState(false);

    //create state for see more/less
    const [seeMore, setSeeMore] = React.useState(false);

  return (
    <div className='review'>
        <div className='avatar-container'>
            <img className='avatar'
            onError={()=>setImageError(true)}
            src={imageError? noimage : `${imageBaseUrl}${review.author_details.avatar_path}`} />
            <p>{review.author}</p>
        </div>
        <div className='review-text'>
            {
                seeMore ? 
                <p>{review.content}
                <span className='read-content' onClick={()=>setSeeMore(false)}>&nbsp;SEE LESS</span>
                </p>
                :
                <p>{review.content.slice(0,250)} 
                <span className='read-content' onClick={()=>setSeeMore(true)}>&nbsp;SEE MORE</span>
                </p>
            }
            
        </div>
    </div>
  )
}

export default Review