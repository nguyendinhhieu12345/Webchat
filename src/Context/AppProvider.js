import React, { useMemo, useContext } from 'react';
import Firestore from '~/hooks/useFirestore';
import { AuthContext } from './AuthProvider';
export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const {
        user: { photoURL, uid },
    } = React.useContext(AuthContext);
    const roomsCondition = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: '1GmWDCbOjebWzWL6t6zcwWB4TNK2',
        };
    }, [uid]);
    const rooms = Firestore('rooms', roomsCondition);
    const [roomid, setRoomid] = React.useState('');
    return <AppContext.Provider value={{ roomid, setRoomid, rooms }}>{children}</AppContext.Provider>;
}
