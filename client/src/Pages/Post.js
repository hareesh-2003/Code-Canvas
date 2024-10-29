import ReactQuill from "react-quill";
import entryImg2 from "../assests/land.jpg";
import { Link } from "react-router-dom";

//======================================================
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
//======================================================


function Post({_id,title,summary,cover,content,createdAt,author}){
    return(
    <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/'+cover} alt="not Loaded" />
          </Link>
        </div>
        <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2 className="blog_title">{title}</h2>
        </Link>
          <p className="info">
            <a className="author">{author.username}</a>
            {/* <p>{createdAt}</p> */}
            <time><ReactTimeAgo date={createdAt} locale="en"/></time>
          </p>
          <p className="summary">{summary}
            </p>
        </div>
    </div>
      
    );
}

export default Post