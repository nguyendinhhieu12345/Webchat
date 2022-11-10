import classNames from 'classnames/bind';
import styles from './showFriends.module.scss';
import images from '~/asset/images';
import FirestoreUse from '~/hooks/useFirestore';
import getFriends from '~/hooks/getFriends';
import { AuthContext } from '~/Context/AuthProvider';
import react, { useEffect, useState } from 'react';
import { AppContext } from '~/Context/AppProvider';
import { FaSearch,FaAddressBook,FaWindowClose } from 'react-icons/fa';
import { readFriends } from '~/Context/service';
import { db } from '~/LoginWith/config';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from 'antd';


const cx = classNames.bind(styles);
function showChat({modaladd}) {
    // console.log("ok")
    //
    // const friends = collection(db, 'friend')
    // getDocs(friends)
    // .then(res => {
    //     const movs = res.docs.map(doc => ({
    //         friend: doc.data().friends,
    //         data: doc.data(),
    //         id: doc.id,
    //     }))
    //     for(let i of movs)
    //     {
    //         for(let j of i.friend)
    //         {
    //             console.log(j)
    //         }
    //     }
    // })
    // .catch(err => err)
    const [tab, setTab] = react.useState(0);
    const buttonaddfr = react.useRef();
    const buttonsearch = react.useRef();
    const inputsearch = react.useRef();
    const closesearch = react.useRef();
    const inputtext = react.useRef();
    const resettext = react.useRef();
    const tonggle = () => {
        if (tab === 0) {
            buttonaddfr.current.style.display = 'flex';
            buttonsearch.current.style.display = 'flex';
            inputsearch.current.style.display = 'none';
            closesearch.current.style.display = 'none';
        }
        if (tab === 1) {
            buttonaddfr.current.style.display = 'none';
            buttonsearch.current.style.display = 'none';
            inputsearch.current.style.display = 'flex';
            closesearch.current.style.display = 'flex';
        }
    };
    react.useEffect(() => {
        tonggle();
    }, [tab]);
  

    // const [tab2,settab2] = react.useState(0)
    // const tonggle2 = () => {
    //     if (tab === 0) {  
    //         resettext.current.style.display = 'none';
    //     }
    //     else{
            
    //         resettext.current.style.display = 'block';
    //     }
    // };
    
  
    const Resetinput = () => {
        inputtext.current.value = '';
        setTab1(0);
    }
    // const Closetext = () => {
    //    if(inputtext.current.value == '')
    //    {
    //     settab2(1);
    //     console.log('ok')
    //    }else
    //    {
    //     settab2(0);
    //    }
    // }
    // react.useEffect(() => {
    //     tonggle2();
    // }, [tab2]);

  
    const {
        user: { photoURL, uid },
    } = react.useContext(AuthContext);
    const userfrs = getFriends(uid);
    
    const [tab1,setTab1] = react.useState();
    react.useEffect(()=>{
        if(tab1 === 0)
        {
            console.log('la so 0')
            resettext.current.style.display = 'none';
        }
        if(tab1 === 1)
        {
            console.log('la so 1');
            resettext.current.style.display = 'flex';
        }
    },[tab1])

    function handleClose(){
        if(inputtext.current.value == '')
        {
            setTab1(0);
           
        }else
        {
            setTab1(1);
        

        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('option')}>
                <div className={cx('add-friend')} ref={buttonaddfr} onClick={()=>{modaladd(true)}}>
                    <span>+</span>
                    <FaAddressBook className={cx('icon-add-friend')}/>
                    <span>Thêm Bạn</span>
                </div>
                <div className={cx('search-friend-icon')} ref ={buttonsearch} onClick={() => setTab(1)}>

                    <FaSearch className={cx('icon-search')}/>
                    <span>Tìm Kiếm</span>
                </div>
                    <div className={cx('search-friend')} ref ={inputsearch}>
                        <FaSearch className={cx('icon-search')}/>
                        <input className={cx('input-search-friend')} ref={inputtext} onChange ={()=> {
                            handleClose();
                        }}/>
                        <div className={cx('btn-close')}  ref={resettext}>
                            <FaWindowClose className={cx('icon-close')} onClick={Resetinput}/>
                        </div>
                
                    </div>
                    <div className={cx('search-close')} ref ={closesearch} onClick={() => setTab(0)}>
                        <Button>Đóng</Button>
                    </div>
            </div>
            <div className={cx('amount-friend')}>   
                <span>Bạn bè({userfrs.length})</span>
            </div>
            {userfrs.map((userfr) => (
                <div
                    key={userfr.id}
                    className={cx('infor-chat')}
                    
                >
                    <div className={cx('img')}>
                        <img src={userfr.img}></img>
                    </div>
                    <div className={cx('gui-chat')}>
                        <h2>{userfr.name}</h2>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}
export default showChat;
