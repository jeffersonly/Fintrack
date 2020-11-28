import React, { useState } from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import CreateSavingModal from '../Components/Modals/Saving/CreateSavingModal';
import SavingTable from '../Components/Tables/SavingTable';
import './SpendingsSavings.css';

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

function Savings() {

  const classes = useStyles();

  const [showCreateSaving, setCreateSaving] = useState(false);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="spendingssavings spendingssavings-table">
          <SavingTable />
        </div>
        <CreateSavingModal
          closeCreateSaving={() => setCreateSaving(!showCreateSaving)}
          openCreateSaving={showCreateSaving}
        />
        <Fab 
          className={classes.fab}
          onClick={() => setCreateSaving(true)}
        >
          <AddIcon />
        </Fab>
      </ThemeProvider>
    </div>
  );
}

export default withRouter(Savings);