import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Oweet = ({ oweetObj, isOwner }) => {

    const [editing, setEditing] = useState(false);
    const [newOweet, setNewOweet] = useState(oweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");

        if (ok) {
            // console.log(oweetObj.id);
            // const data = await dbService.doc(`oweets/${oweetObj.id}`);
            // const data = doc(dbService, `oweets/${oweetObj.id}`);
            await deleteDoc(doc(dbService, `oweets/${oweetObj.id}`));

            if (oweetObj.attachmentUrl != "") {
                deleteObject(ref(storageService, oweetObj.attachmentUrl));
            }

            // console.log(data);
        }

    }

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewOweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        // console.log(oweetObj.id, newOweet);
        await updateDoc(doc(dbService, `oweets/${oweetObj.id}`), { text: newOweet });
        setEditing(false);
    };

    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input onChange={onChange} value={newOweet} required placeholder="Edit your oweet" autoFocus className="formInput" />
                        <input type="submit" value="Update Oweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>
            ) : (
                    <>
                        <h4>{oweetObj.text}</h4>
                        {oweetObj.attachmentUrl && (
                            <img src={oweetObj.attachmentUrl} width="50px" height="50px" />
                        )}
                        {isOwner && (
                            <div className="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </>
                )}
        </div>
    )
}

export default Oweet;