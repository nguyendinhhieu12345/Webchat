import classNames from 'classnames/bind';
import styles from './HeaderChat.module.scss';
import Button from '../Button';
import { useRef, useEffect,useState } from 'react';
import {useNavigate  } from 'react-router-dom'
//icon
import { FaSearch, FaCaretDown } from 'react-icons/fa';
//
import { auth } from '~/LoginWith/config';
import { AuthContext } from '~/Context/AuthProvider';
import { useContext } from 'react';
const cx = classNames.bind(styles);

function Header() {
    const choose = useRef();
    const handleInfor = () => {
        if (choose.current.style.display === 'block') {
            choose.current.style.display = 'none';
        } else {
            choose.current.style.display = 'block';
        }
    };
    const {
        user: { displayName, photoURL,uid, email, phone  },
    } = useContext(AuthContext);
    let navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem("user")
        auth.signOut();
        navigate('/');
    };
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/');
        }
    }, [uid,navigate]);
    
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <div className={cx('logo')}></div>
                <div className={cx('search-box')}>
                    <input className={cx('search-input')} placeholder="Tìm kiếm" name="timkiem" />
                    <button className={cx('btn-search')}>
                        <FaSearch className={cx('search-icon')} />
                    </button>
                </div>
                <div className={cx('account')}>
                    <div className={cx('img')}>
                        <img src={JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))[1] : photoURL}></img>
                    </div>
                    <div className={cx('username')} onClick={handleInfor}>
                        <FaCaretDown />
                        <div className={cx('infor-username')} ref={choose}>
                            <ul className={cx('option')}>
                                <li>
                                    <h2 className={cx('name')}>{JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))[0] : displayName}</h2>
                                </li>
                                <li>
                                    <button className={cx('item-option')} onClick={toggleModal}>
                                        Hồ sơ của bạn
                                    </button>
                                </li>
                                <li>
                                    <Button className={cx('item-option')}>Cài đặt</Button>
                                </li>
                                <li>
                                    <Button
                                        className={cx('item-option')}
                                        onClick={handlelogout}
                                    >
                                        Đăng Xuất
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {
                    modal ? (<div className={cx("model")}>
                                <div className={cx("model-inner")}>
                                    <div className={cx("headerInf")}>
                                        <p>Thông tin tài khoản</p>
                                    </div>
                                    <div className={cx("body")}>
                                        <div className={cx('imgProf')}>
                                            <img src={JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))[1] : photoURL}></img>
                                        </div>
                                        <h2>{JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))[0] : displayName}</h2>
                                        <h4>Thông tin cá nhân</h4>
                                        <p>Tên: {JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))[0] : displayName}</p>
                                        <p>Liên hệ: { JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user"))[3] : email ?? phone}</p>
                                    </div>
                                    <div className={cx("footer")}>
                                        <button onClick={toggleModal}>Close</button>
                                    </div>
                                </div>
                            </div>):""
                }
            </header>
        </div>
    );
}

export default Header;
