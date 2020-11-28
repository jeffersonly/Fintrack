import { API, graphqlOperation } from 'aws-amplify';
import { listSavings, listSpendings } from '../../graphql/queries';

const today = new Date();

let filter = {
  year: {
    eq: today.getFullYear()
  }
};

export async function calculateSavingsMonthTotal() {

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
    
    const savingsData = await API.graphql(graphqlOperation(listSavings, {filter: filter}));
    const savingsList = savingsData.data.listSavings.items;
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
    return "There was an error getting savings.";
  }
}

export async function calculateSpendingsMonthTotal() {

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
    
    const spendingsData = await API.graphql(graphqlOperation(listSpendings, {filter: filter}));
    const spendingsList = spendingsData.data.listSpendings.items;
    for (var i = 0; i < spendingsList.length; i++) {
      switch (spendingsList[i].month) {
        case "01":
          janTotal = janTotal + spendingsList[i].value;
          break;
        case "02":
          febTotal = febTotal + spendingsList[i].value;
          break;
        case "03":
          marTotal = marTotal + spendingsList[i].value;
          break;
        case "04":
          aprTotal = aprTotal + spendingsList[i].value;
          break;
        case "05":
          mayTotal = mayTotal + spendingsList[i].value;
          break;
        case "06":
          junTotal = junTotal + spendingsList[i].value;
          break;
        case "07":
          julTotal = julTotal + spendingsList[i].value;
          break;
        case "08":
          augTotal = augTotal + spendingsList[i].value;
          break;
        case "09":
          sepTotal = sepTotal + spendingsList[i].value;
          break;
        case "10":
          octTotal = octTotal + spendingsList[i].value;
          break;
        case "11":
          novTotal = novTotal + spendingsList[i].value;
          break;
        case "12":
          decTotal = decTotal + spendingsList[i].value;
          break;
        default:
          break;
      }
    }
    return [janTotal, febTotal, marTotal, aprTotal, mayTotal, junTotal, julTotal, augTotal, sepTotal, octTotal, novTotal, decTotal];
  } catch (error) {
    return "There was an error getting spendings.";
  }
}

export async function spendingsCategory() {

  try {
    let bank = 0;
    let clothing = 0;
    let education = 0;
    let entertainment = 0;
    let food = 0;
    let housing = 0;
    let insurance = 0;
    let medical = 0;
    let personal = 0;
    let transportation = 0;
    let utilities = 0;
    let other = 0;
    
    const spendingsData = await API.graphql(graphqlOperation(listSpendings, {filter: filter}));
    const spendingsList = spendingsData.data.listSpendings.items;
    for (var i = 0; i < spendingsList.length; i++) {
      switch (spendingsList[i].category) {
        case "Banking":
          bank = bank + spendingsList[i].value;
          break;
        case "Clothing":
          clothing = clothing + spendingsList[i].value;
          break;
        case "Education":
          education = education + spendingsList[i].value;
          break;
        case "Entertainment":
          entertainment = entertainment + spendingsList[i].value;
          break;
        case "Food":
          food = food + spendingsList[i].value;
          break;
        case "Housing":
          housing = housing + spendingsList[i].value;
          break;
        case "Insurance":
          insurance = insurance + spendingsList[i].value;
          break;
        case "Medical/Health Care":
          medical = medical + spendingsList[i].value;
          break;
        case "Personal":
          personal = personal + spendingsList[i].value;
          break;
        case "Transportation":
          transportation = transportation + spendingsList[i].value;
          break;
        case "Utilities":
          utilities = utilities + spendingsList[i].value;
          break;
        case "Other":
          other = other + spendingsList[i].value;
          break;
        default:
          break;
      }
    }
    const total = bank + clothing + education + entertainment + food + housing
                  + insurance + medical + personal + transportation + utilities + other;
    return [total, bank, clothing, education, entertainment, food, housing, 
          insurance, medical, personal, transportation, utilities, other];
  } catch (error) {
    return "There was an error getting spendings.";
  }
}