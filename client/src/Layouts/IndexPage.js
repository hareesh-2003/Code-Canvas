import { useEffect, useState } from 'react'
import Post from '../Pages/Post'
import {easeIn, easeOut, motion} from "framer-motion"

export default function IndexPage({}){

    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/post').then(response=>{
            response.json().then(posts=>{
                setPosts(posts)
            })
        })
    },[])
    
       
    return(
        <>
            <div className='homepage_img'></div> 

               


                    <motion.div
                        initial={{ opacity: 0,y:100}}
                        animate={{ opacity: 1,y:0 }}
                        transition={{ duration: 1 ,ease:easeOut }}
                        className='title_container' // Adjust the duration as needed
                    >
                        <p className='Home_title'>Welcome to the Code Canvas Community<p className='home_subtitle'>Connecting Tech Enthusiasts to Explore, Discuss, and Share Insights on the Latest Trends in Digital Technology</p></p>

                    </motion.div>
                <div className="blogentries">
                    
                        {posts.length>0 && posts.map(post=>(
                            
                            <motion.div 
                            initial={{opacity:0,scale:0.87}}
                            whileInView={{opacity:1,scale:1}}
                            transition={{duration:0.5}}
                            >

                                <Post {...post}/>
                                <hr style={{opacity:0.2}}/>
                            </motion.div>


                                
                        ))}
                </div>
                         
           
        </>

    )
}