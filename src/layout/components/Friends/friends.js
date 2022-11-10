import classNames from 'classnames/bind';
import styles from './friends.module.scss';
import images from '~/asset/images';
import { FaUserPlus } from 'react-icons/fa';
import Button from '../Button';
import listAddFriend from '../../../hooks/listAddFriend';
import { AuthContext } from '~/Context/AuthProvider';
import react, { useState } from 'react';
import { updateFriend,updateListAddFriend } from '~/Context/service';

const cx = classNames.bind(styles);
const time = '5 giờ';
export default function showFriends() {
  
    
    const {
        user: { photoURL, uid },
    } = react.useContext(AuthContext);
    const useraddfrs = listAddFriend(uid);
    const deleteaddfriend = (useraddfr) => {
        updateListAddFriend(uid, useraddfr.uid);
    }

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
                    <p>Lời mời kết bạn {useraddfrs.length == 0 ? '' : "(" + useraddfrs.length + ")"}</p>
                </div>

                {useraddfrs.map(useraddfr=> (

                <div className={cx('listadd-infor')}>
                    <div className={cx('infor')}>
                        <div className={cx('img')}>
                            <img src={useraddfr.img}></img>
                        </div>
                        <div className={cx('inf')}>
                            <h2>{useraddfr.name}</h2>
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
