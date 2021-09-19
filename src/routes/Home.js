import React, { useEffect } from "react";
import { useState } from 'react';
import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import Oweet from "components/Oweet";

const Home = ({ userObj }) => {

    const [oweet, setOweet] = useState("");
    const [oweets, setOweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    // const getOweets = async () => {
    //     const dbOweets = await getDocs(collection(dbService, "oweets"));
    //     // console.log(dbOweets);

    //     dbOweets.forEach((document) => {
    //         const oweetObject = { ...document.data(), id: document.id };
    //         setOweets((prev) => [oweetObject, ...prev])
    //     });

    // };

    // 이부분 잘 공부해서 다시 익히기
    // map 함수에 대해 정확히 이해하기
    useEffect(() => {
        // getOweets();
        const q = query(collection(dbService, 'oweets'));
        onSnapshot(q, snapshot => {
            const oweetArr = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOweets(oweetArr);
        });
    }, []);

    //async await 함수의 의미와 왜 써야하는 지 알아보기
    const onSubmit = async (event) => {
        event.preventDefault();
        // await dbService.collection("oweets").add({
        //     text: oweet,
        //     createdAt: Date.now(),
        // });
        await addDoc(collection(dbService, "oweets"), { text: oweet, createdAt: Date.now(), creatorId: userObj.uid, })
        setOweet("");
    };

    // 이 구문에 대해서 정확히 알기
    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value },
        } = event;
        setOweet(value);
    }

    const onFileChange = (event) => {
        // console.log(event.target.files);
        const {
            target: { files },
        } = event;

        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            // console.log(finishedEvent);
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => {
        setAttachment("");
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    value={oweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Oweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>

                )}
            </form>
            <div>
                {oweets.map((oweet) => (
                    <Oweet key={oweet.id} oweetObj={oweet} isOwner={oweet.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
}

export default Home;