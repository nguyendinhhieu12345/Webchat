import classNames from 'classnames/bind';
import styles from './friends.module.scss';

import { FaUserPlus } from 'react-icons/fa';
import Button from '../Button';
import { AuthContext } from '~/Context/AuthProvider';
import react from 'react';
import { updateFriend,updateListAddFriend } from '~/Context/service';
import { AppContext } from '~/Context/AppProvider';


const cx = classNames.bind(styles);
export default function showFriends() {
    
    const {AddFriendList} = react.useContext(AppContext);
    const [rs,setrs] = react.useState(AddFriendList);
    const {
        user: { uid },
    } = react.useContext(AuthContext);
    const deleteaddfriend = (useraddfr) => {
        updateListAddFriend(uid, useraddfr.uid);
    }   
    react.useEffect(()=>{
        setrs(AddFriendList);
        AddFriendList.forEach(dat => console.log(dat));
    },[AddFriendList])
    const acpfriend = (useraddfr) => {
        updateFriend(uid,useraddfr.uid)
    }

    return (
        <div className={cx('wrapper')}>
            <header className={cx('listfriend')}>
                <FaUserPlus className={cx('icon-friends')} />
                <h1>Danh sách kết bạn</h1>
            </header>
            <div className={cx('listaddfriend')}>
                <div className={cx('listadd-header')}>
                    <p>Lời mời kết bạn {rs.length === 0 ? '' : "(" + rs.length + ")"}</p>
                </div>

                {rs.map(useraddfr => (

                <div className={cx('listadd-infor')}>
                    <div className={cx('infor')}>
                        <div className={cx('img')}>
                            <img src={useraddfr.photoURL} alt=""></img>
                        </div>
                        <div className={cx('inf')}>
                            <h2>{useraddfr.displayName}</h2>
                            <p>Từ số điện thoại</p>
                        </div>
                    </div>
                    <div className={cx('option')}>
                        <Button className={cx('option-1')} onClick = {()=> {deleteaddfriend(useraddfr)}}>Xóa</Button>
                        <Button className={cx('option-2')} onClick = {() =>{acpfriend(useraddfr) }} >Đồng ý</Button>
                    </div>
                </div>
                ))}
                
            </div>
        </div>
    );
}

// export default showFriends;