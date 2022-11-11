import classNames from 'classnames/bind';
import styles from './Modaladdfr.module.scss';
import { AuthContext } from '~/Context/AuthProvider';
import react from 'react';
import {  FaWindowClose } from 'react-icons/fa';
import { Button } from 'antd';
import getSearchFriend from '~/hooks/getSearchFriend';
import getFriends from '~/hooks/getFriends';
import listAddFriend from '~/hooks/listAddFriend';
import listAddFriendAll from '~/hooks/listAddFriendAll';
import { addListAddFriend, updateFriend ,updateListAddFriend,deleteFriend} from '~/Context/service';
let dem = 0;

const cx = classNames.bind(styles);
function Modaladdfr({modaladd}) {
    const {
        user: { photoURL, uid },
    } = react.useContext(AuthContext);
    const [tabFriend,setTabFriend] = react.useState(0);
    const [hienthi,sethienthi] = react.useState(false);
    // const [addfr,setaddfr] = react.useState('');
    const listfriend = getFriends(uid);
    const datalistaddfriend = listAddFriendAll();
    const listaddfriend = listAddFriend(uid);
    const [tab,setTab] = react.useState(0);
    const btnSdt = react.useRef();
    const btnEmail = react.useRef();
    const inputSdt = react.useRef();
    const inputEmail = react.useRef();
    const inputSdt2 = react.useRef();
    const inputEmail2 = react.useRef();
    // getSearchFriend();
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
    const setdatainfo = () => {
        setTabFriend(0);
        for(let item of datalistaddfriend)
        {
            if(item.uid === data.uid)
            {
                for(let jtem of item.listaddfriend)
                {
                    if(uid === jtem)
                    {
                        setTabFriend(3);
                    }
                }
            }
        }
        for(let i of listfriend)
        {
            
            if(data.uid === i.uid)
            {
                setTabFriend(1)
            }else
            {
                for(let j of listaddfriend)
                {
                    
                    if(data.uid === j.uid)
                    {
                        setTabFriend(2)        
                    }
                } 
            }
        }
    }
    react.useEffect(() => {
        setdatainfo();
    },[data])
    const handleWithInfo = () => {
        // addListAddFriend(data.uid,uid);
        if(tabFriend === 0)
        {
            addListAddFriend(data.uid,uid);
            setTabFriend(3);
        }
        if(tabFriend === 1)
        {
            deleteFriend(uid,data.uid);
            setTabFriend(0);
        }
        if(tabFriend === 2)
        {
            updateFriend(uid,data.uid);
            setTabFriend(1);
        }
        if(tabFriend === 3)
        {
            updateListAddFriend(data.uid,uid);
            setTabFriend(0);
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
            btnSdt.current.style.backgroundColor = 'rgba(0,0,0,0.1)';
            btnEmail.current.style.backgroundColor = 'white';
            inputSdt.current.style.display = 'flex';
            inputEmail.current.style.display = 'none';
            inputEmail2.current.value = '';
        }
        if(tab === 2)
        {
            btnSdt.current.style.backgroundColor = 'white';
            btnEmail.current.style.backgroundColor = 'rgba(0,0,0,0.1)';
            inputSdt.current.style.display = 'none';
            inputEmail.current.style.display = 'flex';
            inputSdt2.current.value = '';
        }
    }
    react.useEffect(() => {
        tonggle();
    },[tab])
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
                            <input placeholder='Nhập số điện thoại' ref={inputSdt2}/>
                            <FaWindowClose onClick={() => {
                            setTab(0);
                            sethienthi(false);
                            }
                            }/>
                       </div>
                       <div className={cx('input-email')} ref={inputEmail}>
                            <input placeholder='Nhập email' ref={inputEmail2}/>
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
                                <Button className={cx('btn-mess')}>Nhắn Tin</Button>
                                <Button className={cx('btn-add')} onClick={()=>{handleWithInfo()}}>{tabFriend === 0 ? 'Kết bạn' : tabFriend === 1 ? 'Bạn bè' : tabFriend === 2 ? 'Chấp Nhận' : tabFriend === 3 ? 'Hủy' : ''}</Button>
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
export default Modaladdfr;
