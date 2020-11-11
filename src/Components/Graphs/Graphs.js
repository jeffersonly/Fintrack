import React, { useState, useEffect } from 'react';
import { calculateSpendingsMonthTotal, calculateSavingsMonthTotal, spendingsCategory } from './GetGraphData';
import ChartistGraph from 'react-chartist';
import Legend from 'chartist-plugin-legend';
import ctAxisTitle from "chartist-plugin-axistitle";
import './Graphs.css';

var Chartist = require("chartist");

var delays = 16,
  durations = 100;

function Graphs (props) {
  
  const [spendingsData, setSpendingsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [savingsData, setSavingsData] = useState([]);

  useEffect(() => {
    getSpendingTotal();
    getCategory();
    getSavingTotal();
  }, []);

  async function getSpendingTotal() {
    const result = await calculateSpendingsMonthTotal();
    setSpendingsData(result);
  }

  async function getCategory() {
    const result = await spendingsCategory();
    setCategoryData(result);
  }

  async function getSavingTotal() {
    const result = await calculateSavingsMonthTotal();
    setSavingsData(result);
  }

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
            width: 750,
            height: 285,
            low: 0,
            high: 1500,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 20,
              left: 15
            },
            plugins: [
              ctAxisTitle({
                axisX: {
                  axisTitle: "Months",
                  axisClass: "graphs-axis",
                  textAnchor: "middle",
                  offset: {
                    y: 40
                  }
                },
                axisY: {
                  axisTitle: "Value ($)",
                  axisClass: "graphs-axis",
                  offset: {
                    x: 5,
                    y: 10
                  },
                  flipTitle: true
                }
              })
            ]
          },
          responsiveOptions: [
            [
              "screen and (max-width: 420px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                },
                width: 150,
                chartPadding: {
                  right: 130,
                  left: 10
                },
              }
            ],
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
              "screen and (max-width: 1250px)",
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

  function categoryInformation() {
    //const categories = ["Banking", "Clothing", "Education", "Entertainment", "Food", "Housing", 
    //                "Insurance", "Medical/Health Care", "Personal", "Transportation", "Utilities", "Other"];
    if (props.data === "category") {
      if (categoryData === "There was an error.") {
        return (
          <p style={{color: "red"}}>{categoryData}</p>
        );
      }
      else {
        const categoryChart = {
          data: {
            series: [
              {
                value: categoryData[1],
                name: "Banking"
              },
              {
                value: categoryData[2],
                name: "Clothing"
              },
              {
                value: categoryData[3],
                name: "Education"
              },
              {
                value: categoryData[4],
                name: "Entertainment"
              },
              {
                value: categoryData[5],
                name: "Food"
              },
              {
                value: categoryData[6],
                name: "Housing"
              },
              {
                value: categoryData[7],
                name: "Insurance"
              },
              {
                value: categoryData[8],
                name: "Medical/Health Care"
              },
              {
                value: categoryData[9],
                name: "Personal"
              },
              {
                value: categoryData[10],
                name: "Transportation"
              },
              {
                value: categoryData[11],
                name: "Utilities"
              },
              {
                value: categoryData[12],
                name: "Other"
              }
            ]
          },
          options: {
            width: "260px",
            height: "260px",
            total: categoryData[0],
            ignoreEmptyValues: true,
            showLabel: false,
            //chartPadding: 30,
            //labelOffset: 50,
            //labelDirection: 'explode',
            //labelInterpolationFnc: function(value, idx) {
            //  var percentage = Math.round(value / categoryData[0] * 100) + '%';
            //  return categories[idx] + ' ' + percentage;
            //},
            plugins: [
              Legend({
                clickable: false,
              })
            ]
          },
          responsiveOptions: [
            [
              "screen and (max-width: 420px)",
              {
                width: "130px",
                height: "130px"
              }
            ],
            [
              "screen and (max-width: 600px)",
              {
                width: "170px",
                height: "170px"
              }
            ],
            [
              "screen and (max-width: 767px)",
              {
                width: "200px",
                height: "200px"
              }
            ]
          ],
        }
        return (
          <ChartistGraph
            className="ct-pie"
            data={categoryChart.data}
            options={categoryChart.options}
            responsiveOptions={categoryChart.responsiveOptions}
            type="Pie"
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
            width: 750,
            height: 320,
            low: 0,
            high: 2500,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 20,
              left: 20
            },
            plugins: [
              ctAxisTitle({
                axisX: {
                  axisTitle: "Months",
                  axisClass: "graphs-axis",
                  textAnchor: "middle",
                  offset: {
                    y: 40
                  }
                },
                axisY: {
                  axisTitle: "Value ($)",
                  axisClass: "graphs-axis",
                  offset: {
                    x: 5,
                    y: 10
                  },
                  flipTitle: true
                }
              })
            ]
          },
          responsiveOptions: [
            [
              "screen and (max-width: 420px)",
              {
                seriesBarDistance: 5,
                axisX: {
                  labelInterpolationFnc: function(value) {
                    return value[0];
                  }
                },
                width: 150,
                chartPadding: {
                  right: 130,
                  left: 10
                },
              }
            ],
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
              "screen and (max-width: 1250px)",
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
        }
        return (
          <ChartistGraph
            data={savingsChart.data}
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
      {categoryInformation()}
      {savingInformation()}
    </>
  )
}

export default Graphs;