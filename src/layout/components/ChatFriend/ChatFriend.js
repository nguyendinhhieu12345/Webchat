import classNames from 'classnames/bind';
import styles from './ChatFriend.module.scss';
import { FaPaperPlane } from 'react-icons/fa';
import react  from 'react';
import { AppContext } from '~/Context/AppProvider';
import { AuthContext } from '~/Context/AuthProvider';
import { addDocument } from '~/Context/service';
import { db } from '~/LoginWith/config';
import { onSnapshot } from 'firebase/firestore';
import { Alert } from 'antd';
const cx = classNames.bind(styles);
function ChatFriend({idfriend}) {
    const {
        rooms,
        getmessFriend
    } = react.useContext(AppContext);
    const {
        user: { displayName, photoURL, uid },
    } = react.useContext(AuthContext);
    const [listgroup, setListgroup] = react.useState([]);
    react.useEffect(() => {
        let tmp = [];
        rooms.forEach((room) => {
            if (room.members.length === 2 && room.name === '') {
                tmp.push(room);
            }
        });
        setListgroup([...tmp]);
    }, [rooms]);
    //let idroom='';
    const [idroom,setIdroom]=react.useState('')
    const [selectroomfriend, setSelectroomfriend] = react.useState([]);
    react.useEffect(() => {
        let tmp = [];
        listgroup.forEach((room) => {
            if((room.members[0] === uid && room.members[1] === idfriend) || (room.members[1] === uid && room.members[0] === idfriend))
            {
                tmp.push(room);
                setIdroom(room.id)
            }
        });
        setSelectroomfriend([...tmp]);
    }, [listgroup, idfriend]);
    
    const [chat, setChat] = react.useState('');
    //
    const handleinputchange = (e) => {
        setChat(e.target.value);
    };
    //
    const [documents, setDocuments] = react.useState([]);
    //
    react.useEffect(() => {
        let listchat = db.collection('messages');
        listchat = listchat.where('idroom', '==', idroom);
        onSnapshot(listchat, async (snapshot) => {
            const chat = await snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log(chat)
            setDocuments(chat);
        });
    }, [idroom]);
    documents.sort((a, b) => a.createdAt - b.createdAt);
    const handlesubmit = () => {
        if (chat !== '') {
            addDocument('messages', {
                text: chat,
                uid,
                photoURL,
                displayName,
                idroom: idroom,
            });
            document.getElementsByClassName(`${cx('input-chat')}`)[0].value = '';
            setChat('');
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (chat !== '') {
                addDocument('messages', {
                    text: chat,
                    uid,
                    photoURL,
                    displayName,
                    idroom: idroom,
                });
                document.getElementsByClassName(`${cx('input-chat')}`)[0].value = '';
                setChat('');
            }
        }
    };
    const [idFriend, setIdFriends] = react.useState([]);
    react.useEffect(() => {
        let tmp = [];
        selectroomfriend.forEach((roomselect)=>{
            if (roomselect?.members[0] === uid) {
                tmp.push(roomselect?.members[1]);
            } else {
                tmp.push(roomselect?.members[0]);
            }
        })
        setIdFriends([...tmp]);
    }, [selectroomfriend]);
    
    const [friend, setFriend] = react.useState([]);
    react.useEffect(() => {
        let tmp = [];
        idFriend.forEach(async (id) => {
            let listchat = db.collection('users');
            listchat = listchat.where('uid', '==', id);
            await onSnapshot(listchat, (snapshot) => {
                const chat = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                tmp.push(...chat);
                setFriend([...tmp]);
            });
        });
    }, [idFriend]);
    return (
        <div className={cx('wrapper')}>
            {
                !selectroomfriend?.[0] ? 
                <Alert
                    message="Không có đoạn chat"
                    type="info"
                    showIcon
                    style={{ display: 'flex', margin: '10px', color: 'blue', fontSize: '18px' }}
                />
             : <div>
                {' '}
                <header className={cx('header-chat')}>
                    <div className={cx('img')}>
                        <img src={selectroomfriend[0]?.name === '' ? friend[0]?.photoURL : photoURL}></img>
                    </div>
                    <div className={cx('infor-chat')}>
                        <h2>{selectroomfriend[0]?.name === '' ? friend[0]?.displayName : displayName}</h2>
                        <p>Hoạt động</p>
                    </div>
                </header>
                <section className={cx('content-chat')}>
                    <div className={cx('show-mess')}>
                        {documents ? (
                            documents.map((mess) => (
                                <div key={mess.id} className={cx('item-mess', uid === mess.uid ? 'mychat' : '')}>
                                    <div className={cx('img')} style={{ width: '40px', height: '40px' }}>
                                        <img src={mess.photoURL}></img>
                                    </div>
                                    <p
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            padding: '5px 5px',
                                            borderRadius: '20px',
                                            fontSize: '18px',
                                            maxWidth: '600px',
                                        }}
                                    >
                                        {mess.text}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className={cx('input-send')}>
                        <input
                            className={cx('input-chat')}
                            placeholder="Nhập nội dung tin nhắn"
                            name="content"
                            onChange={handleinputchange}
                            onKeyDown={handleKeyDown}
                        />
                        <FaPaperPlane className={cx('send')} onClick={handlesubmit} />
                    </div>
                </section>
            </div>
            }
                
        </div>
    );
}

export default ChatFriend;
