import axios from '../utils/http';
import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import VenueDataType from '../model/VenueDataType';
import React, { useEffect, useState } from 'react';
import CategoryDataType from '../model/CategoryDataType';

const FrontPage: React.FC = () => {
    const Navigate = useNavigate();
    const categoryDataType: CategoryDataType[] = [];
    const venueDataType: VenueDataType[] = [];
    const [loading, setLoading] = useState<boolean>(false);
    const [categoriesData, setCategoriesData] = useState(categoryDataType);
    const [venueData, setVenueData] = useState(venueDataType);

    // Navigate to category details page
    const navigateCategoryInfor = (id: string | undefined) => {
        Navigate(`/categoryInfor/${id}`);
    }

    // Navigate to venue details page
    const navigateVenueInfor = (id: string | undefined) => {
        Navigate(`/venueInfor/${id}`);
    }

    // Fetch categories data from the server
    async function getCategoriesData() {
        try {
            setLoading(true);
            const res = await axios.get('/pages');
            const { code, data } = res.data;
            if (code === 200) {
                setLoading(false);
                setCategoriesData(data);
            }
        } catch (error) {
            console.error('Failed:', error);
        } finally {
            setLoading(false);
        }
    }

    // Recommendations
    async function getVenueData() {
        try {
            setLoading(true);
            const res = await axios.get('/getRecommendations');
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
        getCategoriesData();
        getVenueData();
    }, [])

    return (
        <>
            {/* Categories */}
            <h2>Categories</h2>
            <Row gutter={[16, 16]}>
                {categoriesData.map((item, index) => (
                    <Col span={6} key={index}>
                        <Card
                            hoverable
                            onClick={() => navigateCategoryInfor(item._id)}
                            style={{ width: 300 }}
                            size={'small'}
                            cover={<img src={item.img_url} style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
                            loading={loading}>
                            <Card.Meta title={item.title} description={item.desc.length > 240 ? `${item.desc.slice(0, 240)}...` : item.desc} />
                        </Card>
                    </Col>
                ))}

            </Row>

            {/* Recommendations */}
            <h2 style={{ marginTop: '24px' }}>Hot Recommendations</h2>
            <Card>
                <Row gutter={[20, 20]}>
                    {venueData.slice(0, 4).map((item, index) => (
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
            </Card>
        </>
    )
};

export default FrontPage;