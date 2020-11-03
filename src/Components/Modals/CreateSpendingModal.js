import React, { useState, useEffect } from 'react';
//import { Divider, Grid } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import Dropzone from '../../Components/Dropzone/Dropzone';
import CreateSpending from '../Cards/CreateSpending';
import '../Cards/Profile.css';

function CreateSpendingModal(props) {

	const [show, setShow] = useState(props.openCreateSpending);

    useEffect(() => {
        setShow(props.openCreateSpending);
    }, [props.openCreateSpending]);

    return (
        <div >
            <Modal
                size="lg"
                className="profile"
                show={show}
                onHide={props.closeCreateSpending}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Create New Spendings</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={6}>
                            <CreateSpending />
                        </Col>
                        <Col xs={6}>
                            <Dropzone />
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CreateSpendingModal;
