import React, { useState, useEffect } from 'react';
//import { Divider, Grid } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import WebcamCapture from '../../Webcam/Webcam';
import Dropzone from '../../Dropzone/Dropzone';
import CreateSpending from '../../Cards/CreateSpending';
import '../../Cards/Profile.css';

function CreateSpendingModal(props) {

	const [showCreateSpendingModal, setShowCreateSpendingModal] = useState(props.openCreateSpending);

    useEffect(() => {
        setShowCreateSpendingModal(props.openCreateSpending);
    }, [props.openCreateSpending]);

    return (
        <div >
            <Modal
                size="lg"
                className="profile"
                show={showCreateSpendingModal}
                onHide={props.closeCreateSpending}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Create New Spendings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={12} md={6}>
                            <CreateSpending />
                        </Col>
                        <Col md={6} className="editprofile-textfield d-none d-md-block">
                            <Dropzone />
                            <WebcamCapture />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CreateSpendingModal;
