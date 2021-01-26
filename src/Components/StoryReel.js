import React from 'react'
import Story from './Story'
import './StoryReel.css'

const StoryReel = () => {
    return (
        <div className='storyReel' >
            <Story image='https://upload.wikimedia.org/wikipedia/commons/7/70/05QE4Lo7K80.jpg' 
            profileSrc='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/A%24AP_Rocky_UIT_2013_%28cropped%29_%28cropped%29.jpg/375px-A%24AP_Rocky_UIT_2013_%28cropped%29_%28cropped%29.jpg'
            title='A$AP Rocky'/>

            <Story image='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Basket_Ball_Ground_PUP.jpg/1024px-Basket_Ball_Ground_PUP.jpg' 
            profileSrc='https://upload.wikimedia.org/wikipedia/commons/f/f7/LeBron_James_2.jpg'
            title='LeBron James'/>

            <Story image='https://upload.wikimedia.org/wikipedia/commons/9/9a/Soyuz_TMA-9_launch.jpg' 
            profileSrc='https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg'
            title='Elon Musk'/>

            <Story image='https://upload.wikimedia.org/wikipedia/commons/f/fc/Motera.jpg' 
            profileSrc='https://upload.wikimedia.org/wikipedia/commons/7/7c/The_President%2C_Shri_Pranab_Mukherjee_presenting_the_Padma_Shri_Award_to_Shri_Virat_Kohli%2C_at_a_Civil_Investiture_Ceremony%2C_at_Rashtrapati_Bhavan%2C_in_New_Delhi_on_March_30%2C_2017_%28cropped%29.jpg'
            title='Virat Kohli'/>

        </div>
    )
}

export default StoryReel
