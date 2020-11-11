import { API, graphqlOperation } from 'aws-amplify';
import { listSavings, listSpendings } from '../../graphql/queries';
import { createSaving, updateSaving, createSpending, updateSpending } from '../../graphql/mutations';

export async function getSavingRepeat() {
  const today = new Date();

  const monthly = "Repeating monthly";
  const weekly = "Repeating weekly";
  const yearly = "Repeating yearly";


  try {
    let filter = {
      or: [
        { repeat: { eq: "Weekly" } },
        { repeat: { eq: "Monthly" } },
        { repeat: { eq: "Yearly" } },
        { repeat: { eq: "Repeating weekly" } },
        { repeat: { eq: "Repeating monthly" } },
        { repeat: { eq: "Repeating yearly" } },
      ]

    };

    const savingsData = await API.graphql(graphqlOperation(listSavings, { filter: filter }));
    const savingsList = savingsData.data.listSavings.items;
    var dataDate = new Date();
    var diff, diffDays, diffMonths;
    var i, j


    for ( i = 0; i < savingsList.length; i++) {
      switch (savingsList[i].repeat) {
        case "Weekly":
          dataDate.setMonth(savingsList[i].month - 1);
          dataDate.setDate(savingsList[i].day);
          dataDate.setFullYear(savingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            if (!savingsList[i].repeated) {
              diff = Math.round((today.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24 * 7))
              console.log(diff, 'ello')
              try {
                await API.graphql({
                  query: updateSaving,
                  variables: {
                    input: {
                      id: savingsList[i].id,
                      repeated: true
                    }
                  }
                })
                console.log('Saving repeated updated!');
              } catch (err) {
                console.log('Saving repeated could not update', err);
              }
              for ( j = 0; j < diff; j++) {
                dataDate.setDate(dataDate.getDate() + ((j + 1) * 7));
                try {
                  await API.graphql({
                    query: createSaving,
                    variables: {
                      input: {
                        month: ('0' + (dataDate.getMonth() + 1)).slice(-2),
                        day: ('0' + dataDate.getDate()).slice(-2),
                        year: dataDate.getFullYear(),
                        name: savingsList[i].name,
                        value: savingsList[i].value,
                        repeat: weekly,
                        note: savingsList[i].note,
                        repeated: true
                      }
                    }
                  })
                  console.log('Repeating weekly created');
                } catch (err) {
                  console.log({ err });
                }
                dataDate.setDate(dataDate.getDate() - ((j + 1) * 7));
              }
            }
          }
          break;

        case "Monthly":
          dataDate.setMonth(savingsList[i].month - 1);
          dataDate.setDate(savingsList[i].day);
          dataDate.setFullYear(savingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            if (!savingsList[i].repeated) {
              diff = (today.getMonth() - dataDate.getMonth()) + (12 * (today.getFullYear() - dataDate.getFullYear()));
              diffDays = today.getDate() - dataDate.getDate();
              if (diffDays < 0) {
                diff--;
              }
              try {
                await API.graphql({
                  query: updateSaving,
                  variables: {
                    input: {
                      id: savingsList[i].id,
                      repeated: true
                    }
                  }
                })
                console.log('Saving repeated updated!');
              } catch (err) {
                console.log('Saving repeated could not update', err);
              }
              for ( j = 0; j < diff; j++) {
                dataDate.setMonth(dataDate.getMonth() + (j + 1));
                try {
                  await API.graphql({
                    query: createSaving,
                    variables: {
                      input: {
                        month: ('0' + (dataDate.getMonth() + 1)).slice(-2),
                        day: ('0' + dataDate.getDate()).slice(-2),
                        year: dataDate.getFullYear(),
                        name: savingsList[i].name,
                        value: savingsList[i].value,
                        repeat: monthly,
                        note: savingsList[i].note,
                        repeated: true
                      }
                    }
                  })
                  console.log('Repeating monthly created');
                } catch (err) {
                  console.log({ err });
                }
                dataDate.setMonth(dataDate.getMonth() - (j + 1))
              }
            }
          }
          break;

        case "Yearly":
          dataDate.setMonth(savingsList[i].month - 1);
          dataDate.setDate(savingsList[i].day);
          dataDate.setFullYear(savingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            if (!savingsList[i].repeated) {
              diff = (today.getFullYear() - dataDate.getFullYear());
              diffMonths = today.getMonth() - dataDate.getMonth();
              diffDays = today.getDate() - dataDate.getDate();
              if (diffMonths < 0) {
                diff--;
              }
              else if (diffMonths == 0) {
                if (diffDays < 0) {
                  diff--;
                }
              }
              console.log(diff)
              try {
                await API.graphql({
                  query: updateSaving,
                  variables: {
                    input: {
                      id: savingsList[i].id,
                      repeated: true
                    }
                  }
                })
                console.log('Saving repeated updated!');
              } catch (err) {
                console.log('Saving repeated could not update', err);
              }
              for ( j = 0; j < diff; j++) {
                dataDate.setFullYear(dataDate.getFullYear() + (j + 1));
                try {
                  await API.graphql({
                    query: createSaving,
                    variables: {
                      input: {
                        month: savingsList[i].month,
                        day: savingsList[i].day,
                        year: dataDate.getFullYear(),
                        name: savingsList[i].name,
                        value: savingsList[i].value,
                        repeat: yearly,
                        note: savingsList[i].note,
                        repeated: true
                      }
                    }
                  })
                  console.log('Repeating year created');
                } catch (err) {
                  console.log({ err });
                }
                dataDate.setFullYear(dataDate.getFullYear() - (j + 1))
              }
            }
          }
          break;

        case "Repeating weekly":
          dataDate.setMonth(savingsList[i].month - 1);
          dataDate.setDate(savingsList[i].day);
          dataDate.setFullYear(savingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            diff = Math.round((today.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24 * 7))
            if (((savingsList[i].month) === ('0' + (dataDate.getMonth() + 1)).slice(-2)) && (savingsList[i].day === ('0' + dataDate.getDate()).slice(-2)) && (savingsList[i].year === ('' + dataDate.getFullYear()).slice(0))) {
              console.log('repeated already')
            }
            else {
              if (diff > 0) {
                for ( j = 0; j < diff; j++) {
                  dataDate.setDate(dataDate.getDate() + ((j + 1) * 7));
                  try {
                    await API.graphql({
                      query: createSaving,
                      variables: {
                        input: {
                          month: ('0' + (dataDate.getMonth() + 1)).slice(-2),
                          day: ('0' + dataDate.getDate()).slice(-2),
                          year: dataDate.getFullYear(),
                          name: savingsList[i].name,
                          value: savingsList[i].value,
                          repeat: weekly,
                          note: savingsList[i].note,
                          repeated: true
                        }
                      }
                    })
                    console.log('CREATE');
                  } catch (err) {
                    console.log({ err });
                  }
                  dataDate.setDate(dataDate.getDate() - ((j + 1) * 7));
                }
              }
            }

          }
          break;

        case "Repeating monthly":
          dataDate.setMonth(savingsList[i].month - 1);
          dataDate.setDate(savingsList[i].day);
          dataDate.setFullYear(savingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            diff = (today.getMonth() - dataDate.getMonth()) + (12 * (today.getFullYear() - dataDate.getFullYear()));
            diffDays = today.getDate() - dataDate.getDate();
            if (diffDays < 0) {
              diff--;
            }
            if (((savingsList[i].month) === ('0' + (dataDate.getMonth() + 1)).slice(-2)) && (savingsList[i].day === ('0' + dataDate.getDate()).slice(-2)) && (savingsList[i].year === ('' + dataDate.getFullYear()).slice(0))) {
              console.log('repeated already')
            }
            else {
              if (diff > 0) {
                for ( j = 0; j < diff; j++) {
                  dataDate.setMonth(dataDate.getMonth() + (j + 1));
                  try {
                    await API.graphql({
                      query: createSaving,
                      variables: {
                        input: {
                          month: ('0' + (dataDate.getMonth() + 1)).slice(-2),
                          day: ('0' + dataDate.getDate()).slice(-2),
                          year: dataDate.getFullYear(),
                          name: savingsList[i].name,
                          value: savingsList[i].value,
                          repeat: monthly,
                          note: savingsList[i].note,
                          repeated: true
                        }
                      }
                    })
                    console.log('CREATE');
                  } catch (err) {
                    console.log({ err });
                  }
                  dataDate.setMonth(dataDate.getMonth() - (j + 1))
                }
              }
            }

          }
          break;

        case "Repeating yearly":
          dataDate.setMonth(savingsList[i].month - 1);
          dataDate.setDate(savingsList[i].day);
          dataDate.setFullYear(savingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            diff = (today.getFullYear() - dataDate.getFullYear());
            diffMonths = today.getMonth() - dataDate.getMonth();
            diffDays = today.getDate() - dataDate.getDate();
            if (diffMonths < 0) {
              diff--;
            }
            else if (diffMonths == 0) {
              if (diffDays < 0) {
                diff--;
              }
            }
            if (((savingsList[i].month) === ('0' + (dataDate.getMonth() + 1)).slice(-2)) && (savingsList[i].day === ('0' + dataDate.getDate()).slice(-2)) && (savingsList[i].year === ('' + dataDate.getFullYear()).slice(0))) {
              console.log('repeated already')
            }
            else {
              if (diff > 0) {
                for ( j = 0; j < diff; j++) {
                  dataDate.setFullYear(dataDate.getFullYear() + (j + 1));
                  try {
                    await API.graphql({
                      query: createSaving,
                      variables: {
                        input: {
                          month: savingsList[i].month,
                          day: savingsList[i].day,
                          year: dataDate.getFullYear(),
                          name: savingsList[i].name,
                          value: savingsList[i].value,
                          repeat: yearly,
                          note: savingsList[i].note,
                          repeated: true
                        }
                      }
                    })
                    console.log('CREATE');
                  } catch (err) {
                    console.log({ err });
                  }
                  dataDate.setFullYear(dataDate.getFullYear() - (j + 1))
                }
              }
            }

          }
          break;

        default:
          console.log('Not repeating');
      }
    }

  } catch (error) {
    return "Error getting saving repeat";
  }
}

export async function getSpendingRepeat() {
  const today = new Date();

  const monthly = "Repeating monthly";
  const weekly = "Repeating weekly";
  const yearly = "Repeating yearly";
  var i, j

  try {
    let filter = {
      or: [
        { repeat: { eq: "Weekly" } },
        { repeat: { eq: "Monthly" } },
        { repeat: { eq: "Yearly" } },
        { repeat: { eq: "Repeating weekly" } },
        { repeat: { eq: "Repeating monthly" } },
        { repeat: { eq: "Repeating yearly" } },
      ]

    };

    const spendingsData = await API.graphql(graphqlOperation(listSpendings, { filter: filter }));
    const spendingsList = spendingsData.data.listSpendings.items;
    var dataDate = new Date();
    var diff, diffDays, diffMonths;


    for ( i = 0; i < spendingsList.length; i++) {
      switch (spendingsList[i].repeat) {
        case "Weekly":
          dataDate.setMonth(spendingsList[i].month - 1);
          dataDate.setDate(spendingsList[i].day);
          dataDate.setFullYear(spendingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            if (!spendingsList[i].repeated) {
              diff = Math.round((today.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24 * 7))
              try {
                await API.graphql({
                  query: updateSpending,
                  variables: {
                    input: {
                      id: spendingsList[i].id,
                      repeated: true
                    }
                  }
                })
                console.log('spending repeated updated!');
              } catch (err) {
                console.log('spending repeated could not update', err);
              }
              for ( j = 0; j < diff; j++) {
                dataDate.setDate(dataDate.getDate() + ((j + 1) * 7));
                try {
                  await API.graphql({
                    query: createSpending,
                    variables: {
                      input: {
                        month: ('0' + (dataDate.getMonth() + 1)).slice(-2),
                        day: ('0' + dataDate.getDate()).slice(-2),
                        year: dataDate.getFullYear(),
                        name: spendingsList[i].name,
                        value: spendingsList[i].value,
                        category: spendingsList[i].category,
                        repeat: weekly,
                        note: spendingsList[i].note,
                        payment: spendingsList[i].payment,
                        repeated: true
                      }
                    }
                  })
                  console.log('Repeating weekly created');
                } catch (err) {
                  console.log({ err });
                }
                dataDate.setDate(dataDate.getDate() - ((j + 1) * 7));
              }
            }
          }
          break;

        case "Monthly":
          dataDate.setMonth(spendingsList[i].month - 1);
          dataDate.setDate(spendingsList[i].day);
          dataDate.setFullYear(spendingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            if (!spendingsList[i].repeated) {
              diff = (today.getMonth() - dataDate.getMonth()) + (12 * (today.getFullYear() - dataDate.getFullYear()));
              diffDays = today.getDate() - dataDate.getDate();
              if (diffDays < 0) {
                diff--;
              }
              try {
                await API.graphql({
                  query: updateSpending,
                  variables: {
                    input: {
                      id: spendingsList[i].id,
                      repeated: true
                    }
                  }
                })
                console.log('spending repeated updated!');
              } catch (err) {
                console.log('spending repeated could not update', err);
              }
              for ( j = 0; j < diff; j++) {
                dataDate.setMonth(dataDate.getMonth() + (j + 1));
                try {
                  await API.graphql({
                    query: createSpending,
                    variables: {
                      input: {
                        month: ('0' + (dataDate.getMonth() + 1)).slice(-2),
                        day: ('0' + dataDate.getDate()).slice(-2),
                        year: dataDate.getFullYear(),
                        name: spendingsList[i].name,
                        value: spendingsList[i].value,
                        category: spendingsList[i].category,
                        repeat: monthly,
                        note: spendingsList[i].note,
                        payment: spendingsList[i].payment,
                        repeated: true
                      }
                    }
                  })
                  console.log('Repeating monthly created');
                } catch (err) {
                  console.log({ err });
                }
                dataDate.setMonth(dataDate.getMonth() - (j + 1))
              }
            }
          }
          break;

        case "Yearly":
          dataDate.setMonth(spendingsList[i].month - 1);
          dataDate.setDate(spendingsList[i].day);
          dataDate.setFullYear(spendingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            if (!spendingsList[i].repeated) {
              diff = (today.getFullYear() - dataDate.getFullYear());
              diffMonths = today.getMonth() - dataDate.getMonth();
              diffDays = today.getDate() - dataDate.getDate();
              if (diffMonths < 0) {
                diff--;
              }
              else if (diffMonths == 0) {
                if (diffDays < 0) {
                  diff--;
                }
              }
              console.log(diff)
              try {
                await API.graphql({
                  query: updateSpending,
                  variables: {
                    input: {
                      id: spendingsList[i].id,
                      repeated: true
                    }
                  }
                })
                console.log('Spending repeated updated!');
              } catch (err) {
                console.log('Spending repeated could not update', err);
              }
              for ( j = 0; j < diff; j++) {
                dataDate.setFullYear(dataDate.getFullYear() + (j + 1));
                try {
                  await API.graphql({
                    query: createSpending,
                    variables: {
                      input: {
                        month: spendingsList[i].month,
                        day: spendingsList[i].day,
                        year: dataDate.getFullYear(),
                        name: spendingsList[i].name,
                        value: spendingsList[i].value,
                        category: spendingsList[i].category,
                        repeat: yearly,
                        note: spendingsList[i].note,
                        payment: spendingsList[i].payment,
                        repeated: true
                      }
                    }
                  })
                  console.log('Repeating year created');
                } catch (err) {
                  console.log({ err });
                }
                dataDate.setFullYear(dataDate.getFullYear() - (j + 1))
              }
            }
          }
          break;

        case "Repeating weekly":
          dataDate.setMonth(spendingsList[i].month - 1);
          dataDate.setDate(spendingsList[i].day);
          dataDate.setFullYear(spendingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            diff = Math.round((today.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24 * 7))
            if (((spendingsList[i].month) === ('0' + (dataDate.getMonth() + 1)).slice(-2)) && (spendingsList[i].day === ('0' + dataDate.getDate()).slice(-2)) && (spendingsList[i].year === ('' + dataDate.getFullYear()).slice(0))) {
              console.log('repeated already')
            }
            else {
              if (diff > 0) {
                for ( j = 0; j < diff; j++) {
                  dataDate.setDate(dataDate.getDate() + ((j + 1) * 7));
                  try {
                    await API.graphql({
                      query: createSpending,
                      variables: {
                        input: {
                          month: ('0' + (dataDate.getMonth() + 1)).slice(-2),
                          day: ('0' + dataDate.getDate()).slice(-2),
                          year: dataDate.getFullYear(),
                          name: spendingsList[i].name,
                          value: spendingsList[i].value,
                          category: spendingsList[i].category,
                          repeat: weekly,
                          note: spendingsList[i].note,
                          payment: spendingsList[i].payment,
                          repeated: true
                        }
                      }
                    })
                    console.log('CREATE');
                  } catch (err) {
                    console.log({ err });
                  }
                  dataDate.setDate(dataDate.getDate() - ((j + 1) * 7));
                }
              }
            }

          }
          break;

        case "Repeating monthly":
          dataDate.setMonth(spendingsList[i].month - 1);
          dataDate.setDate(spendingsList[i].day);
          dataDate.setFullYear(spendingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            diff = (today.getMonth() - dataDate.getMonth()) + (12 * (today.getFullYear() - dataDate.getFullYear()));
            diffDays = today.getDate() - dataDate.getDate();
            if (diffDays < 0) {
              diff--;
            }
            if (((spendingsList[i].month) === ('0' + (dataDate.getMonth() + 1)).slice(-2)) && (spendingsList[i].day === ('0' + dataDate.getDate()).slice(-2)) && (spendingsList[i].year === ('' + dataDate.getFullYear()).slice(0))) {
              console.log('repeated already')
            }
            else {
              if (diff > 0) {
                for ( j = 0; j < diff; j++) {
                  dataDate.setMonth(dataDate.getMonth() + (j + 1));
                  try {
                    await API.graphql({
                      query: createSpending,
                      variables: {
                        input: {
                          month: ('0' + (dataDate.getMonth() + 1)).slice(-2),
                          day: ('0' + dataDate.getDate()).slice(-2),
                          year: dataDate.getFullYear(),
                          name: spendingsList[i].name,
                          value: spendingsList[i].value,
                          category: spendingsList[i].category,
                          repeat: monthly,
                          note: spendingsList[i].note,
                          payment: spendingsList[i].payment,
                          repeated: true
                        }
                      }
                    })
                    console.log('CREATE');
                  } catch (err) {
                    console.log({ err });
                  }
                  dataDate.setMonth(dataDate.getMonth() - (j + 1))
                }
              }
            }

          }
          break;

        case "Repeating yearly":
          dataDate.setMonth(spendingsList[i].month - 1);
          dataDate.setDate(spendingsList[i].day);
          dataDate.setFullYear(spendingsList[i].year);
          if (today.getTime() > dataDate.getTime()) {
            diff = (today.getFullYear() - dataDate.getFullYear());
            diffMonths = today.getMonth() - dataDate.getMonth();
            diffDays = today.getDate() - dataDate.getDate();
            if (diffMonths < 0) {
              diff--;
            }
            else if (diffMonths == 0) {
              if (diffDays < 0) {
                diff--;
              }
            }
            if (((spendingsList[i].month) === ('0' + (dataDate.getMonth() + 1)).slice(-2)) && (spendingsList[i].day === ('0' + dataDate.getDate()).slice(-2)) && (spendingsList[i].year === ('' + dataDate.getFullYear()).slice(0))) {
              console.log('repeated already')
            }
            else {
              if (diff > 0) {
                for ( j = 0; j < diff; j++) {
                  dataDate.setFullYear(dataDate.getFullYear() + (j + 1));
                  try {
                    await API.graphql({
                      query: createSpending,
                      variables: {
                        input: {
                          month: spendingsList[i].month,
                          day: spendingsList[i].day,
                          year: dataDate.getFullYear(),
                          name: spendingsList[i].name,
                          value: spendingsList[i].value,
                          category: spendingsList[i].category,
                          repeat: yearly,
                          note: spendingsList[i].note,
                          payment: spendingsList[i].payment,
                          repeated: true
                        }
                      }
                    })
                    console.log('CREATE');
                  } catch (err) {
                    console.log({ err });
                  }
                  dataDate.setFullYear(dataDate.getFullYear() - (j + 1))
                }
              }
            }

          }
          break;

        default:
          console.log('Not repeating');
      }
    }
    

  } catch (error) {
    return "Error getting spending repeat";
  }
  
}