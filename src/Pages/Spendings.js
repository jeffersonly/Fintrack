import React, { useState } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import { withRouter, useHistory } from 'react-router-dom';

import SpendingTable from '../Components/Tables/SpendingTable'; 
import CreateSpendingModal from '../Components/Modals/CreateSpendingModal';
import './Spendings.css';
//import Dropzone from '../Components/Dropzone/Dropzone';
//import CreateTransaction from '../Components/Spending/CreateTransaction';

function Spendings() {
  
  //const history = useHistory();
  const [showMore, setShowMore] = useState(false);
  
  return (
    <div>
      <div className="spendings">
        <Grid container spacing={3}>
          <Grid item xs = {1}>
            <IconButton className="table-icon" onClick={() => setShowMore(true) /*history.push('/spendings')*/}>
              <Create />
            </IconButton>
          </Grid>
          <Grid item xs>
              <SpendingTable />
          </Grid>
          {/* 
          <Grid item xs>
            <Dropzone />
            <CreateTransaction />
          </Grid>
          */}
        </Grid>
      </div>
      <CreateSpendingModal
        closeMore={() => setShowMore(!showMore)} 
        openMore={showMore}
      />
   </div>
  );
}

export default withRouter(Spendings);