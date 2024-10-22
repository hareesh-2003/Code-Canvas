import entryImg2 from "../assests/land.jpg"



function Post(){
    return(
    <div className="post">
        <div className="image">
          <img src={entryImg2} alt="not Loaded" />
        </div>
        <div className="texts">
          <h2>Portrait of a Contemplative Gentleman in Early 20th Century Elegance (1910)</h2>
          <p className="info">
            <a className="author">P Hareesh</a>
            <time>11-09-01 5:41 AM</time>
          </p>
          <p className="summary">This striking portrait, painted in 1910, captures a pensive man in formal attire, 
            likely from the early 20th century. 
            The subtle yet expressive brushwork emphasizes his relaxed posture and thoughtful demeanor. 
            </p>
        </div>
    </div>
      
    );
}

export default Post