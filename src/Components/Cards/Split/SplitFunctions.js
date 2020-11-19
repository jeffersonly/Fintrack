function calculateTaxTip (total, percent) {
  const value = percent/100;
  return Number((total * value).toFixed(2));
}

function calculateTotal (total, tax, tip) {
  return Number((total + tax + tip).toFixed(2));
}

//prevent submitting by hitting "enter"
function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

module.exports = {
  calculateTaxTip,
  calculateTotal,
  onKeyDown
}