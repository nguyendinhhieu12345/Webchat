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
import ModalInviteMember from '~/layout/components/Modaladdfr/ModalInviteMember';

const cx = classNames.bind(styles);

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: black;
`;

export default function Group() {
    const [giatri2,setGiatri2] = useState('')

    const [listgroup, setListgroup] = React.useState([]);

    const [demGiatri,setDemGiatri] = useState(0)
    const { rooms, setSelectedRoomId, selectedRoomId,members, setIsOpenFormInvite, isOpenFormInvite } = React.useContext(AppContext);

    const [form] = Form.useForm();

    const {
        user: { uid },
    } = useContext(AuthContext);

    const showModal = () => {
        document.getElementsByClassName('test')[0].style.display = 'block';

        document.getElementsByClassName('form-group')[0].style.display = 'none';
    };

    let dem = 0;

    const handleOk = () => {
        document.getElementsByClassName('test')[0].style.display = 'none';
        document.getElementsByClassName('form-group')[0].style.display = 'block';
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });
        form.resetFields();
            
        };

        rooms.map((room) => 
        {
            if (room.name === giatri2)
            {
                setSelectedRoomId(room.id)
                dem = (room.members).length

                while(room.name != "" && dem < 3)
                {
                    setIsOpenFormInvite(true)
                    dem = dem + 1;
                }
        
                if (demGiatri >= 3)
                {
                    setIsOpenFormInvite(false)
                }
        
            }
        })

    const handleCancel = () => {
        document.getElementsByClassName('test')[0].style.display = 'none';
        document.getElementsByClassName('form-group')[0].style.display = 'block';
    };

    const DelRoom = () => {
        if (selectedRoomId === '') {
            alert('B???n ch??a ch???n ph??ng');
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

        console.log({array})

        if (array[0] == uid)
        {
        deleteDoc(doc(db, 'rooms', selectedRoomId));
        alert('X??a th??nh c??ng');
        }
        else
        {
            alert('Kh??ng th??? x??a ph??ng');
        }
        document.getElementsByClassName('perform-del')[0].style.display = 'none';
    };
    const [roomName, setRoomName] = useState('');

    React.useEffect(() => {
        let tmp = [];
        rooms.forEach((room) => {
            if (room.members.length !== 2 && room.name !== '') {
                    tmp.push(room);
            }
        });
        setListgroup([...tmp]);
    }, [rooms]);

    return (
        <div className={cx('all-group')}>
            <Collapse>
                <Button type="text" className={cx('add-room')} onClick={showModal}>
                    <div className={cx('btn-add')}>
                        <BsFillPlusSquareFill className={cx('icon-add')} icon={faCheckSquare} />
                        Th??m ph??ng
                    </div>
                </Button>

                <Button type="text" className={cx('del-room')} onClick={DelRoom}>
                    <div className={cx('btn-add')}>
                        <AiFillCloseSquare className={cx('icon-2')} icon={faCheckSquare} />
                        X??a ph??ng
                    </div>
                </Button>

                <div className={cx('list-name')}>Danh s??ch c??c ph??ng</div>
                <div className={cx('list-name')}>T???t c???: {listgroup.length} nh??m</div>
            </Collapse>
            <Form className={cx('form-group')} style={{ display: 'block' }}>
                <div className={cx('row')}>
                    {listgroup.map((room) => (
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
                        <p>Th??m nh??m</p>
                    </div>

                    <Form.Item className={cx('add-name')} label="T??n ph??ng" name="name">
                        <Input id={cx('add-input-name')}  className={cx('add-input-name')} placeholder="Nh???p t??n ph??ng" onChange={(e) => setGiatri2(e.target.value)}/>
                    </Form.Item>
                    <Form.Item className={cx('add-des')} label="M?? t???" name="description">
                        <Input.TextArea className={cx('add-input-des')} placeholder="Nh???p m?? t???" />
                    </Form.Item>
                    <div className={cx('btn-add-handle')}>
                    <button className={cx('btn-add-ok')} onClick={handleOk}>
                        X??c nh???n
                    </button>
                    <button className={cx('btn-add-cancel')} onClick={handleCancel}>
                        Cancel
                    </button>
                    </div>
                </div>
            </Form>

            <Form
                layout="vertical"
                className="open-des-form"
                style={{ display: isOpenFormInvite }}
                >
                <ModalInviteMember/>
            </Form>

            <Form form={form} layout="vertical" className="perform-del" style={{ display: 'none' }}>
                <div className={cx('perform-del-div')}>
                    <HiArchiveBoxXMark className={cx('perform-del-icon')} />
                    <p>X??a ph??ng</p>
                    <h2>B???n c?? ch???c x??a ph??ng: </h2>
                    <h2 className={cx('perform-del-h2')}>{roomName}</h2>
                    <div className={cx('perform-del-handle')}>
                        <button onClick={handlePerformOK} className={cx('perform-del-ok')}>
                            C??
                        </button>
                        <button onClick={handlePerformCancel} className={cx('perform-del-cancel')}>
                            Kh??ng
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}