import { Form } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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


      const [tile,settitle] = useState();
      const [summary,setsummary] = useState();
      const [button,setbutton] = useState()

    return(
      <form>
            <input className={styles.title} type="text" placeholder="Title" /><br/>
            <input className={styles.summary} type="summary" placeholder="Summary" /><br/>
            <input className={styles.files} type="file"/>

            <ReactQuill modules={modules}/>
            <button className={styles.button}>Create Post</button>
            
      </form>
    )
}