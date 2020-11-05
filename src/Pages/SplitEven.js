import React, {useState} from 'react';
import { withRouter , useHistory} from 'react-router-dom';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Button, makeStyles} from '@material-ui/core';
import SplitEvenForm from '../Components/Split/SplitEvenForm';
import SplitEvenTable from '../Components/Split/SplitEvenTable';

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
  create: {
    backgroundColor: "#ace1af",
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  }
});

function SplitEven () {
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Grid style={{justifyContent: 'space-evenly'}}s container spacing={2}>
          <Grid item xs={2}>
            <Button
              className={classes.back}
              onClick={() => history.push('/split')}
              variant="contained"
              disableElevation
              size="large"
              style={{ width: "100%", fontSize: "16px", marginBottom: "20px" }}
            >
              ← Back
            </Button>
          </Grid>
          <Grid item xs={5}>
            <SplitEvenForm
              onSubmit={data => {
                setRows(currentRows => [
                  {
                    SETotal: "$" + data[0],
                    SEMembers: data[1],
                    SETip: data[2] + "%",
                    SESplit: "$" + ((data[0]/data[1])*(1 + (.01 * data[2]))).toFixed(2)
                  },
                  ...currentRows
                ]);
              }}
            />
            <SplitEvenTable rows={rows}/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
  
  export default withRouter(SplitEven);