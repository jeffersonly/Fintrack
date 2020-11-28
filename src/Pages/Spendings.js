import React, { useState } from 'react';
import { Fab, makeStyles } from '@material-ui/core'; 
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import SpendingTable from '../Components/Tables/SpendingTable'; 
import CreateSpendingModal from '../Components/Modals/Spending/CreateSpendingModal';
import './SpendingsSavings.css'; 

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(1, 114, 71)",
    },
    secondary: {
      main: "#0000EE"
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

  const [showCreateSpending, setCreateSpending] = useState(false);
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="spendingssavings spendingssavings-table">
          <SpendingTable />
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