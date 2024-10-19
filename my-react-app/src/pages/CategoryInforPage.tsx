import { Card, Empty, Row, Col } from 'antd';
import axios from '../utils/http';
import React, { useEffect, useState } from 'react';
import CategoryDataType from '../model/CategoryDataType';
import VenueDataType from '../model/VenueDataType';
import { useParams, useNavigate } from 'react-router-dom';


const CategoryInforPage: React.FC = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const venueDataType: VenueDataType[] = [];
    const [venueData, setVenueData] = useState(venueDataType);
    const [categoryData, setCategoryData] = useState<CategoryDataType>();

    const navigateVenueInfor = (id: string | undefined) => {
        Navigate(`/venueInfor/${id}`);
    }

    // Fetch category details based on category ID
    async function getCurrentCategory(id: string | undefined) {
        try {
            setLoading(true);
            const res = await axios.get(`/pages/${id}`);
            const { code, data } = res.data;
            if (code === 200) {
                setLoading(false);
                setCategoryData(data);
            }
        } catch (error) {
            console.error('Failed:', error);
        } finally {
            setLoading(false);
        }
    }

    // Fetch venues under a specific category
    async function getAllVenue(id: string | undefined) {
        try {
            setLoading(true);
            const res = await axios.get(`/venue/${id}`);
            const { code, data } = res.data;
            if (code === 200) {
                setLoading(false);
                setVenueData(data);
            }
        } catch (error) {
            console.error('Failed:', error);
        } finally {
            setLoading(false);
        }
    }

    // Fetch venues under a specific category
    useEffect(() => {
        getCurrentCategory(id);
        getAllVenue(id);
    }, [id])

    return (
        <>
            <h2>Category information</h2>
            <Card loading={loading}>
                {venueData.length > 0 ? (
                    <>
                        <Card
                            loading={loading}
                            style={{ marginBottom: '20px' }}
                            cover={
                                <div style={{ width: '100%', height: '50px', backgroundColor: '#597ef7' }} />
                                // categoryData?.img_url ? (
                                //     <img
                                //         alt={categoryData.title}
                                //         src={categoryData.img_url}
                                //         style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                //     />
                                // ) : null
                            }>
                            {categoryData ? (
                                <div>
                                    <h3>{categoryData.title}</h3>
                                    <p>{categoryData.desc}</p>
                                </div>
                            ) : (
                                <Empty description="No data available" />
                            )}
                        </Card>
                        <Row gutter={[20, 20]}>
                            {venueData.map((item, index) => (
                                <Col span={6} key={index}>
                                    <Card
                                        hoverable
                                        style={{ width: 280 }}
                                        onClick={() => navigateVenueInfor(item._id)}
                                        size={'small'}
                                        cover={<img src={item.img_url} style={{ width: '100%', height: 180, objectFit: 'cover' }} />}
                                        loading={loading}>
                                        <Card.Meta title={item.title} description={item.desc.length > 100 ? `${item.desc.slice(0, 100)}...` : item.desc} />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </>
                ) : (
                    <Empty description={false} />
                )}
            </Card>
        </>
    )
};

export default CategoryInforPage;