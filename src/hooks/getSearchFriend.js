import { useState, useEffect } from 'react';
import { db } from '~/LoginWith/config';
import { onSnapshot,getDocs} from 'firebase/firestore';
import React from 'react';
const useFirestore = () => {
   
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        
        getUser()
    }, []);
    useEffect(() => {
        console.log(documents);
        
    }, [documents]);
   function getUser(){
    let collectionUser = db.collection('users');
    getDocs(collectionUser)
    .then(res => {
        
        const userall = res.docs.map(doc => ({
            uid: doc.data().uid,
            img: doc.data().photoURL,
            name: doc.data().displayName,
            phone: doc.data().phone,
            email: doc.data().email,
        }));
        setDocuments(userall);
        
       
        
    
    })
    .catch(err => err)
   }
//    console.log(documents)
    return documents;
};

export default useFirestore;
