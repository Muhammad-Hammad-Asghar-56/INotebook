import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Notes from './Components/Notes';
import UnAuthorizedPage from './Components/UnAuthorizedPage'

import NoteState from './Context/NoteState';
import UserState from './Context/UserState';
import backgroundImg from './img/background.jpg';
import ForgetPassword from './Components/ForgetPassword';

function App() {

  console.log("AuthToken", localStorage.getItem("authToken") ? true : false);

  return (
    <Router>
      <div
        className="App"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="background-image"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)',
            zIndex: -1,
            opacity: 0.8,
          }}
        ></div>
        <UserState>
          <NoteState>
            <Routes>
              <Route exact path={"/INoteBook"} element={<UnAuthorizedPage/>} />
              <Route exact path={"/SignIn"} element={<SignIn />} />
              <Route exact path={"/SignUp"} element={<SignUp />} />
              <Route exact path={"/ForgetPassword/:email/:authToken"} element={<ForgetPassword />} />
              <Route exact path={"/Home/Notes"} element={localStorage.getItem("authToken") ? (<Notes />):(<UnAuthorizedPage />) }
              />
              {/* <Route exact path={"/Test"} element={<Test/>} /> */}
            </Routes>
          </NoteState>
        </UserState>
      </div>
    </Router>
  );
}

export default App;
