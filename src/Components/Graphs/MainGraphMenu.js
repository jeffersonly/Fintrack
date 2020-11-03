import React, { useState } from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
import Graphs from './Graphs';
import './Graphs.css';

function MainGraphMenu () {

  const [background, setBackground] = useState({trans: "#E8F7E2", savings: ""})
  //const [graph, setGraph] = useState({trans: true, savings: false});
  const [transGraph, setTransGraph] = useState(true);
  const [savingsGraph, setSavingsGraph] = useState(false);

  function handleShowTransGraph() {
    setTransGraph(true);
    setSavingsGraph(false);
  }

  function handleShowSavingsGraph() {
    setTransGraph(false);
    setSavingsGraph(true);
  }

  const today = new Date();

  const handleClick = (gr) => {
    var option = {
      "trans": "",
      "savings": ""
    }
    for (var btn in option) {
      if (gr === btn) {
        option[gr] = "#E8F7E2";
      }
    }
    setBackground(option);
  }

  /*const handleClick = (gr) => {
    var option = {
      "trans": false,
      "savings": false
    }
    for (var btn in option) {
      if (gr === btn) {
        option[gr] = true;
      }
    }
    setGraph(option);
  }*/

  function showTransGraph() {
    if (transGraph) {
      return (
        <div>
          <Typography className="graphs-table-title" align="center">
            Transactions ({today.getFullYear()})
          </Typography>
          <Typography className="graphs-table-subtitle" align="center">
            [ <b>x-axis</b>: months, <b>y-axis</b>: $ ]
          </Typography>
          <Graphs data="trans" />
        </div>
      );
    }
  }

  function showSavingsGraph() {
    if (savingsGraph) {
      return (
        <div>
          <Typography className="graphs-table-title" align="center">
            Savings ({today.getFullYear()})
          </Typography>
          <Typography className="graphs-table-subtitle" align="center">
            [ <b>x-axis</b>: months, <b>y-axis</b>: $ ]
          </Typography>
          <Graphs data="savings"/>
        </div>
      );
    }
  }

  /*function getGraph() {
    if (graph["trans"] === true) {
      return (
        <ChartistGraph
          data={transactionsChart.data}
          options={transactionsChart.options}
          type="Line"
        />
      );
    }
    if (graph["savings"] === true) {
      return (
        <ChartistGraph
          data={emailsSubscriptionChart.data}
          options={emailsSubscriptionChart.options}
          type='Bar'
          responsiveOptions={emailsSubscriptionChart.responsiveOptions}
        />
      )
    }
  }*/

  return (
    <div align="center">
      <div className="graphs-graph">
        {showTransGraph()}
        {showSavingsGraph()}
      </div>
      <ButtonGroup 
        aria-label="text primary button group"
        color="primary"
        size="small"
        variant="text"  
      >
        <Button 
          className="graphs-button"
          onClick={() => {
            handleClick("trans");
            handleShowTransGraph();
          }}
          style={{backgroundColor: background["trans"]}}
        >
          Transactions
        </Button>
        <Button 
          className="graphs-button"
          onClick={() => {
            handleClick("savings");
            handleShowSavingsGraph();
          }}
          style={{backgroundColor: background["savings"]}}
        >
          Savings
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default MainGraphMenu;