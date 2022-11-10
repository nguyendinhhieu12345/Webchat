import { useState, useEffect } from 'react';
import { db } from '~/LoginWith/config';
import { onSnapshot,getDocs} from 'firebase/firestore';
import React from 'react';
const useFirestore = (uid) => {
    let user = uid;
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        
        getFriend()
    }, []);
    useEffect(() => {
        
       
    }, [documents]);

    function getFriend(){
        let collectionRef = db.collection('friend');
        getDocs(collectionRef)
        .then(res => {
            const movs = res.docs.map(doc => ({
                friend: doc.data().friends,
                data: doc.data(),
                id: doc.id,
                uid: doc.data().id,
            }))
            const them = [];
            for(let i of movs)
            {
                // console.log(i)
                if(i.uid == user)
                {
                    for(let j of i.friend)
                    {
                        them.push(j);
                    }
                    setDocuments(them);
                    
                }
            }
            
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
                    for(let j of them)
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
