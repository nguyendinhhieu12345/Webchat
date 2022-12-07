import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { ConfigRouter } from '~/config';
import Button from '~/layout/components/Button';
import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';
import react, {  useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//
import { AuthContext } from '~/Context/AuthProvider';

import { addDocument } from '~/Context/service';

import firebase, { auth, db } from '~/LoginWith/config';
import { getDocs } from 'firebase/firestore';
//component
import images from '~/asset/images';

const cx = classNames.bind(styles);
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
function Login() {
    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
            });
    
            addDocument('friend',{
                id: user.uid,
                friends: [],
            });
            addDocument('addfriend',{
                id: user.uid,
                listaddfriend: [],
            });
        }
    };
    //
    const { user, setUser } = react.useContext(AuthContext);
    const history = useNavigate();
    const [phoneInput, setPhoneInput] = useState();
    const [passwordInput, setPasswordInput] = useState();
    const [userlocal, setUserlocal] = useState(()=>{
        const storageUser=JSON.parse(localStorage.getItem('user'))
        return storageUser
    });
    const handleBtnLogin = () => {
        if(phoneInput === undefined || passwordInput === undefined)
        {
            alert("Hãy nhập đầy đủ số điện thoại và mật khẩu!!!")
        }
        else{
            let loginUser = db.collection('users');
            loginUser.where('phone', '==', phoneInput);
            loginUser = loginUser.where('password', '==', passwordInput);
            getDocs(loginUser)
                .then((snapshot) => {
                        const {displayName,photoURL,uid, phone}=snapshot.docs[0].data()
                        const userLogin=[displayName,photoURL,uid, phone]
                        const jsonUser=JSON.stringify(userLogin)
                        localStorage.setItem("user", jsonUser);
                        setUser(snapshot.docs[0]?.data())
                })
                .catch((error) => {
                    alert("Số điện thoại hoặc mật khẩu không chính xác!!!")
                });
        }
    };
    useEffect(() => {
        if (localStorage.getItem('user')) {
            history(ConfigRouter.Chat);
        }
    }, [user,history,userlocal]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img-login')}>
                <img src={images.connect}></img>
            </div>
            <div className={cx('wrap-form-login')}>
                <div className={cx('form-login')}>
                    <h1>Đăng nhập</h1>
                    <form className={cx('form')}>
                        <FaUser />
                        <input
                            placeholder="Số điện thoại"
                            name="phone"
                            className={cx('phone')}
                            onChange={(e) => setPhoneInput(e.target.value)}
                        />
                        <br></br>
                        <FaLock />
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            name="pass"
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className={cx('pass')}
                        />
                    </form>
                    <div className={cx('form-item')}>
                        <div>
                            <input type="checkbox" name="rem-login" />
                            <span> Nhớ mật khẩu</span>
                        </div>
                    </div>
                    <Button className={cx('btn-login')} onClick={handleBtnLogin}>
                        Đăng nhập
                    </Button>
                    <div className={cx('social-login-label')}>
                        <div className={cx('label-or')}>
                            <div className={cx('line-left')}></div>
                            <span className={cx('label-text')}>Đăng nhập với</span>
                            <div className={cx('line-right')}></div>
                        </div>
                        <div className={cx('icon-login')}>
                            <Button className={cx('face')} onClick={() => handleLogin(fbProvider)}>
                                <FaFacebook />
                            </Button>
                            <Button className={cx('goog')} onClick={() => handleLogin(googleProvider)}>
                                <FaGoogle />
                            </Button>
                        </div>
                    </div>
                    <div className={cx('con-signup')}>
                        <span>Nếu chưa có tài khoản?</span>
                        <a href="http://localhost:3000/signup" className={cx('signup')}>
                            Đăng ký
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
