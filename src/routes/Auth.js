import {authService, firebaseInstance} from "fbase";
import React, { useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if (name==='email') {
            setEmail(value);
        }else if (name ==='password') {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            let data;

            if(newAccount) {
                // create Account
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                // Log in
                data = await signInWithEmailAndPassword(authService, email, password);
            }

            console.log(data);

        }catch(error) {
            setError(error.message);
        }
        
    };

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }

    const onSocialClick = async (event) => {
        const {
            target : {name},
        } = event;
        let provider;
        if (name === "google"){
            provider = new firebaseInstance();
        }
        console.log(provider);

        const data = await signInWithPopup(authService, provider);
        console.log(data);
        
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} />
                <input type='submit' value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
            </div>
        </div>
        
    )
};

export default Auth;