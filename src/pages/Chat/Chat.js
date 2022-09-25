import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import Button from '~/layout/components/Button';

//icon
import { FaSearch, FaCaretDown, FaCommentDots, FaUser, FaUsers } from 'react-icons/fa';
//component
import images from '~/asset/images';
import { ConfigRouter } from '~/config';
import HeaderChat from '~/layout/components/HeaderChat';
import { useState, useRef } from 'react';
const cx = classNames.bind(styles);
function Home() {
    const [tab, setTab] = useState(0);
    const chat = useRef();
    const friend = useRef();
    const group = useRef();
    const tonggle = (index) => {
        console.log('tab trc set', tab);
        setTab(index);
        console.log('tab sau set', tab);
        if (tab === 0) {
            chat.current.style.display === 'none'
                ? (chat.current.style.display = 'block')
                : (chat.current.style.display = 'none');
            friend.current.style.display = 'none';
            group.current.style.display = 'none';
            console.log('succ');
        }
        if (tab === 1) {
            friend.current.style.display === 'none'
                ? (friend.current.style.display = 'block')
                : (friend.current.style.display = 'none');
            group.current.style.display = 'none';
            chat.current.style.display = 'none';
        }
        if (tab === 2) {
            group.current.style.display === 'none'
                ? (group.current.style.display = 'block')
                : (group.current.style.display = 'none');
            chat.current.style.display = 'none';
            friend.current.style.display = 'none';
        }
    };
    return (
        <div className={cx('wrapper')}>
            <HeaderChat />
            <div className={cx('content')}>
                <div className={cx('content-left')}>
                    <ul className={cx('option')}>
                        <li>
                            <FaCommentDots className={cx('icon-option')} onClick={() => tonggle(0)} />
                        </li>
                        <li>
                            <FaUser className={cx('icon-option')} onClick={() => tonggle(1)} />
                        </li>
                        <li>
                            <FaUsers className={cx('icon-option')} onClick={() => tonggle(2)} />
                        </li>
                    </ul>
                </div>
                <div className={cx('content-right')}>
                    <div className={tab === 0 ? cx('active') : cx('tab-content')} ref={chat}>
                        <h1>chat</h1>
                    </div>
                    <div className={tab === 1 ? cx('active') : cx('tab-content')} ref={friend}>
                        <h1>friend</h1>
                    </div>
                    <div className={tab === 2 ? cx('active') : cx('tab-content')} ref={group}>
                        <h1>Group</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
