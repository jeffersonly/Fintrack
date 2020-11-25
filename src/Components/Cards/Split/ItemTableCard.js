import React, { useRef } from 'react';
import { Button, Card, CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
import { Row, Col } from 'react-bootstrap';
import SplitItemTable from '../../Tables/SplitItemTable';
import './SplitCard.css';

const useStyles = makeStyles((theme) => ({
  createbutton: {
    backgroundColor: "#ace1af",
    fontSize: "16px",
    position: "absolute",
    '&:focus': {
      outline: "none",
    },
    '&:hover': {
      backgroundColor: "#ace1af",
      opacity: 0.8
    },
  }
}));

function ItemTableCard(props) {

  const classes = useStyles();

  let taxInput = useRef(null);
  let tipInput = useRef(null);

  return (
    <div className="splitcard">
      <Card className="itemize-card" variant="outlined">
        <CardContent className="itemize-cardcontent">
          <Typography className="spliteven-result-title" variant="h6" align="center">
            Receipt Itemization
          </Typography>
          <SplitItemTable entries={props.rows} />
          <div className="splititem-bottomcontainer">
            <Row className="splititem-row">
              <Col xs={5}>
                <TextField
                  InputLabelProps={{shrink: true}}
                  inputRef={taxInput}
                  label="Tax Percentage"
                  placeholder="9.25"
                  required={false}
                  type="number"
                  variant="outlined"
                />
              </Col>
              <Col xs={5}>
                <TextField
                  InputLabelProps={{shrink: true}}
                  inputRef={tipInput}
                  label="Tip Percentage"
                  placeholder="15"
                  required={false}
                  type="number"
                  variant="outlined"
                />
              </Col>
            </Row>
            <Row className="itemize-button-container">
              <Col xs={12}>
                <Button
                  className={classes.createbutton}
                  disableElevation
                  disabled={props.rows.length === 0}
                  fullWidth
                  onClick={() => {
                    props.itemize(taxInput.current.value, tipInput.current.value);
                    taxInput.current.value = "";
                    tipInput.current.value = "";
                  }}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Split
                </Button>
              </Col>
            </Row>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ItemTableCard;