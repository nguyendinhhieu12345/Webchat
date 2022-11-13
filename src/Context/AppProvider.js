import React from 'react';
import useFirestore from '~/hooks/useFirestore';
import { AuthContext } from './AuthProvider';
import { useState } from 'react';
import getFriends from '~/hooks/getFriends';
import listAddFriendAll from '~/hooks/listAddFriendAll';
import AddFriend from '~/hooks/AddFriend';
import getSearchFriend from '~/hooks/getSearchFriend';
export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [isOpenRename, setIsOpenRename] = useState('none');
    const [isOpenRenameDes, setIsOpenRenameDes] = useState('none');
    const [isOpenOption, setOpenOption] = useState('none');
    const [isOpenFormInvite, setIsOpenFormInvite] = useState('none')
    const [showFriendchat,setShowFriendchat]= useState(false);
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
    const FriendsList = React.useMemo(() => {
        return getFriends(uid);
    })
    const AddFriendList = React.useMemo(()=>{
        return AddFriend(uid ? uid : JSON.parse(localStorage.getItem("user"))[2]);
    })

    const AddFriendListAll = React.useMemo(()=>{
        return listAddFriendAll();
    })
    const SearchUser = React.useMemo(()=>{
        return getSearchFriend();
    })
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
                setIsRenameDesInput,
                isOpenFormInvite, 
                setIsOpenFormInvite,
                showFriendchat,
                setShowFriendchat,
                FriendsList,
                AddFriendList,
                AddFriendListAll,
                SearchUser
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
