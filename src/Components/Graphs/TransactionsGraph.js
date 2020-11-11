import React, { useState } from 'react';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
import Graphs from './Graphs';
import './Graphs.css';

function TransactionsGraph () {

  const [background, setBackground] = useState({trans: "#E8F7E2", savings: ""})
  //const [graph, setGraph] = useState({trans: true, savings: false});
  const [transGraph, setTransGraph] = useState(true);
  const [categoryGraph, setCategoryGraph] = useState(false);

  function handleShowTransGraph() {
    setTransGraph(true);
    setCategoryGraph(false);
  }

  function handleShowCategoryGraph() {
    setTransGraph(false);
    setCategoryGraph(true);
  }

  const today = new Date();

  const handleClick = (gr) => {
    var option = {
      "trans": "",
      "categ": ""
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
        <div className="graphs-transaction">
          {/*<Typography className="graphs-table-title" align="center">
            Transactions ({today.getFullYear()})
          </Typography>
          <br />
          <Typography className="graphs-table-subtitle" align="center">
            [ <b>x-axis</b>: months, <b>y-axis</b>: $ ]
          </Typography>*/}
          <Graphs data="trans" />
        </div>
      );
    }
  }

  function showCategoryGraph() {
    if (categoryGraph) {
      return (
        <div>
          {/*<Typography className="graphs-table-title" align="center">
            Transactions: by Category ({today.getFullYear()})
          </Typography>*/}
          <Typography className="graphs-table-subtitle" align="center">
            by Category: Perecentage of Total Spendings in Different Categories
          </Typography>
          <div className="graphs-pie">
            <Graphs data="category" />
          </div>
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
        <Typography className="graphs-table-title" align="center">
          Spendings Graph ({today.getFullYear()})
        </Typography>
        {showTransGraph()}
        {showCategoryGraph()}
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
          By Month
        </Button>
        <Button 
          className="graphs-button"
          onClick={() => {
            handleClick("categ");
            handleShowCategoryGraph();
          }}
          style={{backgroundColor: background["categ"]}}
        >
          By Category
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default TransactionsGraph;