import { useState, useEffect } from 'react';
import { db } from '~/LoginWith/config';
import { getDocs} from 'firebase/firestore';
const useFirestore = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        
        getFriend()
    }, []);
    useEffect(() => {
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
