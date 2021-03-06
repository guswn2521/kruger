import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Badge, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import * as Api from '../../api';

const NoteListTake = ({ takeNote, setTakeNote }) => {
    const navigate = useNavigate();
    const [newDateFormatted, setNewDateFormatted] = useState('');

    useEffect(() => {
        const newDate = new Date(takeNote?.createdAt);

        // date format을 'yyyy년 MM월 dd일 h:m:s'로 변경
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        const time = newDate.toLocaleString().split('.')[3];

        setNewDateFormatted(`${year}년 ${month}월 ${day}일 ${time}`);
    }, []);

    const handleRead = async () => {
        await Api.patch(`takenNotes/${takeNote.id}`);
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        await Api.delete(`takenNotes/${takeNote.id}`);

        await Api.get(`takenNotelist`).then((res) => {
            setTakeNote(res.data);
        });
    };

    return (
        <Container fluid style={{ width: '80%' }}>
            <Card.Text as={Col} className="takeNote">
                <Card.Body
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        // 발신 쪽지 상세 페이지로 이동
                        navigate(`/note/takenNotes/${takeNote.id}`);
                        handleRead();
                    }}
                >
                    <Row>
                        <Col>
                            <Card.Title>
                                {takeNote.fromUser.name === '탈퇴한 회원' ? (
                                    <Badge bg="secondary">탈퇴한 회원</Badge>
                                ) : (
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // 발신자의 개인 페이지로 이동
                                            navigate(
                                                `/users/${takeNote.fromUser?.id}`
                                            );
                                        }}
                                    >
                                        <strong>
                                            {takeNote.fromUser.name}
                                        </strong>
                                    </span>
                                )}
                                <span className="text-muted">
                                    <small>이(가) 보낸 쪽지</small>
                                </span>
                            </Card.Title>
                        </Col>
                        <Col className="text-end">
                            {takeNote.check ? (
                                <Badge pill bg="secondary">
                                    읽음
                                </Badge>
                            ) : (
                                <Badge pill bg="success">
                                    읽지 않음
                                </Badge>
                            )}
                        </Col>
                    </Row>
                    <Card.Title>
                        <span className="fs-5">
                            <strong>{takeNote.title}</strong>
                        </span>
                    </Card.Title>
                    <Row>
                        <Col>
                            <Card.Text>
                                <span className="text-muted">
                                    <small>{newDateFormatted}</small>
                                </span>
                            </Card.Text>
                        </Col>
                        <Col className="text-end">
                            <Button
                                variant="primary"
                                size="sm"
                                className="deleteButton"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(e);
                                }}
                            >
                                삭제
                            </Button>{' '}
                        </Col>
                    </Row>
                </Card.Body>
            </Card.Text>
        </Container>
    );
};

export default NoteListTake;
