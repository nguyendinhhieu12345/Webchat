import classNames from 'classnames/bind';
import styles from './messChat.module.scss';
import images from '~/asset/images';
import { FaSearch, FaVideo, FaBars, FaPaperPlane } from 'react-icons/fa';
import react, { forwardRef } from 'react';
import { AppContext } from '~/Context/AppProvider';
import { AuthContext } from '~/Context/AuthProvider';
import { addDocument } from '~/Context/service';
import { db } from '~/LoginWith/config';
import { onSnapshot } from 'firebase/firestore';
import StatusAvatar from '../Modals/status-avatar';
import { doc, updateDoc } from 'firebase/firestore';
import { AiFillBank } from 'react-icons/ai';
import { Button, Avatar, Form, Alert } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import ModalInviteMember from '~/layout/components/Modaladdfr/ModalInviteMember';
const cx = classNames.bind(styles);
function messChat(props, ref) {
    const {
        roomid,
        rooms,
        members,
        selectedRoomId,
        isOpenRename,
        setIsOpenRename,
        isOpenRenameDes,
        setIsOpenRenameDes,
        isOpenOption,
        setOpenOption,
        setIsOpenFormInvite,
        isOpenFormInvite,
    } = react.useContext(AppContext);

    const handleSetting = () => {
        document.getElementsByClassName(`${cx('wrapper')}`)[0].style.width = '80%';
    };
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
        if (chat !== '') {
            addDocument('messages', {
                text: chat,
                uid,
                photoURL,
                displayName,
                idroom: roomid,
            });
            document.getElementsByClassName(`${cx('input-chat')}`)[0].value = '';
            setChat('');
        }
    };
    //
    const handleinputchange = (e) => {
        setChat(e.target.value);
    };
    //
    const [documents, setDocuments] = react.useState([]);
    let listchat = db.collection('messages');
    //listchat = listchat.orderBy('createdAt', 'asc');
    listchat = listchat.where('idroom', '==', roomid);
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
    documents.sort((a, b) => a.createdAt - b.createdAt);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (chat !== '') {
                addDocument('messages', {
                    text: chat,
                    uid,
                    photoURL,
                    displayName,
                    idroom: roomid,
                });
                document.getElementsByClassName(`${cx('input-chat')}`)[0].value = '';
                setChat('');
            }
        }
    };

    const handleCancelRename = () => {
        setIsOpenRename('none');
    };

    const handleCancelOK = () => {
        if (inputNameGroup === '') {
            alert('H??y nh???p t??n ph??ng!!!');
        } else {
            updateDoc(doc(db, 'rooms', selectedRoomId), {
                name: inputNameGroup,
            })
                .then(() => {
                    alert('?????i t??n th??nh c??ng');
                })
                .catch((error) => {
                    alert('L???i r???i');
                });
            setIsOpenRename('none');
        }
    };
    const [inputNameGroup, setInputNameGrop] = react.useState('');
    const [inputDesGroup, setInputDesGroup] = react.useState('');
    const handleOkDes = () => {
        if (inputDesGroup === '') {
            alert('H??y nh???p m?? t???!!!');
        } else {
            updateDoc(doc(db, 'rooms', selectedRoomId), {
                description: inputDesGroup,
            })
                .then(() => {
                    alert('?????i t??n th??nh c??ng');
                })
                .catch((error) => {
                    alert('L???i r???i');
                });
            setIsOpenRename('none');
        }
    };

    const handleCancelDes = () => {
        setIsOpenRenameDes('none');
    };

    const handleOptionName = () => {
        setIsOpenRename('block');
        setOpenOption('none');
    };

    const handleOptionDes = () => {
        setIsOpenRenameDes('block');
        setOpenOption('none');
    };

    const handleOffOption = () => {
        setOpenOption('none');
    };

    const showInvite = () => {
        setIsOpenFormInvite(true);
    };
    const [idFriend, setIdFriends] = react.useState([]);
    react.useEffect(() => {
        let tmp = [];
        if (selectedRoom?.members.length === 2 && selectedRoom?.name === '') {
            if (selectedRoom?.members[0] === uid) {
                tmp.push(selectedRoom?.members[1]);
            } else {
                tmp.push(selectedRoom?.members[0]);
            }
        }
        if (selectedRoom?.members.length === 1) {
            tmp.push(selectedRoom?.members[0]);
        }
        if (selectedRoom?.members.length > 2) {
            tmp.push(selectedRoom?.members[0]);
        }
        setIdFriends([...tmp]);
    }, [selectedRoom]);
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
            {roomid ? (
                <div>
                    {' '}
                    <header className={cx('header-chat')}>
                        <div className={cx('img')}>
                            <img src={selectedRoom?.name === '' ? friend?.[0]?.photoURL : photoURL}></img>
                        </div>
                        <div className={cx('infor-chat')}>
                            <h2>{selectedRoom?.name || friend?.[0]?.displayName}</h2>
                            <p>Ho???t ?????ng</p>
                        </div>
                        <div className={cx('option')}>
                            <FaSearch className={cx('icon-option')} />
                            <FaVideo className={cx('icon-option')} />
                            <button className={cx('btnSetting')} ref={ref} onClick={props.onClick}>
                                <FaBars className={cx('icon-option')} onClick={handleSetting} />
                            </button>
                            <Button
                                type="text"
                                className={cx('icon-option')}
                                icon={<UserAddOutlined />}
                                onClick={showInvite}
                            >
                                M???i
                            </Button>
                            <div
                                className={cx('group-member')}
                                style={{ display: 'inline-block', position: 'relative' }}
                            >
                                {
                                    <Avatar.Group size="small" maxCount={3}>
                                        {members.map((member, index) => (
                                            <StatusAvatar
                                                status="green"
                                                size={30}
                                                name={member.displayName}
                                                githubHandle={member.photoURL}
                                            />
                                        ))}
                                    </Avatar.Group>
                                }
                            </div>
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
                        <Form
                            //form={form}
                            layout="vertical"
                            className="open-rename-form"
                            style={{ display: isOpenRename }}
                        >
                            <div className={cx('rename-group')}>
                                <p className={cx('rename-group-name')}>?????i t??n nh??m</p>
                                <img className={cx('rename-group-img')} src={images.connect}></img>
                                <p className={cx('rename-group-content')}>
                                    B???n c?? ch???c ch???n mu???n ?????i t??n nh??m, khi x??c nh???n t??n nh??m m???i s??? hi???n th??? v???i t???t c???
                                    c??c th??nh vi??n
                                </p>
                                <input
                                    onChange={(e) => setInputNameGrop(e.target.value)}
                                    type="text"
                                    name="input-rename"
                                    placeholder="Nh???p t??n nh??m"
                                />
                                <div>
                                    <button onClick={handleCancelRename} className={cx('rename-group-cancel')}>
                                        H???y
                                    </button>
                                    <button onClick={handleCancelOK} className={cx('rename-group-ok')}>
                                        X??c nh???n
                                    </button>
                                </div>
                            </div>
                        </Form>

                        <Form
                            //form={form}
                            layout="vertical"
                            className="open-option-form"
                            style={{ display: isOpenOption }}
                        >
                            <div className={cx('open-option-form')}>
                                <AiFillBank onClick={handleOffOption} className={cx('update-option-icon')} />
                                <p>B???n mu???n thay ?????i</p>
                                <button onClick={handleOptionName} className={cx('update-option-name')}>
                                    T??n
                                </button>
                                <button onClick={handleOptionDes} className={cx('update-option-des')}>
                                    M?? t???
                                </button>
                            </div>
                        </Form>

                        <Form
                            //form={form}
                            layout="vertical"
                            className="open-des-form"
                            style={{ display: isOpenRenameDes }}
                        >
                            <div className={cx('rename-group')}>
                                <p className={cx('rename-group-name')}>?????i m?? t???</p>
                                <img className={cx('rename-group-img')} src={images.connect}></img>
                                <p className={cx('rename-group-content')}>
                                    B???n c?? ch???c ch???n mu???n ?????i m?? t???, khi x??c nh???n t??n nh??m m???i s??? hi???n th??? v???i t???t c???
                                    c??c th??nh vi??n
                                </p>
                                <input
                                    onChange={(e) => setInputDesGroup(e.target.value)}
                                    type="text"
                                    name="input-rename"
                                    placeholder="Nh???p t??n m?? t???"
                                />
                                <div>
                                    <button onClick={handleCancelDes} className={cx('rename-group-cancel')}>
                                        H???y
                                    </button>
                                    <button onClick={handleOkDes} className={cx('rename-group-ok')}>
                                        X??c nh???n
                                    </button>
                                </div>
                            </div>
                        </Form>
                        <div className={cx('input-send')}>
                            <input
                                className={cx('input-chat')}
                                placeholder="Nh???p n???i dung tin nh???n"
                                name="content"
                                onChange={handleinputchange}
                                onKeyDown={handleKeyDown}
                            />
                            <FaPaperPlane className={cx('send')} onClick={handlesubmit} />
                        </div>
                    </section>
                    <Form layout="vertical" className="open-des-form" style={{ display: isOpenFormInvite }}>
                        <ModalInviteMember />
                    </Form>
                </div>
            ) : (
                <Alert
                    message="H??y ch???n tin nh???n"
                    type="info"
                    showIcon
                    style={{ display: 'flex', margin: '10px', color: 'blue', fontSize: '18px' }}
                />
            )}
        </div>
    );
}

export default forwardRef(messChat);
