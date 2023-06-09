import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import Navbar from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Notes from './Components/Notes';
import NoteState from './Context/NoteState';

function App() {
  const [isSignIn,setIsSignIn]=useState(false);
  const setSignInTrue=()=>{
    setIsSignIn(true);
  }
  console.log(isSignIn);
  return (
    // <>
    //   <SignIn />
    //   <SignUp />
    // </>
     <div className="App">
     <NoteState>

      <BrowserRouter>
        {isSignIn ? <Navbar/>: null}
        <Routes>
          <Route exact path={"/"} element={<SignIn setSignIn={setSignInTrue}/>} />
          <Route exact path={"/SignUp"} element={<SignUp/>} />
          <Route exact path={"/Home/Notes"} element={<Notes setSignIn={setSignInTrue}/>} />
        </Routes>
      </BrowserRouter>

     </NoteState>
   </div>
  );
}

export default App;
