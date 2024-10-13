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
                            style={{ marginBottom: '30px' }}
                            cover={
                                categoryData?.img_url ? (
                                    <img
                                        alt={categoryData.title}
                                        src={categoryData.img_url}
                                        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                                    />
                                ) : null
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
                        <Row gutter={[16, 16]}>
                            {venueData.map((item, index) => (
                                <Col span={5} key={index}>
                                    <Card
                                        hoverable
                                        loading={loading}
                                        onClick={() => navigateVenueInfor(item._id)}
                                        style={{ width: 240 }}
                                        size={'small'}
                                        cover={<img src={item.img_url} style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
                                    >
                                        <Card.Meta title={item.title} description={item.desc} />
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