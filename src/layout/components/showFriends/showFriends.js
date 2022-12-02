import classNames from 'classnames/bind';
import styles from './showFriends.module.scss';
import getFriends from '~/hooks/getFriends';
import { AuthContext } from '~/Context/AuthProvider';
import { AppContext } from '~/Context/AppProvider';
import react from 'react';
import { FaSearch, FaUserPlus, FaWindowClose } from 'react-icons/fa';

const cx = classNames.bind(styles);
function showChat({ modaladd }) {
    const [tab, setTab] = react.useState(0);
    const [datasearch, setdatasearch] = react.useState([]);
    const buttonaddfr = react.useRef();
    const inputsearch = react.useRef();
    const inputtext = react.useRef();
    const resettext = react.useRef();
    const [listFriends, setlistFriends] = react.useState([]);

    const Resetinput = () => {
        inputtext.current.value = '';
        setTab1(0);
    };
    const {
        user: {  uid },
    } = react.useContext(AuthContext);
    //
    const {  FriendsList } = react.useContext(AppContext);
    const userfrs = getFriends(uid);
    react.useEffect(() => {
        setlistFriends(FriendsList);
    }, [FriendsList]);
    console.log(listFriends);

    const [tab1, setTab1] = react.useState();

    react.useEffect(() => {
        if (tab1 === 0) {
            resettext.current.style.display = 'none';
        }
        if (tab1 === 1) {
            resettext.current.style.display = 'flex';
        }
    }, [tab1]);

    function handleClose() {
        if (inputtext.current.value == '') {
            setTab1(0);
        } else {
            setTab1(1);
        }
    }
    function handleClose() {
        if (inputtext.current.value === '') {
            setdatasearch([]);
            setTab1(0);
            setTab(0);
        } else {
            setTab(1);
            setdatasearch(
                FriendsList.filter((doc) => {
                    const textip = doc.name.toLowerCase();
                    const textip2 = inputtext.current.value.toLowerCase();
                    if (textip.includes(textip2)) {
                        return doc;
                    }
                }),
            );
            setTab1(1);
        }
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('option')}>
                <div className={cx('search-friend')} ref={inputsearch}>
                    <FaSearch className={cx('icon-search')} />
                    <input
                        className={cx('input-search-friend')}
                        ref={inputtext}
                        onChange={() => {
                            handleClose();
                        }}
                    />
                    <div className={cx('btn-close')} ref={resettext}>
                        <FaWindowClose className={cx('icon-close')} onClick={Resetinput} />
                    </div>
                </div>
                <div
                    className={cx('add-friend')}
                    ref={buttonaddfr}
                    onClick={() => {
                        modaladd(true);
                    }}
                >
                    <FaUserPlus className={cx('icon-add-friend')} />
                </div>
            </div>
            <div className={cx('amount-friend')}>
                <span>Bạn bè({userfrs.length})</span>
            </div>
            {(tab === 1 ? datasearch : listFriends).map((userfr) => (
                <div key={userfr.id} className={cx('infor-chat')}>
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
