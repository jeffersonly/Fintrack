import React, { useState } from 'react';
import { Fab, makeStyles, rgbToHex } from '@material-ui/core';
//import Create from '@material-ui/icons/Create';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import SpendingTable from '../Components/Tables/SpendingTable'; 
import CreateSpendingModal from '../Components/Modals/Spending/CreateSpendingModal';
import './Spendings.css';
//import Dropzone from '../Components/Dropzone/Dropzone';
//import CreateTransaction from '../Components/Spending/CreateTransaction';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    }
  },
});

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

  //const history = useHistory();
  const [showCreateSpending, setCreateSpending] = useState(false);
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="spendings spendings-table">
          <Row>
            {/*}
            <Col md={1}>
              <IconButton className="table-icon" onClick={() => setCreateSpending(true) /*history.push('/spendings')}>
                <Create />
              </IconButton>
            </Col>
            */}
            <Col md={12}>
              <SpendingTable />
            </Col>
          </Row>
          {/* 
          <Grid item xs>
            <Dropzone />
            <CreateTransaction />
          </Grid>
          */}
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
      </ThemeProvider>
   </div>
  );
}

export default withRouter(Spendings);