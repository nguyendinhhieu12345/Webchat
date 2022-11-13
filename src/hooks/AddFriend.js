import { useState, useEffect } from 'react';
import { db } from '~/LoginWith/config';
import { onSnapshot} from 'firebase/firestore';
const AddFriend = (uid) => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        
        getAddListFriend();
    }, []);
     useEffect(() => {
        
       
    }, [documents]);
    const getAddListFriend = () => {
        let collectionAddFriend = db.collection('addfriend');
        let collectionUser = db.collection('users');
        onSnapshot(collectionAddFriend, (snapshot) => {
            const listuseraddfr = [];
            snapshot.docs.forEach(doc => {
                if(doc.data().id === uid)
                {
                    console.log(doc.data().id,doc.data().listaddfriend);
                    for(let i of doc.data().listaddfriend)
                    {
                        console.log(i);
                        onSnapshot(collectionUser,(snapshot2) => {
                            snapshot2.docs.forEach(doc2 => {
                                if(doc2.data().uid === i)
                                {
                                    listuseraddfr.push(doc2.data());
                                }
                            })
                        })
                    }
                }
            })
            // console.log(listuseraddfr);
            setDocuments(listuseraddfr);
        })
        
    }
    // console.log(documents);
    return documents;
};

export default AddFriend;