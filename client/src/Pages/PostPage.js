import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import IndexPage from "../Layouts/IndexPage";
import {format} from 'date-fns';

import styles from './Styles/PostPage.module.css'



import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//======================================================
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
//======================================================

function PostPage(){
    const {id} = useParams();

    const [PostInfo,SetPostInfo] = useState(null);
    const [refresh,setrefresh]= useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response=>{
            response.json().then(PostInfo=>{
                console.log(PostInfo);
                SetPostInfo(PostInfo)
            })
        })

    },[])
    
    function DeletePost(){

        fetch(`http://localhost:4000/post/${id}`,{
                method:'DELETE',
        }).then(response=>{
            if(response.ok){
                navigate('/');
            }
        })

    }
    
    if(!PostInfo) return '' ;

    return(
        <>  
        <div className="blog_post">
            <div className={styles.title}>{PostInfo.title} </div><br />
            
            <time className={styles.time}>By {PostInfo.author.username} &bull; {format(new Date(PostInfo.createdAt),"dd-MM-yyyy")}</time>
            {/* <hr style={{opacity:0.5}}/> */}
            <div className={styles.files}>
                <img src={`http://localhost:4000/${PostInfo.cover}`} alt="" />
            </div>
            {/* <hr style={{opacity:0.5}}/> */}
            <div className={styles.summary}>{PostInfo.summary} </div>
            <hr style={{opacity:0.2}}/>
            <div className={styles.content} dangerouslySetInnerHTML={{__html:PostInfo.content}}/>


            <Button className={styles.delete} onClick={DeletePost} variant="outlined" style={{color:'red', border:'red'}} color="secondary" startIcon={<DeleteIcon />}>
                    Delete
            </Button>
        </div>
        </>
    )
}

export default PostPage