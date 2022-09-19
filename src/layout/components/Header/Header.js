import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
//icon

import { VscAccount } from 'react-icons/vsc';
//component
import { ConfigRouter } from '~/config';
import images from '~/asset/images';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>Logo</div>
            <div className={cx('control')}>Content</div>
        </div>
    );
}

export default Header;
