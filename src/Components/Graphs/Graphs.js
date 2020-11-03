import React, { useState, useEffect } from 'react';
import { calculateSpendingsMonthTotal, calculateSavingsMonthTotal } from './GetGraphData';
import ChartistGraph from "react-chartist";

var Chartist = require("chartist");

var delays = 16,
  durations = 100;

function Graphs (props) {
  
  const [spendingsData, setSpendingsData] = useState([]);
  const [savingsData, setSavingsData] = useState([]);

  useEffect(() => {
    getSpendingTotal();
    getSavingTotal();
  }, []);

  async function getSpendingTotal() {
    const result = await calculateSpendingsMonthTotal();
    setSpendingsData(result);
  }

  async function getSavingTotal() {
    const result = await calculateSavingsMonthTotal();
    setSavingsData(result);
  }

  //temporary
  function transInformation() {
    if (props.data === "trans") {
      if (spendingsData === "There was an error.") {
        return (
          <p style={{color: "red"}}>{spendingsData}</p>
        );
      }
      else {
        const transactionsChart = {
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Mai",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            series: [
              [
                spendingsData[0],
                spendingsData[1],
                spendingsData[2],
                spendingsData[3],
                spendingsData[4],
                spendingsData[5],
                spendingsData[6],
                spendingsData[7],
                spendingsData[8],
                spendingsData[9],
                spendingsData[10],
                spendingsData[11],
                spendingsData[12]
              ]
            ]
          },
          options: {
            axisX: {
              showGrid: false
            },
            axisY: {
              labelInterpolationFnc: function(value, index) {
                return index % 1 === 0 ? value : null;
              }
            },
            width: 650,
            height: 230,
            low: 0,
            high: 1500,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: -5
            }
          },
          responsiveOptions: [
            [
              "screen and (max-width: 640px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                },
                width: 300
              }
            ],
            [
              "screen and (max-width: 768px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                },
                width: 400
              },
            ],
            [
              "screen and (max-width: 1100px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                },
                width: 450
              },
            ]
          ],
          // for animation
          animation: {
            draw: function(data) {
              if (data.type === "line" || data.type === "area") {
                data.element.animate({
                  d: {
                    begin: 600,
                    dur: 700,
                    from: data.path
                      .clone()
                      .scale(1, 0)
                      .translate(0, data.chartRect.height())
                      .stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                });
              } else if (data.type === "point") {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: "ease"
                  }
                });
              }
            }
          }
        }
        return (
          <ChartistGraph
            data={transactionsChart.data}
            listener={transactionsChart.animation}
            options={transactionsChart.options}
            responsiveOptions={transactionsChart.responsiveOptions}
            type="Line"
          />
        );
      }
    }
  }

  function savingInformation() {
    if (props.data === "savings") {
      if (savingsData === "There was an error.") {
        return (
          <p style={{color: "red"}}>{savingsData}</p>
        );
      }
      else {
        const savingsChart = {
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Mai",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            series: [
              [
                savingsData[0],
                savingsData[1],
                savingsData[2],
                savingsData[3],
                savingsData[4],
                savingsData[5],
                savingsData[6],
                savingsData[7],
                savingsData[8],
                savingsData[9],
                savingsData[10],
                savingsData[11],
                savingsData[12]
              ]
            ]
          },
          options: {
            axisX: {
              showGrid: false
            },
            axisY: {
              labelInterpolationFnc: function(value, index) {
                return index % 1 === 0 ? value : null;
              }
            },
            width: 650,
            height: 230,
            low: 0,
            high: 2500,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: -5
            }
          },
          responsiveOptions: [
            [
              "screen and (max-width: 640px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                },
                width: 300
              }
            ],
            [
              "screen and (max-width: 768px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                },
                width: 400
              },
            ],
            [
              "screen and (max-width: 1100px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                },
                width: 450
              },
            ]
          ],
          animation: {
            draw: function(data) {
              if (data.type === "bar") {
                data.element.animate({
                  opacity: {
                    begin: (data.index + 1) * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: "ease"
                  }
                });
              }
            }
          }
        }
        return (
          <ChartistGraph
            data={savingsChart.data}
            listener={savingsChart.animation}
            options={savingsChart.options}
            responsiveOptions={savingsChart.responsiveOptions}
            type='Bar'
          />
        );
      }
    }
  }

  return (
    <>
      {transInformation()}
      {savingInformation()}
    </>
  )
}

export default Graphs;