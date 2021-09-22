import {authService, firebaseInstance} from "fbase";
import React, { useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import AuthForm from "components/AuthForm";

const Auth = () => {

    const onSocialClick = async (event) => {
        const {
            target : {name},
        } = event;
        let provider;
        if (name === "google"){
            provider = new firebaseInstance();
        }

        const data = await signInWithPopup(authService, provider);
        
    }

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">
                    Continue with Google
                </button>
            </div>
        </div>
        
    )
};

export default Auth;