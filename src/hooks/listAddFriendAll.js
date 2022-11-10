import { useState, useEffect } from 'react';
import { db } from '~/LoginWith/config';
import { onSnapshot,getDocs} from 'firebase/firestore';
import React from 'react';
const useFirestore = () => {
    // console.log(user)
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        
        getFriend()
    }, []);
    useEffect(() => {
        
        console.log(documents)
    }, [documents]);

    function getFriend(){
        let collectionRef = db.collection('addfriend');
        getDocs(collectionRef)
        .then(res => {
            const movs = res.docs.map(doc => ({
                uid: doc.data().id,
                listaddfriend: doc.data().listaddfriend,
            }))
       
            setDocuments(movs);
           
            
            
               
           
        })
        .catch(err => err)
    }
  
    return documents;
};

export default useFirestore;
