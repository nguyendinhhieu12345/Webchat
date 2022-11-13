import classNames from 'classnames/bind';
import styles from './InviteMember.module.scss';
import { AuthContext } from '~/Context/AuthProvider';
import react, { useState } from 'react';
import {  FaWindowClose } from 'react-icons/fa';
import { Button } from 'antd';
import getSearchFriend from '~/hooks/getSearchFriend';
import { AppContext } from '~/Context/AppProvider';
import {addGroup} from '~/Context/service';

const cx = classNames.bind(styles);
function ModalInviteMember({modaladd}) {
    const {
        selectedRoomId,
        members,
        isOpenFormInvite, 
        setIsOpenFormInvite,
    
    } = react.useContext(AppContext);
    const {
        user: {  uid },
    } = react.useContext(AuthContext);
   
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
            setdata('')
            dk = inputSdt2.current.value;
            const kt = datas.find(data =>{return (data.phone === dk)});
            if(dk !== '' && kt !== undefined)
            {
                setdata(kt);
            }
            
        }
        if(tab === 2)
        {
            setdata('')
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
            btnSdt.current.style.backgroundColor = 'rgba(0,0,0,0.1)';
            btnEmail.current.style.backgroundColor = 'rgba(0,0,0,0.1)';
            inputSdt.current.style.display = 'none';
            inputEmail.current.style.display = 'none';
            inputEmail2.current.value = '';
            inputSdt2.current.value = '';

        }
        if(tab === 1)
        {
            btnSdt.current.style.backgroundColor = ' rgb(236, 152, 154)';
            btnEmail.current.style.backgroundColor = 'rgba(0,0,0,0.1)';
            inputSdt.current.style.display = 'flex';
            inputEmail.current.style.display = 'none';
            inputEmail2.current.value = '';
        }
        if(tab === 2)
        {
            btnSdt.current.style.backgroundColor = 'rgba(0,0,0,0.1)';
            btnEmail.current.style.backgroundColor = 'rgb(236, 152, 154)';
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
        addGroup(data.uid,selectedRoomId)
   
    }

    const handleOpenInviteModal = () => 
    {
        setIsOpenFormInvite('none')
    }
    return (
        <div className={cx('modal-container')}>
            <div className={cx('form-add-friend')}>
                <form className={cx('form-friend')}>
                    <div className={cx('header')}>
                        <h2>Mời bạn</h2>
                        <div className={cx('close')} >
                            <FaWindowClose className={cx('icon-close')} onClick= {handleOpenInviteModal}/>
                        </div>
                    </div>
                    <div className={cx('search')}>
                       <h2>Tìm theo</h2>
                       <div className={cx('btn-search')}>
                            <Button className={cx('search-phone')} ref={btnSdt} onClick={()=> {
                                setTab(1);
                                sethienthi(false);
                            }}>Phone</Button>
                            <Button className={cx('search-email')} ref={btnEmail} onClick={()=> 
                            {
                                setTab(2);
                                sethienthi(false);
                            }}>Email</Button>
                       </div>
                       <div className={cx('input-number')} ref={inputSdt}>
                            <input placeholder='Nhập số điện thoại' ref={inputSdt2}/>
                            <FaWindowClose onClick={() => {
                            setTab(0);
                            sethienthi(false);
                            }
                            }/>
                       </div>
                       <div className={cx('input-email')} ref={inputEmail}>
                            <input placeholder='Nhập email' ref={inputEmail2}/>
                            <FaWindowClose  onClick={() => {
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
                        <Button  onClick={()=>{
                            handleOpenInviteModal()
                        }
                            }>Hủy</Button>
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
export default ModalInviteMember;
