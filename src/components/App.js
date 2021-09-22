import { useState, useEffect } from "react";
import { Router } from "react-router-dom";
import AppRouter from "components/Router";
import {authService}  from "fbase"; 
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(user);
        setUserObj({
          uid : user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        // setIsLoggedIn(false);
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    // setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  return (
    <>
      {init ? ( <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} /> ) : ("initializing... ")}
      {/* <footer>&copy; {new Date().getFullYear()} Owitter</footer> */}
    </>)
}

export default App;