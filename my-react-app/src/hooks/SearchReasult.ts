import { useState, useEffect } from 'react';
import VenueDataType from '../model/VenueDataType';

function useVenueData() {
    const [venueData, setVenueData] = useState<VenueDataType[]>([]); 

    useEffect(() => {
        const storedVenueData = localStorage.getItem('venueData');
        const parsedData = storedVenueData ? JSON.parse(storedVenueData) : [];
        setVenueData(parsedData);
    }, []);

    const updateVenueData = (data: VenueDataType[]) => {
        setVenueData(data);
        localStorage.setItem('venueData', JSON.stringify(data));
    };

    return { venueData, updateVenueData }; 
}

export default useVenueData;
