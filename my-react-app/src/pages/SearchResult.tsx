import React, { useEffect, useState } from 'react';
import { Card, Empty, Row, Col } from 'antd';
import useVenueData from '../hooks/SearchReasult';
import { useNavigate } from 'react-router-dom';

const SearchResult: React.FC = () => {
    const Navigate = useNavigate();
    const { venueData } = useVenueData();
    const [loading, setLoading] = useState<boolean>(false);

    const navigateVenueInfor = (id: string | undefined) => {
        Navigate(`/venueInfor/${id}`);
    }

    const isLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }

    useEffect(() => {
        isLoading();
    }, [])

    return (
        <>
            <h2>Search result</h2>
            <Card loading={loading}>
                {venueData.length > 0 ? (
                    <>
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

export default SearchResult;