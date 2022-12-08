import firebase, { db } from '../LoginWith/config';
import {getDocs} from 'firebase/firestore';
export const addDocument = (collection, data) => {
    const query = db.collection(collection);

    query.add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
export const updateFriend = (uid,usernew) => {

    let collectionUser = db.collection('friend');
    let collectionUser2 = db.collection('addfriend');
             getDocs(collectionUser)
            .then(res => {
                const movs = res.docs.find(doc => doc.data().id == uid);
                const data = movs.data().friends;
                db.collection('friend').doc(movs.id).update({
                    friends: [...data,usernew],
                    id: uid,
                }).then(()=> {
                    
                }).catch(err => err);
                const movs2 = res.docs.find(doc => doc.data().id === usernew);
                const data2 = movs2.data().friends;
                db.collection('friend').doc(movs2.id).update({
                    friends: [...data2,uid],
                    id: usernew,
                }).then(()=> {
                    
                }).catch(err => err);
            })
            .catch(err => err)
            getDocs(collectionUser2)
            .then(res => {
                        const movss = res.docs.find(doc => doc.data().id === uid);
                        const dataa = movss.data().listaddfriend;
                        const dataaa = dataa.filter(item => item !== usernew);
                        console.log(dataaa);
                        db.collection('addfriend').doc(movss.id).update({
                            id: uid,
                            listaddfriend: dataaa,
                        }).then(()=> {
                            console.log('update ok 1')
                        }).catch(err => err);
            }).catch(err => err)
           
           
            let collectionRoom = db.collection('rooms');
            getDocs(collectionRoom)
            .then(res =>{ 
                
                let dk = false;
                const movs = res.docs.forEach(doc => {
                    if(doc.data().members.length === 2)
                    {
                        if(doc.data().members[0] === uid && doc.data().members[1] === usernew){
                            dk = true
                        }
                        if(doc.data().members[1] === uid && doc.data().members[0] === usernew){
                            dk = true
                        }
                    }
                })
                
                if(dk === false)
                {
                    addDocument('rooms', {
                        members : [uid,usernew],
                        name: '',
                        description: ''
                    });
                }
            }).catch(err => err)
            
    
}

export const deleteFriend = (uid,usernew) => {
    let collectionUser = db.collection('friend');
    getDocs(collectionUser)
            .then(res => {
                const movs = res.docs.find(doc => doc.data().id === uid);
                const data = movs.data().friends.filter(doc => doc !== usernew);
                db.collection('friend').doc(movs.id).update({
                    friends: data,
                    id: uid,
                }).then(()=> {
                    
                }).catch(err => err);
                const movs2 = res.docs.find(doc => doc.data().id === usernew);
                const data2 = movs2.data().friends.filter(doc => doc !== uid);
                db.collection('friend').doc(movs2.id).update({
                    friends: data2,
                    id: usernew,
                }).then(()=> {
                    
                }).catch(err => err);
            })
            .catch(err => err)
    
}

export const updateListAddFriend = (uid,user) =>
{
                    let collectionUser = db.collection('addfriend');
                    getDocs(collectionUser)
                    .then(res => {
                                const movss = res.docs.find(doc => doc.data().id == uid);
                                const dataa = movss.data().listaddfriend;
                                const dataaa = dataa.filter(item => item !== user);
                                db.collection('addfriend').doc(movss.id).update({
                                    id: uid,
                                    listaddfriend: dataaa,
                                }).then(()=> {
                                    console.log('delete ok')
                                }).catch(err => err);
                    }).catch(err => err)
                
}
export const addListAddFriend = (uid,user) =>
{
    let kt = true;
    let collectionUser = db.collection('addfriend');
    getDocs(collectionUser)
    .then(res => {
                const movss = res.docs.find(doc => doc.data().id == uid);
                movss === undefined ? kt = false : kt = true;
                if(kt === true)
                    {
                        getDocs(collectionUser)
                        .then(res => {
                                    const movss = res.docs.find(doc => doc.data().id == uid);
                                    const dataa = movss.data().listaddfriend;
                                    const dataaa = [...dataa,user];
                                    db.collection('addfriend').doc(movss.id).update({
                                        id: uid,
                                        listaddfriend: dataaa,
                                    }).then(()=> {
                                        console.log('add ok')
                                    }).catch(err => err);
                        }).catch(err => err)
                    }else
                    {
                        db.collection('addfriend').add({
                            id: uid,
                            listaddfriend: [user,],
                        }).then(res => console.log(res)).catch(err => console.log(err));
                    }
    }).catch(err => err)
                    
                
}
export const addGroup = (user,idgroup) =>
{
    let collectionUser = db.collection('rooms');
                        getDocs(collectionUser)
                        .then(res => {
                            
                                    const movss = res.docs.find(doc => doc.id === idgroup);
                                    const dataa = movss.data().members;
                                    if(dataa.includes(user)) {
                                        alert("User đã có trong nhóm")
                                    }
                                   
                                    else
                                    {
                                    const dataaa = [...dataa,user];
                                    db.collection('rooms').doc(movss.id).update({
                                        createdAt: movss.data().createdAt,
                                        description: movss.data().description,
                                        members: dataaa,
                                        name: movss.data().name,
                                    }
                                    )
                                    alert('Thêm thành viên thành công')
                                    }
                        }).catch(err => err)

}

export const generateKeywords = (displayName) => {
   
    const name = displayName.split(' ').filter((word) => word);

    const length = name.length;
    let flagArray = [];
    let result = [];
    let stringArray = [];

    for (let i = 0; i < length; i++) {
        flagArray[i] = false;
    }

    const createKeywords = (name) => {
        const arrName = [];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        });
        return arrName;
    };

    function findPermutation(k) {
        for (let i = 0; i < length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === length - 1) {
                    stringArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    const keywords = stringArray.reduce((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);

    return keywords;
};