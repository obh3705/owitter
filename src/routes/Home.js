import React, { useEffect } from "react";
import { useState } from 'react';
import { dbService } from "fbase";
import { addDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import Oweet from "components/Oweet";
import OweetFactory from "components/OweetFactory";

const Home = ({ userObj }) => {

    const [oweets, setOweets] = useState([]);

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


    // await dbService.collection("oweets").add({
    //     text: oweet,
    //     createdAt: Date.now(),
    // });

    //async await 함수의 의미와 왜 써야하는 지 알아보기

    return (
        <div className="container">
            <OweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {oweets.map((oweet) => (
                    <Oweet key={oweet.id} oweetObj={oweet} isOwner={oweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
}

export default Home;