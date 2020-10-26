import React from 'react';
import { Divider, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  cardtitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  divider: {
    marginBottom: "30px",
  }
})

function CardTitle(props) {

  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.cardtitle} align="center">
        {props.title}
      </Typography>
      <Divider className={classes.divider} />
    </div>
  );
}

CardTitle.defaultProps = {
  title: ""
}

export default CardTitle;