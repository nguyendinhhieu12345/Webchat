import classNames from 'classnames/bind';
import styles from './messChat.module.scss';
import images from '~/asset/images';
import { FaUserPlus, FaSearch, FaVideo, FaBars, FaPaperPlane } from 'react-icons/fa';
import { forwardRef } from 'react';
const cx = classNames.bind(styles);

function messChat(props, ref) {
    const handleSetting = () => {
        document.getElementsByClassName(`${cx('wrapper')}`)[0].style.width = '80%';
    };
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header-chat')}>
                <div className={cx('img')}>
                    <img src={images.connect}></img>
                </div>
                <div className={cx('infor-chat')}>
                    <h2>Tấn Khoa</h2>
                    <p>Hoạt động</p>
                </div>
                <div className={cx('option')}>
                    <FaUserPlus className={cx('icon-option')} />
                    <FaSearch className={cx('icon-option')} />
                    <FaVideo className={cx('icon-option')} />
                    <button className={cx('btnSetting')} ref={ref} onClick={props.onClick}>
                        <FaBars className={cx('icon-option')} onClick={handleSetting} />
                    </button>
                </div>
            </header>
            <section className={cx('content-chat')}>
                <input className={cx('input-chat')} placeholder="Nhập nội dung tin nhắn" name="content" />
                <FaPaperPlane className={cx('send')} />
            </section>
        </div>
    );
}

export default forwardRef(messChat);
