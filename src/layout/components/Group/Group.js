import classNames from 'classnames/bind';
import styles from './Group.module.scss';
import images from '~/asset/images';
import styled from 'styled-components';
import { Collapse, Typography, Button } from 'antd';
import { AppContext } from '~/Context/AppProvider';
import { AuthContext } from '~/Context/AuthProvider';
import { addDocument } from '~/Context/service';
import { Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '~/LoginWith/config';
import { HiArchiveBoxXMark } from 'react-icons/hi2';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BsFillPlusSquareFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: black;
`;

export default function Group() {
    const { rooms, setSelectedRoomId, selectedRoomId,members } = React.useContext(AppContext);

    const [form] = Form.useForm();

    const {
        user: { uid },
    } = useContext(AuthContext);

    const showModal = () => {
        document.getElementsByClassName('test')[0].style.display = 'block';

        document.getElementsByClassName('form-group')[0].style.display = 'none';
    };

    const handleOk = () => {
        document.getElementsByClassName('test')[0].style.display = 'none';
        document.getElementsByClassName('form-group')[0].style.display = 'block';
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
        form.resetFields();
    };

    const handleCancel = () => {
        document.getElementsByClassName('test')[0].style.display = 'none';
        document.getElementsByClassName('form-group')[0].style.display = 'block';
    };

    const DelRoom = () => {
        console.log(selectedRoomId);
        if (selectedRoomId === '') {
            alert('Bạn chưa chọn phòng');
        } else {
            document.getElementsByClassName('perform-del')[0].style.display = 'block';
            document.getElementsByClassName('form-group')[0].style.display = 'none';
        }
    };

    const handlePerformCancel = () => {
        document.getElementsByClassName('perform-del')[0].style.display = 'none';
        document.getElementsByClassName('form-group')[0].style.display = 'block';
    };

    const handlePerformOK = () => {
        document.getElementsByClassName('perform-del')[0].style.display = 'block';
        document.getElementsByClassName('form-group')[0].style.display = 'block';
        const array = []
        {members.map((member, index) => (
            array.push(member.uid)
        ))}
        if (array[0] == uid)
        {
        deleteDoc(doc(db, 'rooms', selectedRoomId));
        alert('Xóa thành công');
        }
        else
        {
            alert('Không thể xóa phòng');
        }
        document.getElementsByClassName('perform-del')[0].style.display = 'none';
    };

    const [roomName, setRoomName] = useState('');

    return (
        <div className={cx('all-group')}>
            <Collapse>
                <Button type="text" className={cx('add-room')} onClick={showModal}>
                    <div className={cx('btn-add')}>
                        <BsFillPlusSquareFill className={cx('icon-add')} icon={faCheckSquare} />
                        Thêm phòng
                    </div>
                </Button>

                <Button type="text" className={cx('del-room')} onClick={DelRoom}>
                    <div className={cx('btn-add')}>
                        <AiFillCloseSquare className={cx('icon-2')} icon={faCheckSquare} />
                        Xóa phòng
                    </div>
                </Button>

                <div className={cx('list-name')}>Danh sách các phòng</div>
                <div className={cx('list-name')}>Tất cả: {rooms.length} nhóm</div>
            </Collapse>
            <Form className={cx('form-group')} style={{ display: 'block' }}>
                <div className={cx('row')}>
                    {rooms.map((room) => (
                        <div className={cx('col-1-5')} key={room.id}>
                            <div className={cx('evr-group')}>
                                <LinkStyled
                                    className={cx('item-group-around')}
                                    key={room.id}
                                    onClick={() => {
                                        setSelectedRoomId(room.id);
                                        setRoomName(room.name);
                                    }}
                                >
                                    <img className={cx('img')} src={images.connect}></img>
                                    <div className={cx('group-name')}> {room.name}</div>
                                </LinkStyled>
                            </div>
                        </div>
                    ))}
                </div>
            </Form>
            <Form form={form} layout="vertical" className="test" style={{ display: 'none' }}>
                <div className={cx('add-group')}>
                    <div className={cx('name-add-group')}>
                        <p>Thêm nhóm</p>
                    </div>

                    <Form.Item className={cx('add-name')} label="Tên phòng" name="name">
                        <Input className={cx('add-input-name')} placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item className={cx('add-des')} label="Mô tả" name="description">
                        <Input.TextArea className={cx('add-input-des')} placeholder="Nhập mô tả" />
                    </Form.Item>
                    <div className={cx('btn-add-handle')}>
                    <button className={cx('btn-add-ok')} onClick={handleOk}>
                        Xác nhận
                    </button>
                    <button className={cx('btn-add-cancel')} onClick={handleCancel}>
                        Cancel
                    </button>
                    </div>
                </div>
            </Form>

            <Form form={form} layout="vertical" className="perform-del" style={{ display: 'none' }}>
                <div className={cx('perform-del-div')}>
                    <HiArchiveBoxXMark className={cx('perform-del-icon')} />
                    <p>Xóa phòng</p>
                    <h2>Bạn có chắc xóa phòng: </h2>
                    <h2 className={cx('perform-del-h2')}>{roomName}</h2>
                    <div className={cx('perform-del-handle')}>
                        <button onClick={handlePerformOK} className={cx('perform-del-ok')}>
                            Có
                        </button>
                        <button onClick={handlePerformCancel} className={cx('perform-del-cancel')}>
                            Không
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
