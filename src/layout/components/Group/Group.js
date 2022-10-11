import classNames from 'classnames/bind';
import styles from './Group.module.scss';
import images from '~/asset/images';
import { FaUserPlus } from 'react-icons/fa';
import Button from '../Button';
const cx = classNames.bind(styles);
const time = '5 giờ';
function showChat() {
    return (
        <div className={cx('wrapper')}>
            <header className={cx('listfriend')}>
                <FaUserPlus className={cx('icon-friends')} />
                <h1>Danh sách nhóm</h1>
            </header>
            <div className={cx('friends')}>
                <h2 className={cx('title-listfriend')}>Danh sách nhóm</h2>
                <div className={cx('friendslist')}>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Khoa cntt</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>bạn bè</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                    <div className={cx('friend')}>
                        <div className={cx('img_list', 'img')}>
                            <img src={images.connect}></img>
                        </div>
                        <div className={cx('infor-list')}>
                            <h2>Tấn Khoa</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default showChat;
