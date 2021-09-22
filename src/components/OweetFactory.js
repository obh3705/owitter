import {storageService, dbService} from "fbase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection, getDocs, onSnapshot, query } from "firebase/firestore";
import {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const OweetFactory = ({userObj}) => {

    const [oweet, setOweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        if ( oweet === "") {
            return;
        }

        let attachmentUrl = "";
        if (attachment != "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        await addDoc(collection(dbService, "oweets"), {
            text: oweet, createdAt: Date.now(), creatorId: userObj.uid, attachmentUrl 
            });


        setOweet("");
        setAttachment("");
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
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
            <input
                className="fatoryInput__input"
                value={oweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{ opacity: 0, }} />
            
            {attachment && (
                <div className="factoryForm__attachment">
                    <img src={attachment} style={{backgroundImage: attachment, }} />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>

            )}
        </form>
    );
};

export default OweetFactory;