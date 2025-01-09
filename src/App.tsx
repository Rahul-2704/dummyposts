import React from 'react';
import { Posts } from './pages/posts.tsx';
import './App.css';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import { PostDetails } from './pages/postDetails.tsx';
import { NotFound } from './pages/notFound.tsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/posts/:id' element={<PostDetails/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
