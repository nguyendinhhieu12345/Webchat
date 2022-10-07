import classNames from 'classnames/bind';
import styles from './settingChat.module.scss';
import images from '~/asset/images';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

function settingChat(props, ref) {
    return (
        <div className={cx('wrapper')} ref={ref}>
            <header className={cx('header')}>
                <h2>Thông tin hội thoại</h2>
            </header>
            <div className={cx('user')}>
                <div className={cx('img')}>
                    <img src={images.connect}></img>
                </div>
                <div className={cx('infor-chat')}>
                    <h2>Tấn Khoa</h2>
                </div>
            </div>
        </div>
    );
}

export default forwardRef(settingChat);
