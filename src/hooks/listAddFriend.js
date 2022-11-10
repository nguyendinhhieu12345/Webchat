import { useState, useEffect } from 'react';
import { db } from '~/LoginWith/config';
import { onSnapshot,getDocs} from 'firebase/firestore';
import React from 'react';
const useFirestore = (uid) => {
    let user = uid;
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
            const movs = res.docs.find(doc => doc.data().id == user);
       
            
           
            
            let collectionUser = db.collection('users');
            getDocs(collectionUser)
            .then(res => {
                let userfr = [];
                const userall = res.docs.map(doc => ({
                    uid: doc.data().uid,
                    name: doc.data().displayName,
                    img: doc.data().photoURL,
                }))
               
                for(let i of userall)
                {
                    for(let j of movs.data().listaddfriend)
                    {
                        if(i.uid == j)
                        {
                            userfr.push({
                                uid: i.uid,
                                name: i.name,
                                img: i.img,
                            })
                        }
                    }
                }
                setDocuments(userfr)
            })
            .catch(err => err)
           
        })
        .catch(err => err)
    }
  
    return documents;
};

export default useFirestore;
