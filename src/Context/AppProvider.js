import React, { useMemo, useContext } from 'react';
import useFirestore from '~/hooks/useFirestore';
import { AuthContext } from './AuthProvider';
import { useState } from 'react';
export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [isOpenRename, setIsOpenRename] = useState('none');
    const [isOpenRenameDes, setIsOpenRenameDes] = useState('none');
    const [isOpenOption, setOpenOption] = useState('none');


    const [isRenameInput, setIsRenameInput] = useState('');

    const [isRenameDesInput,setIsRenameDesInput] = useState('');
    const {
        user: { photoURL, uid },
    } = React.useContext(AuthContext);
    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid,
        
        };
    }, [uid]);

    const rooms = useFirestore('rooms', roomsCondition);

    const selectedRoom = React.useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId],
    );

    const [roomid, setRoomid] = React.useState('');

    const usersCondition = React.useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        };
    }, [selectedRoom.members]);

    const members = useFirestore('users', usersCondition);
    return (
        <AppContext.Provider
            value={{
                roomid,
                setRoomid,
                rooms,
                isModalOpen,
                setIsModalOpen,
                members,
                setSelectedRoomId,
                selectedRoomId,
                isInviteMemberVisible,
                setIsInviteMemberVisible,
                isOpenRename,
                setIsOpenRename,
                isOpenRenameDes,
                setIsOpenRenameDes,
                isOpenOption,
                setOpenOption,
                isRenameInput, 
                setIsRenameInput,
                isRenameDesInput,
                setIsRenameDesInput
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
