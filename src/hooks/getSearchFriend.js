import { useState, useEffect } from 'react';
import { db } from '~/LoginWith/config';
import { onSnapshot} from 'firebase/firestore';
const useFirestore = () => {
   
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        getUser()
    }, []);
   function getUser(){
    let collectionUser = db.collection('users');
    onSnapshot(collectionUser,snapshot => {
        const userall = snapshot.docs.map(doc => ({
            uid: doc.data().uid,
            img: doc.data().photoURL,
            name: doc.data().displayName,
            phone: doc.data().phone,
            email: doc.data().email,
        }));
        setDocuments(userall);
    })
   }
    console.log('xuat');
    return documents;
    
};

export default useFirestore;