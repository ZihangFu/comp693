import axios from '../utils/http';
import { Typography, Space, Avatar, Flex, Rate, Card, Empty, List, Input, Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUserData from '../hooks/LoginStatus';
import VenueDataType from '../model/VenueDataType';
import CommentDataType from '../model/CommentDataType';
import { UserOutlined } from '@ant-design/icons';

const VenueInforPage: React.FC = () => {
    const { id } = useParams();
    const userData = useUserData();
    const [loading, setLoading] = useState<boolean>(false);
    const [venueData, setVenueData] = useState<VenueDataType>();
    const [comments, setComments] = useState<CommentDataType[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [newRating, setNewRating] = useState<number>(0);
    const [avgRating, setAvgRating] = useState<number>(0);

    // Adds a new comment
    const handleAddComment = (name: string) => {
        if (newComment.trim()) {
            const newEntry = {
                user: name,
                content: newComment,
                timestamp: new Date().toISOString(),
                rating: newRating,
                Activity_id: id
            };
            setComments([newEntry, ...comments]);
            setNewComment('');
            setNewRating(0);
            // submit to server
            insertComment(newEntry)
        }
    };

    const handleRatingChange = (value: number) => {
        setNewRating(value);
    };

    // Inserts a comment into the server
    async function insertComment(data: CommentDataType) {
        await axios.post(`/comment/`, data);
        setLoading(false)
    }

    // Fetches venue information from the server
    async function getVenueData(id: string | undefined) {
        try {
            setLoading(true);
            const res = await axios.get(`/Activitys/${id}`);
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

    // Fetches comments for the venue
    async function fetchComment(id: string | undefined) {
        try {
            setLoading(true);
            const res = await axios.get(`/getComment/${id}`);
            const { code, data } = res.data;
            if (code === 200) {
                setLoading(false);
                setComments(data || []);
            }
        } catch (error) {
            console.error('Failed:', error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchAvgRating(id: string | undefined) {
        try {
            const res = await axios.get(`/getAvgRating/${id}`);
            const { code, data } = res.data;
            if (code === 200) {
                setLoading(false);
                setAvgRating(data.avg_rating)
            }
            console.log(avgRating)
        } catch (error) {
            console.error('Failed:', error);
        }
    }

    useEffect(() => {
        getVenueData(id);
        fetchComment(id);
        fetchAvgRating(id)
    }, [id])

    return (
        <>
            <h2>Venue information</h2>
            <Card
                loading={loading}
                cover={
                    venueData?.img_url ? (
                        <img
                            alt={venueData.title}
                            src={venueData.img_url}
                            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                        />
                    ) : null
                }
            >
                {venueData ? (
                    <div>
                        <h3>{venueData.title}</h3>

                        {/* avg rate */}
                        <Flex gap="middle">
                            {avgRating ? (
                                <>
                                    <Rate disabled allowHalf value={avgRating} />
                                    <span style={{ color: 'orange' }}>{avgRating}</span>
                                </>
                            ) : (
                                <>
                                    <Rate disabled allowHalf value={0} />
                                    <span style={{ color: 'orange' }}>0</span>
                                </>
                            )}
                            <span>/</span>
                            <span style={{ color: 'green' }}>5</span>
                        </Flex>
                        <p>{venueData.desc}</p>
                    </div>
                ) : (
                    <Empty description="No data available" />
                )}
            </Card>
            {/* comment */}
            <div style={{ marginTop: '20px' }}>
                <h3>Comments</h3>
                {userData != null ? (
                    <>
                        <Form style={{ marginTop: '20px' }} onFinish={handleAddComment}>
                            <Form.Item>
                                <Input.TextArea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    rows={4}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Rate value={newRating} onChange={handleRatingChange} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={() => handleAddComment(userData.name)}>
                                    Submit Comment
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                ) : (
                    <>
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 60 }}
                            style={{ marginBottom: 50 }}
                            description={
                                <Typography.Text>
                                    Please log in first
                                </Typography.Text>
                            } />
                    </>
                )}
                <List
                    bordered
                    dataSource={comments}
                    style={{ backgroundColor: 'white' }}
                    renderItem={(comment) => (
                        <List.Item>
                            <div>
                                <Space wrap size={16}>
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                    <strong>{comment.user}</strong> - <em>{new Date(comment.timestamp).toLocaleString()}</em>
                                </Space>
                                <p>{comment.content}</p>
                                <Rate disabled value={comment.rating} />
                            </div>
                        </List.Item>
                    )}
                    locale={{ emptyText: 'No comments yet' }}
                />
            </div>
        </>
    )
};

export default VenueInforPage;