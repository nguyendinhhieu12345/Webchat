import classNames from 'classnames/bind';
import styles from './Home.module.scss';
//icon
import { BsCheck2Circle } from 'react-icons/bs';
//component
import images from '~/asset/images';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <h1>Home</h1>
        </div>
    );
}

export default Home;
