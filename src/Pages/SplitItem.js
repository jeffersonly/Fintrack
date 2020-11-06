import React, {useState} from 'react';
import { withRouter, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { Button, makeStyles, Grid, Box} from '@material-ui/core';
import SplitItemTable from '../Components/Split/SplitItemTable';
import SplitItemForm from '../Components/Split/SplitItemForm';

const Container = styled.div`
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 80px;
  font-family: Roboto;
`;

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  divider: {
    marginBottom: "30px",
  },
  textfield: {
    marginBottom: "20px",
  },
  tableTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    paddingBottom: "15px"
  },
  container: {
    maxHeight: 400,
  },
  create: {
    backgroundColor: "#ace1af",
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  }
});

function SplitItem () {
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Grid style={{justifyContent: 'space-evenly'}}s container spacing={3}>
          <Grid item xs={1}>
            <Button
              className={classes.back}
              onClick={() => history.push('/split')}
              variant="contained"
              disableElevation
              size="large"
              style={{ width: "100%", fontSize: "16px", marginBottom: "20px", backgroundColor: "#ace1af" }}
            >
              ← Back
            </Button>
          </Grid>
          <Grid item xs={5}>
            <SplitItemForm
              onSubmit={data => {
                setRows(currentRows => [
                  {
                    SIName: data[0],
                    SIItem: data[1],
                    SIAmount: "$" + data[2],
                    SITip: "$" + (data[2]*(.01*data[3])).toFixed(2),
                    SITax: "$" + (data[2]*(.01*data[4])).toFixed(2),
                    SITotal: "$" + (data[2]
                                 + (data[2]*(.01*data[3]))
                                 + (data[2]*(.01*data[4]))).toFixed(2)
                  },
                  ...currentRows
                ]);
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <Box border={1} borderColor="#E1ECF0">
              <SplitItemTable rows={rows}/>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
  
export default withRouter(SplitItem);