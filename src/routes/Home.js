import React, { useEffect } from "react";
import { useState } from 'react';
import { dbService } from "fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = ({userObj})=> {
    // console.log(userObj);
    const [oweet, setOweet] = useState("");
    const [oweets, setOweets] = useState([]);

    const getOweets = async () => {
        const dbOweets = await getDocs(collection(dbService, "oweets"));
        // console.log(dbOweets);

        dbOweets.forEach((document) => {
            const oweetObject = { ...document.data(), id: document.id };
            setOweets((prev) => [oweetObject, ...prev])
        });
        
    };

    useEffect(() => {
        getOweets();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        // await dbService.collection("oweets").add({
        //     text: oweet,
        //     createdAt: Date.now(),
        // });
        await addDoc(collection(dbService, "oweets"), {text: oweet, createdAt: Date.now(), creatorId: userObj.uid,})
        setOweet("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target : {value},
        } = event;
        setOweet(value);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value = {oweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    />
                <input type="submit" value="Oweet" />
            </form>
            <div>
                {oweets.map((oweet) => (
                    <div key={oweet.id}>
                        <h4>{oweet.text}</h4>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;