import './DropzoneModal.css';
import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Modal, Col, Row, Container } from 'react-bootstrap';
import ReceiptImg from '../../Images/receipt.svg';
import DropzoneInput from '../InputFields/DropzoneInput';

export default function DropzoneModal(props) {
    function generateItems() {
        if(props.from == "webcam") {
            return generateItemsFromWebcam()
        } else {
            return generateItemsFromDropzone()
        }
    }

    function generateItemsFromWebcam() {
        return (
            <Row className="itemRow">
                <Col xs={9} md={6}>
                    <img 
                        src={props.data.image}
                        className="itemReceiptImg"
                        alt="receipt" 
                    />
                </Col>
                <Col xs={9} md={6}>
                    <DropzoneInput data={props.data} from="camera" />
                </Col>
            </Row>
        );
    }

    function generateItemsFromDropzone() {
        let arrayOfItems = [];
        for(var i = 0; i < props.data.length; i++) {
            let item = (
                <Row key={i} className="itemRow">
                    <Col xs={9} md={6}>
                        <img 
                            src={props.data[i] ? props.data[i].image.preview:ReceiptImg}
                            className="itemReceiptImg"
                            alt="receipt" 
                        />
                    </Col>
                    <Col xs={9} md={6}>
                        <DropzoneInput data={props.data[i]} from="dropzone" />
                    </Col>
                </Row>
            );
            arrayOfItems.push(item);
        }
        return arrayOfItems;
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Transactions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    {generateItems()}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
  