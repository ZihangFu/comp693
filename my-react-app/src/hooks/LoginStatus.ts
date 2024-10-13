import { useState, useEffect } from 'react';
import UserDataType from '../model/UserDataType';

function useUserData() {
    const [userData, setUserData] = useState<UserDataType>();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        const parsedData = storedUserData ? JSON.parse(storedUserData) : null;
        if (parsedData && parsedData.length > 0) {
            setUserData(parsedData[0]);
        }
    }, []);

    return userData;
}

export default useUserData;