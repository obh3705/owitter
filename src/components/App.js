import { useState } from "react";
import { Router } from "react-router-dom";
import AppRouter from "components/Router";
import {authService}  from "fbase"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Owitter</footer>
    </>)
}

export default App;