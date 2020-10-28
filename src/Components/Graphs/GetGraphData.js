import { API, graphqlOperation } from 'aws-amplify';
import { listSavings } from '../../graphql/queries';

export async function calculateSavingsMonthTotal () {

  const today = new Date();

  try {
    let janTotal = 0;
    let febTotal = 0;
    let marTotal = 0;
    let aprTotal = 0;
    let mayTotal = 0;
    let junTotal = 0;
    let julTotal = 0;
    let augTotal = 0;
    let sepTotal = 0;
    let octTotal = 0;
    let novTotal = 0;
    let decTotal = 0;

    let filter = {
      year: {
        eq: today.getFullYear()
      }
    };
    
    const savingsData = await API.graphql(graphqlOperation(listSavings, {filter: filter}));
    const savingsList = savingsData.data.listSavings.items;
    //console.log(savingsList[0].value);
    for (var i = 0; i < savingsList.length; i++) {
      switch (savingsList[i].month) {
        case "01":
          janTotal = janTotal + savingsList[i].value;
          break;
        case "02":
          febTotal = febTotal + savingsList[i].value;
          break;
        case "03":
          marTotal = marTotal + savingsList[i].value;
          break;
        case "04":
          aprTotal = aprTotal + savingsList[i].value;
          break;
        case "05":
          mayTotal = mayTotal + savingsList[i].value;
          break;
        case "06":
          junTotal = junTotal + savingsList[i].value;
          break;
        case "07":
          julTotal = julTotal + savingsList[i].value;
          break;
        case "08":
          augTotal = augTotal + savingsList[i].value;
          break;
        case "09":
          sepTotal = sepTotal + savingsList[i].value;
          break;
        case "10":
          octTotal = octTotal + savingsList[i].value;
          break;
        case "11":
          novTotal = novTotal + savingsList[i].value;
          break;
        case "12":
          decTotal = decTotal + savingsList[i].value;
          break;
        default:
          break;
      }
    }
    return [janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal];
  } catch (error) {
    return "There was an error.";
  }
}