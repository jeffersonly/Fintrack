import React, { useState } from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import CreateSaving from '../Components/Cards/CreateSaving';
import CreateSavingModal from '../Components/Modals/Saving/CreateSavingModal';
import SavingTable from '../Components/Tables/SavingTable';
import './Savings.css';
import '../Components/Cards/Card.css';

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: "#FFDE0A",
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    '&:focus': {
      outline: 'none'
    },
    '&:hover': {
      backgroundColor: "#FFE95C",
    }
  }
}));

function Savings() {

  const classes = useStyles();

  const [showCreateSaving, setCreateSaving] = useState(false);

  return (
    <div className="savings">
      <Row>
        <Col className="savings-table">
          <SavingTable />
        </Col>
        <Col md={3} className="savings-form">
          <Card className="card-fintrack" variant="outlined">
            <CardContent>
              <CreateSaving title={true}/> 
            </CardContent>
          </Card>
        </Col>
      </Row>
      <CreateSavingModal
        closeCreateSaving={() => setCreateSaving(!showCreateSaving)}
        openCreateSaving={showCreateSaving}
      />
      <div className="savings-add">
        <Fab 
          className={classes.fab}
          onClick={() => setCreateSaving(true)}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default withRouter(Savings);