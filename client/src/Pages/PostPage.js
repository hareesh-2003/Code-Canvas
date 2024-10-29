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
            <time>{format(new Date(PostInfo.createdAt),"'Created on 'dd-MM-yyyy")}</time>
            <div>{PostInfo.title} </div><br />
            <div>{PostInfo.summary} </div>
            <div className={styles.files}>
                <img src={`http://localhost:4000/${PostInfo.cover}`} alt="" />
            </div>
            <div dangerouslySetInnerHTML={{__html:PostInfo.content}}/>
            <button onClick={DeletePost}>Delete </button>
            {/* <Button variant="outlined" color="error">
                Delete
            </Button> */}

            <Button variant="outlined" style={{color:'red', border:'red'}} color="secondary" startIcon={<DeleteIcon />}>
                    Delete
            </Button>
            <TextField
          id="outlined-textarea"
          label="Summary"
          placeholder="Placeholder"
          multiline
          style={{width:'900px'}}
          slotProps={{
            htmlInput: { maxLength: 770 }
            }}
        />

      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />

        </>
    )
}

export default PostPage