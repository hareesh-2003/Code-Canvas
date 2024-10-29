import './App.css';
import entryImg from "./assests/entry_img.jpg"
import entryImg2 from "./assests/land.jpg"
import entryImg3 from "./assests/test.jpg"
import Header from './Pages/Header';
import Layout from './Layouts/Layout';
import Post from './Pages/Post';
import {Route, Routes} from 'react-router-dom'
import IndexPage from './Layouts/IndexPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { UserContextProvider } from './UserContext.js';
import CreatePost from './Pages/CreatePost.js';
import PostPage from './Pages/PostPage.js';


function App() {
  return (
    <UserContextProvider>
    <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/CreatePost" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<PostPage/>}/>

        </Route>
          
    </Routes>
    </UserContextProvider>
    
   
  );
}
//test
export default App;


//yarn start