import classNames from 'classnames/bind';
import styles from './settingChat.module.scss';
import react, { forwardRef } from 'react';
import { AppContext } from '~/Context/AppProvider';
import { AuthContext } from '~/Context/AuthProvider';
import { AiFillEdit } from 'react-icons/ai';
import { db } from '~/LoginWith/config';
import { onSnapshot } from 'firebase/firestore';
const cx = classNames.bind(styles);

function settingChat(props, ref) {
    const { roomid, rooms, members, setOpenOption } = react.useContext(AppContext);

    const handleRename = () => {
        setOpenOption('block');
    };
    const selectedRoom = react.useMemo(() => {
        return rooms.find((room) => {
            if (room.id === roomid) {
                return room;
            }
        });
    }, [rooms, roomid]);
    const {
        user: { photoURL, uid },
    } = react.useContext(AuthContext);
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
        <div className={cx('wrapper')} ref={ref}>
            <header className={cx('header')}>
                <h2>Thông tin hội thoại</h2>
            </header>
            <div className={cx('user')}>
                <div className={cx('img')}>
                    <img src={selectedRoom?.name === '' ? friend?.[0]?.photoURL : photoURL}></img>
                </div>
                <div className={cx('infor-chat')}>
                    <h2>{selectedRoom?.name || friend?.[0]?.displayName}</h2>
                    <AiFillEdit onClick={handleRename} className={cx('edit-name')} />
                </div>
                <div>
                    <p>{members.length} thành viên</p>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(settingChat);
