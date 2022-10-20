import classNames from 'classnames/bind';
import styles from './messChat.module.scss';
import images from '~/asset/images';
import { FaUserPlus, FaSearch, FaVideo, FaBars, FaPaperPlane, FaCcJcb } from 'react-icons/fa';
import react, { forwardRef, useMemo } from 'react';
import { AppContext } from '~/Context/AppProvider';
import Firestore from '~/hooks/useFirestore';
import { AuthContext } from '~/Context/AuthProvider';
import { addDocument } from '~/Context/service';
import { Alert } from 'antd';
import { db } from '~/LoginWith/config';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
const cx = classNames.bind(styles);

function messChat(props, ref) {
    const handleSetting = () => {
        document.getElementsByClassName(`${cx('wrapper')}`)[0].style.width = '80%';
    };
    const { roomid, rooms } = react.useContext(AppContext);
    const selectedRoom = react.useMemo(() => {
        return rooms.find((room) => {
            if (room.id === roomid) {
                return room;
            }
        });
    }, [rooms, roomid]);
    //
    const {
        user: { displayName, photoURL, uid },
    } = react.useContext(AuthContext);
    //
    const [chat, setChat] = react.useState('');
    const handlesubmit = () => {
        addDocument('messages', {
            text: chat,
            uid,
            photoURL,
            displayName,
            idroom: roomid,
        });
        document.getElementsByClassName(`${cx('input-chat')}`)[0].value = '';
    };
    //
    const handleinputchange = (e) => {
        setChat(e.target.value);
    };
    //
    const [documents, setDocuments] = react.useState([]);
    let listchat = db.collection('messages');
    listchat = listchat.where('idroom', '==', roomid);
    listchat.orderBy('createdAt', 'asc');
    //
    react.useEffect(() => {
        onSnapshot(listchat, (snapshot) => {
            const chat = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(chat);
        });
    }, [roomid]);
    return (
        <div className={cx('wrapper')}>
            {roomid ? (
                <div>
                    {' '}
                    <header className={cx('header-chat')}>
                        <div className={cx('img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-chat')}>
                            <h2>{selectedRoom === undefined ? '' : selectedRoom.name}</h2>
                            <p>Hoạt động</p>
                        </div>
                        <div className={cx('option')}>
                            <FaUserPlus className={cx('icon-option')} />
                            <FaSearch className={cx('icon-option')} />
                            <FaVideo className={cx('icon-option')} />
                            <button className={cx('btnSetting')} ref={ref} onClick={props.onClick}>
                                <FaBars className={cx('icon-option')} onClick={handleSetting} />
                            </button>
                        </div>
                    </header>
                    <section className={cx('content-chat')}>
                        <div className={cx('show-mess')}>
                            {documents.map((mess) => (
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
                            ))}
                        </div>
                        <div className={cx('input-send')}>
                            <input
                                className={cx('input-chat')}
                                placeholder="Nhập nội dung tin nhắn"
                                name="content"
                                onChange={handleinputchange}
                            />
                            <FaPaperPlane className={cx('send')} onClick={handlesubmit} />
                        </div>
                    </section>
                </div>
            ) : (
                <Alert
                    message="Hãy chọn tin nhắn"
                    type="info"
                    showIcon
                    style={{ display: 'flex', margin: '10px', color: 'blue', fontSize: '18px' }}
                />
            )}
        </div>
    );
}

export default forwardRef(messChat);
