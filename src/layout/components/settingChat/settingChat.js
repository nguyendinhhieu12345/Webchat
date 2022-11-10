import classNames from 'classnames/bind';
import styles from './settingChat.module.scss';
import images from '~/asset/images';
import react, { forwardRef } from 'react';
import { AppContext } from '~/Context/AppProvider';
import { AuthContext } from '~/Context/AuthProvider';
import { AiFillEdit } from 'react-icons/ai';

const cx = classNames.bind(styles);

function settingChat(props, ref) {
    const {
        roomid,
        rooms,
        isOpenRename,
        setIsOpenRename,
        members,
        isOpenRenameDes,
        setIsOpenRenameDes,
        isOpenOption,
        setOpenOption,
    } = react.useContext(AppContext);

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
        user: { displayName, photoURL, uid },
    } = react.useContext(AuthContext);
    return (
        <div className={cx('wrapper')} ref={ref}>
            <header className={cx('header')}>
                <h2>Thông tin hội thoại</h2>
            </header>
            <div className={cx('user')}>
                <div className={cx('img')}>
                    <img src={photoURL}></img>
                </div>
                <div className={cx('infor-chat')}>
                    <h2>{selectedRoom === undefined ? '' : selectedRoom.name}</h2>
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
