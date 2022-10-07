import classNames from 'classnames/bind';
import styles from './showChat.module.scss';
import images from '~/asset/images';

const cx = classNames.bind(styles);
const time = '5 giờ';
function showChat() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('option')}></div>
            <div className={cx('infor-chat')}>
                <div className={cx('img')}>
                    <img src={images.connect}></img>
                </div>
                <div className={cx('gui-chat')}>
                    <h2>Tấn Khoa</h2>
                    <p>Bạn: xin chào mọi người</p>
                </div>
                <div className={cx('time')}>
                    <p>{time}</p>
                </div>
            </div>
            <div className={cx('infor-chat')}>
                <div className={cx('img')}>
                    <img src={images.connect}></img>
                </div>
                <div className={cx('gui-chat')}>
                    <h2>Tấn Khoa</h2>
                    <p>Bạn: xin chào mọi người</p>
                </div>
                <div className={cx('time')}>
                    <p>{time}</p>
                </div>
            </div>
            <div className={cx('infor-chat')}>
                <div className={cx('img')}>
                    <img src={images.connect}></img>
                </div>
                <div className={cx('gui-chat')}>
                    <h2>Tấn Khoa</h2>
                    <p>Bạn: xin chào mọi người</p>
                </div>
                <div className={cx('time')}>
                    <p>{time}</p>
                </div>
            </div>
            <div className={cx('infor-chat')}>
                <div className={cx('img')}>
                    <img src={images.connect}></img>
                </div>
                <div className={cx('gui-chat')}>
                    <h2>Tấn Khoa</h2>
                    <p>Bạn: xin chào mọi người</p>
                </div>
                <div className={cx('time')}>
                    <p>{time}</p>
                </div>
            </div>
        </div>
    );
}

export default showChat;
