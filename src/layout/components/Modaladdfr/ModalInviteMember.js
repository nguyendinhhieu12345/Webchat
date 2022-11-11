import classNames from 'classnames/bind';
import styles from './showChat.module.scss';
import { AuthContext } from '~/Context/AuthProvider';
import react, { useState } from 'react';
import {  FaWindowClose } from 'react-icons/fa';
import { Button } from 'antd';
import getSearchFriend from '~/hooks/getSearchFriend';
import getFriends from '~/hooks/getFriends';
import { db } from '~/LoginWith/config';
import { AppContext } from '~/Context/AppProvider';
import {addGroup} from '~/Context/service';


let dem = 0;







const cx = classNames.bind(styles);
function showChat({modaladd}) {
    const {
        selectedRoomId,
        selectedRoom,
        members,
    
    } = react.useContext(AppContext);
    const {
        user: {  uid },
    } = react.useContext(AuthContext);


    console.log(members,'hello')

   
    const [hienthi,sethienthi] = react.useState(false);

    const [tab,setTab] = react.useState(0);
    const btnSdt = react.useRef();
    const btnEmail = react.useRef();
    const inputSdt = react.useRef();
    const inputEmail = react.useRef();
    const inputSdt2 = react.useRef();
    const inputEmail2 = react.useRef();
   const datas = getSearchFriend();
   const [data,setdata] = react.useState({});
    
    const handleInfor = () => {
        let dk = '';
        if(tab === 1)
        {
            dk = inputSdt2.current.value;
            const kt = datas.find(data =>{return (data.phone === dk)});
            if(dk !== '' && kt !== undefined)
            {
                setdata(kt);
            }
            
        }
        if(tab === 2)
        {
            dk = inputEmail2.current.value;
            const kt = datas.find(data =>{return (data.email === dk)});
            if(dk !== '' && kt !== undefined)
            {
                setdata(kt);
            }
        }
    }
  
  
   
    const tonggle = () => {
        if(tab === 0)
        {
            btnSdt.current.style.backgroundColor = 'white';
            btnEmail.current.style.backgroundColor = 'white';
            inputSdt.current.style.display = 'none';
            inputEmail.current.style.display = 'none';
            inputEmail2.current.value = '';
            inputSdt2.current.value = '';

        }
        if(tab === 1)
        {
            btnSdt.current.style.backgroundColor = 'red';
            btnEmail.current.style.backgroundColor = 'white';
            inputSdt.current.style.display = 'flex';
            inputEmail.current.style.display = 'none';
            inputEmail2.current.value = '';
        }
        if(tab === 2)
        {
            btnSdt.current.style.backgroundColor = 'white';
            btnEmail.current.style.backgroundColor = 'red';
            inputSdt.current.style.display = 'none';
            inputEmail.current.style.display = 'flex';
            inputSdt2.current.value = '';
        }
    }
    react.useEffect(() => {
        tonggle();
    

    },[tab])



   
    const handleInviteMember = () => 
    {
        console.log(data.uid,selectedRoomId);
        addGroup(data.uid,selectedRoomId)
   
    }
    return (
        <div className={cx('modal-container')}>
            <div className={cx('form-add-friend')}>
                <form className={cx('form-friend')}>
                    <div className={cx('header')}>
                        <h2>Thêm bạn</h2>
                        <div className={cx('close')} onClick={()=>{modaladd(false)}}>
                            <FaWindowClose className={cx('icon-close')}/>
                        </div>
                    </div>
                    <div className={cx('search')}>
                       <h2>Tìm theo</h2>
                       <div className={cx('btn-search')}>
                            <Button ref={btnSdt} onClick={()=> {
                                setTab(1);
                                sethienthi(false);
                            }}>Số Điện Thoại</Button>
                            <Button ref={btnEmail} onClick={()=> 
                            {
                                setTab(2);
                                sethienthi(false);
                            }}>Email</Button>
                       </div>
                       <div className={cx('input-number')} ref={inputSdt}>
                            <input ref={inputSdt2}/>
                            <FaWindowClose onClick={() => {
                            setTab(0);
                            sethienthi(false);
                            }
                            }/>
                       </div>
                       <div className={cx('input-email')} ref={inputEmail}>
                            <input ref={inputEmail2}/>
                            <FaWindowClose onClick={() => {
                                setTab(0);
                            }}/>
                       </div>
                    </div>
                    {(data.phone !== undefined || data.email !== undefined) && (hienthi === true) &&
                        (<div className={cx('info-search')}>
                            <div className={cx('img-info')}>
                                <img src={data.img} alt='ảnh'></img>
                            </div>
                            <h3>{data.name}</h3>
                            <div className={cx('btn-info')}>
                                <Button className={cx('btn-mess')} onClick = {()=> handleInviteMember()}>Mời</Button>
                            </div> 
                        </div>)
                    }
                    <div className={cx('footer')}>
                        <Button  onClick={()=>{modaladd(false)}}>Hủy</Button>
                        <Button onClick={() => {
                            handleInfor();
                            sethienthi(true);
                            }}>Tìm kiếm</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default showChat;
