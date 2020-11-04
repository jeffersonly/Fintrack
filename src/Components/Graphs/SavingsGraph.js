import React from 'react';
import Typography from '@material-ui/core/Typography';
import Graphs from './Graphs';
import './Graphs.css';

function SavingsGraph () {

  const today = new Date();

  return (
    <div align="center">
      <div className="graphs-graph">
        <Typography className="graphs-table-title" align="center">
          Savings ({today.getFullYear()})
        </Typography>
        <br />
        {/*<Typography className="graphs-table-subtitle" align="center">
          [ <b>x-axis</b>: months, <b>y-axis</b>: $ ]
        </Typography>*/}
        <Graphs data="savings"/>
      </div>
    </div>
  );
}

export default SavingsGraph;