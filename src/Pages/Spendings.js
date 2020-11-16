import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core'; 
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'; 
import SpendingTable from '../Components/Tables/SpendingTable'; 
import CreateSpendingModal from '../Components/Modals/Spending/CreateSpendingModal';
import './Spendings.css'; 

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

function Spendings() {
  
  const classes = useStyles(); 
  const [showCreateSpending, setCreateSpending] = useState(false);
  
  return (
    <div>
      <div className="spendings spendings-table">
        <Row>
          <Col md={12}>
            <SpendingTable />
          </Col>
        </Row>
      </div>
      <CreateSpendingModal
        closeCreateSpending={() => setCreateSpending(!showCreateSpending)} 
        openCreateSpending={showCreateSpending}
      />
      <Fab 
        className={classes.fab}
        onClick={() => setCreateSpending(true)}
      >
        <AddIcon />
      </Fab>
   </div>
  );
}

export default withRouter(Spendings);