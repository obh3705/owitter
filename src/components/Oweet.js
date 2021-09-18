import { dbService } from "fbase";
import { deleteDoc, doc } from "firebase/firestore";

const Oweet = ({oweetObj, isOwner}) => {

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");

        if (ok) {
            console.log(oweetObj.id);
            // const data = await dbService.doc(`oweets/${oweetObj.id}`);
            // const data = doc(dbService, `oweets/${oweetObj.id}`);
            const data = await deleteDoc(doc(dbService, `oweets/${oweetObj.id}`));
            
            console.log(data);
        }
        
    }

    return (
        <div>
            <h4>{oweetObj.text}</h4>
            {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete Oweet</button>
                    <button>Edit Oweet</button>
                </>
            )}
            
        </div>
    )
}

export default Oweet;