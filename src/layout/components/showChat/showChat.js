import classNames from 'classnames/bind';
import styles from './showChat.module.scss';
import FirestoreUse from '~/hooks/useFirestore';
import { AuthContext } from '~/Context/AuthProvider';
import react from 'react';
import { AppContext } from '~/Context/AppProvider';
import { onSnapshot } from 'firebase/firestore';
import { db } from '~/LoginWith/config';
const cx = classNames.bind(styles);
const time = '5 giờ';
function showChat() {
    //
    const {
        user: { photoURL, uid },
    } = react.useContext(AuthContext);
    const roomsCondition = react.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        };
    }, [uid]);
    const rooms = FirestoreUse('rooms', roomsCondition);
    const { setRoomid, setSelectedRoomId } = react.useContext(AppContext);
    const [idFriend, setIdFriends] = react.useState([]);

    const idFriends = idFriend;
    react.useEffect(() => {
        let tmp = [];
        rooms.forEach((room) => {
            if (room.members.length === 2) {
                if (room.members[0] === uid) {
                    tmp.push(room.members[1]);
                } else {
                    tmp.push(room.members[0]);
                }
            }
            if (room.members.length === 1) {
                tmp.push(room.members[0]);
            }
            if (room.members.length > 2) {
                tmp.push(room.members[0]);
            }
        });
        setIdFriends([...tmp]);
    }, [rooms]);
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
        // setFriend([...tmp]);
    }, [idFriend]);
    return (
        <div className={cx('wrapper')}>
            {rooms.map((room, index) => (
                <div
                    key={room?.id}
                    className={cx('infor-chat')}
                    onClick={() => {
                        setRoomid(room?.id);
                        setSelectedRoomId(room?.id);
                    }}
                >
                    <div className={cx('img')}>
                        <img src={room?.name === '' ? friend[index]?.photoURL : photoURL}></img>
                    </div>
                    <div className={cx('gui-chat')}>
                        <h2>{room?.name === '' ? friend[index]?.displayName : room?.name}</h2>
                        <p>{room?.description}</p>
                    </div>
                    <div className={cx('time')}>
                        <p>{time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default showChat;
