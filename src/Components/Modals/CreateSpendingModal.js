import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-bootstrap/Modal';
import Dropzone from '../../Components/Dropzone/Dropzone';
import CreateSpending from '../Cards/CreateSpending';

function CreateSpendingModal(props) {
    const [show, setShow] = useState(props.openMore);
    useEffect(() => {
        setShow(props.openMore);
    }, [props.openMore]);
    return (
        <div >
            <Modal
                size="lg"
                className="profile"
                show={show}
                onHide={props.closeMore}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Create new spending</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            <CreateSpending />
                        </Grid>
                        <Grid item xs>

                            <Dropzone />
                        </Grid>
                    </Grid>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CreateSpendingModal;
