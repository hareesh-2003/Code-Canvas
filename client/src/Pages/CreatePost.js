import { Form } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import styles from './Styles/CreatePost.module.css'
import { useState } from "react";

export default function CreatePost(){

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],       // removed 
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'], //removed - , 'formula'
      
        [{ 'header': 1 }, { 'header': 2 }],               
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      
        [{ 'indent': '-1'}, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                         
        [{ 'size': ['small', false, 'large', 'huge'] }],  
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']  
        
       
      ];
      
      const modules = {
        toolbar:toolbarOptions
      }


      const [title,settitle] = useState();
      const [summary,setsummary] = useState();
      const [content,setContent] = useState();
      const [files,setFiles] = useState();
      const [button,setbutton] = useState()
    
function createNewPost(ev){
      ev.preventDefault();
      const data = new FormData();
      data.set('title',title);
      data.set('summary',summary);
      data.set('content',content);
      data.set('file',files[0]);
      console.log(data);
      
     fetch('http://localhost:4000/post',{
        method:'POST',
        body:data,
        credentials:'include',
      })

      
    }
    return(
      <form enctype="multipart/form-data" onSubmit={createNewPost}>
            {/* <input className={styles.title} value={title} onChange={ev=>settitle(ev.target.value)} type="text" placeholder="Title" /><br/> */}
            <TextField
              id="outlined-textarea"
              label="Title"
              placeholder="Placeholder"
              multiline
              className={styles.title} value={title} onChange={ev=>settitle(ev.target.value)}
              slotProps={{
                htmlInput: { maxLength: 55 }
                
            }}
        />

            <TextField
              id="outlined-textarea"
              label="Summary"
              placeholder="Placeholder"
              multiline
              className={styles.summary} value={summary} onChange={ev=>setsummary(ev.target.value)}
              slotProps={{
                htmlInput: { maxLength: 700 }
                
            }}
        />
            {/* <input className={styles.summary} value={summary} onChange={ev=>setsummary(ev.target.value)} type="summary" placeholder="Summary" /><br/> */}
            <input className={styles.files} onChange={ev=>setFiles(ev.target.files)} type="file"/>
            {/* <Button className={styles.files} onChange={ev=>setFiles(ev.target.files)} type="file" variant="contained">Upload Image</Button> */}

            <ReactQuill value={content} onChange={value=>setContent(value)} modules={modules}/>
            <button value={button} classame={styles.button}>Create Post</button>
            
      </form>
    )
}