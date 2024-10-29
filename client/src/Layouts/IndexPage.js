import { useEffect, useState } from 'react'
import Post from '../Pages/Post'


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
                <p className='Home_title'>Welcome to the Code Canvas Community</p>

                <div className="blogentries">
                    {posts.length>0 && posts.map(post=>(
                            <Post {...post}/>
                    ))}
                </div>
            
        </>

    )
}