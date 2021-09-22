import React from "react";
import {authService, dbService} from "fbase";
import {useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { collection, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({userObj}) => {

    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    // p.180 이해하기 필요
    // const getMyOweets = async () => {
    //     const oweets = await getDocs(query(collection(dbService, "oweets"),
    //         where("creatorId", "==", userObj.uid),
    //         orderBy("createdAt", "asc")));

    //     console.log(oweets.forEach((doc) => doc.data));
    // }

    // useEffect(() => {
    //     getMyOweets();
    // }, []);

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if(userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, {displayName: newDisplayName});
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={newDisplayName} type="text" placeholder="Display name" />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;