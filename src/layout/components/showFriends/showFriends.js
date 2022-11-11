import classNames from 'classnames/bind';
import styles from './showFriends.module.scss';
import getFriends from '~/hooks/getFriends';
import { AuthContext } from '~/Context/AuthProvider';
import react from 'react';
import { FaSearch,FaAddressBook, FaUserPlus } from 'react-icons/fa';
import { Button } from 'antd';
const cx = classNames.bind(styles);
function showChat({modaladd}) {
    const [tab, setTab] = react.useState(0);
    const buttonaddfr = react.useRef();
    const buttonsearch = react.useRef();
    const inputsearch = react.useRef();
    const closesearch = react.useRef();
    const inputtext = react.useRef();
    const resettext = react.useRef();
    /*const tonggle = () => {
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
    }, [tab]);*/
  
    const Resetinput = () => {
        inputtext.current.value = '';
        setTab1(0);
    }
  
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
                <div className={cx('search-friend')} ref ={inputsearch}>
                    <FaSearch className={cx('icon-search')}/>
                    <input className={cx('input-search-friend')} ref={inputtext} />
                </div>
                <div className={cx('add-friend')} ref={buttonaddfr} onClick={()=>{modaladd(true)}}>
                    <FaUserPlus className={cx('icon-add-friend')}/>
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
