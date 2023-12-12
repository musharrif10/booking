document.getElementById('selectyourhotel').addEventListener('change', updateSummary);
document.getElementById('firstname').addEventListener('input', updateSummary);
document.getElementById('lastname').addEventListener('input', updateSummary);
document.getElementById('phonenumber').addEventListener('input', updateSummary);
document.getElementById('email').addEventListener('input', updateSummary);
document.getElementById('singleroom').addEventListener('input', updateSummary);
document.getElementById('doubleroom').addEventListener('input', updateSummary);
document.getElementById('tripleroom').addEventListener('input', updateSummary);

document.getElementById('roomType').addEventListener('change', updateSummary);
document.getElementById('adults').addEventListener('input', updateSummary);
document.getElementById('kids').addEventListener('input', updateSummary);
document.getElementById('checkIn').addEventListener('change', updateSummary);
document.getElementById('checkOut').addEventListener('change', updateSummary);
document.getElementById('wifi').addEventListener('change', updateSummary);
document.getElementById('poolView').addEventListener('change', updateSummary);
document.getElementById('gardenView').addEventListener('change', updateSummary);
document.getElementById('kidsMeals').addEventListener('input', updateSummary);
document.getElementById('extraBed').addEventListener('input', updateSummary);
document.getElementById('promoCode').addEventListener('input', updateSummary);

document.getElementById('calculateButton').addEventListener('click', updateSummary);
document.getElementById('bookNowButton').addEventListener('click', bookNow);
document.getElementById('loyaltyButton').addEventListener('click', checkLoyalty);

let currentCost = 0;
let loyaltyPoints = 0;

// const roomPrices = {
//   single: 25000.00,
//   double: 35000.00,
//   triple: 40000.00
// };

const single = 25000;
const double = 35000;
const triple = 40000;
const bed = 8000;
const mealsExtra = 5000;



function updateSummary() {
  const selectyourhotel = document.getElementById("selectyourhotel").value
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const phonenumber = document.getElementById("phonenumber").value;
  const email = document.getElementById("email").value;
  const singleroom = document.getElementById("singleroom").value;
  const doubleroom = document.getElementById("doubleroom").value;
  const tripleroom = document.getElementById("tripleroom").value;

  const roomType = document.getElementById("roomType").value;
  const adults = parseInt(document.getElementById("adults").value, 10);
  const kids = parseInt(document.getElementById("kids").value, 10);
  const checkInDate = new Date(document.getElementById("checkIn").value);
  const checkOutDate = new Date(document.getElementById("checkOut").value);
  const wifi = document.getElementById("wifi").checked;
  const poolView = document.getElementById("poolView").checked;
  const gardenView = document.getElementById("gardenView").checked;
  const kidsMeals = parseInt(document.getElementById("kidsMeals").value, 10);
  const extraBed = parseInt(document.getElementById("extraBed").value, 10);
  const promoCode = document.getElementById("promoCode").value;


  // Apply promo code discount
  if (promoCode === "Promo123") {
    cost *= 0.05; // 5% discount
  }

  // currentCost = cost;

  // Update summary table
  const summaryTable = document.getElementById("summaryTable");
  summaryTable.innerHTML = `

  <tr><td>Select Your Hotel:</td><td>${selectyourhotel}</td></tr>
  <tr><td>First Name:</td><td>${firstname}</td></tr>
  <tr><td>Last Name:</td><td>${lastname}</td></tr>
  <tr><td>Phone Number:</td><td>${phonenumber}</td></tr>
  <tr><td>Email:</td><td>${email}</td></tr>
  <tr><td>No. of Single Rooms:</td><td>${singleroom * single}</td></tr>
  <tr><td>No. of Double Rooms:</td><td>${doubleroom * double}</td></tr>
  <tr><td>No. of Triple Rooms:</td><td>${tripleroom * triple}</td></tr>

  <tr><td>Room Type:</td><td>${roomType}</td></tr>
  <tr><td>Number of Adults:</td><td>${adults}</td></tr>
  <tr><td>Number of Kids:</td><td>${kids}</td></tr>
  <tr><td>Check-in Date:</td><td>${checkInDate.toDateString()}</td></tr>
  <tr><td>Check-out Date:</td><td>${checkOutDate.toDateString()}</td></tr>
  <tr><td>Extra Requirements:</td><td>${wifi ? 'WiFi, ' : ''}${poolView ? 'Pool View, ' : ''}${gardenView ? 'Garden View' : ''}</td></tr>
  <tr><td>Extra Meals for Kids:</td><td>${kidsMeals}</td></tr>
  <tr><td>Extra Bed:</td><td>${extraBed}</td></tr>

`;
}
//<tr><td>Total Cost (LKR):</td><td>${cost.toFixed(2)}</td></tr>

// Calculate the time difference in milliseconds between check-out and check-in dates
// const timeDifference = checkOutDate - checkInDate;

// Calculate the total days by dividing the time difference by the number of milliseconds in a day
// const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
// Calculate total days stay
//const totalDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

function bookNow() {
  // Hide current summary table
  document.getElementById("currentSummary").style.display = "none";

  // Show overall summary table
  document.getElementById("overallSummary").style.display = "block";

  //Update overall summary table

  totalOne = ( (single * singleroom.value) + (double * doubleroom.value) + (triple * tripleroom.value) + (bed * extraBed.value) + (mealsExtra * kidsMeals.value));

  const finalSummaryTable = document.getElementById("finalSummaryTable");
  finalSummaryTable.innerHTML = `
  <tr><td>Total Cost (LKR):</td><td>${totalOne.toFixed(2)}</td></tr>
`;
}

function checkLoyalty() {
  if (document.getElementById("roomType").value === "triple") {
    const selectedRooms = parseInt(document.getElementById("adults").value, 10) +
      parseInt(document.getElementById("kids").value, 10);

    if (selectedRooms > 3) {
      // Store loyalty points in local storage
      loyaltyPoints = 100; // You can set any value as per your loyalty program

      // Display loyalty points
      document.getElementById("loyaltyPoints").style.display = "block";
      document.getElementById("points").textContent = loyaltyPoints;
    } else {
      alert("Loyalty points are available only for bookings with 4 or more rooms.");
    }
  } else {
    alert("Loyalty points are available only for triple rooms.");
  }
}



//Add to favourite - Button
const favButton = document.getElementById('saveFavoriteButton');
favButton.addEventListener('click', saveFav);

// Local Storage Save Details - Add Fav Button Click
function saveFav() {
  // Retrieve existing favorites from local storage
  let savings = JSON.parse(localStorage.getItem('savings')) || [];

  savings.push({
    'Check In Date': (checkIn.value),
    'Check Out Date': (checkOut.value),
    'First Name': (firstname.value),
    'Last Name': (lastname),
    'Phone Number': (phonenumber.value),
    'Email': (email.value),
    'No of Single Rooms': (singleroom.value),
    'No of Double Rooms': (doubleroom.value),
    'No of Triple Rooms': (tripleroom.value),
    'Number of Adults': (adults.value),
    'Number of Kids': (kids.value),
    'Number of Extra Bed': (extraBed.value),
    'Number of Meals': (kidsMeals.value),
    'Adventure type ': (adventuretype.checked),
    
    
  });
  // Keep only the latest favorite (remove the oldest one)
  if (savings.length > 1) {
    savings.shift();
  }
  // Save the updated favorites to local storage
  localStorage.setItem('Details', JSON.stringify(savings));

}
// //'Local Adult': (localadult.value),
// 'Local kid': (localkid.value),
// 'foreign Adult': (foreignadult.value),
// 'foreignkid': (foreignkid.value),
// 'Guide for Adult': (guideforadult.value),
//     'Guide for Kids': (guideforkids.value),
    














///adventure
// Get the input elements
var adventureType = document.getElementById("adventuretype");
var localAdult = document.getElementById("adlocaladult");
var localKid = document.getElementById("adlocalkid");
var foreignAdult = document.getElementById("adforeignadult");
var foreignKid = document.getElementById("adforeignkid");
var guideForAdult = document.getElementById("adguideforadult");
var guideForKids = document.getElementById("adguideforkids");

// Get the table element
var adventureSummaryTable = document.getElementById("adventureSummaryTable");

// Get the cost element
var adventureCost = document.getElementById("adventureCost");

// Define the prices
var localAdultPrice = 5000;
var localKidPrice = 2000;
var foreignAdultPrice = 10000;
var foreignKidPrice = 5000;
var guideForAdultPrice = 1000;
var guideForKidsPrice = 500;

// Define a function to update the table and the cost
function updateTable() {
  // Get the values from the input elements
  var adventureTypeValue = adventureType.value;
  var localAdultValue = localAdult.value;
  var localKidValue = localKid.value;
  var foreignAdultValue = foreignAdult.value;
  var foreignKidValue = foreignKid.value;
  var guideForAdultValue = guideForAdult.checked;
  var guideForKidsValue = guideForKids.checked;

  // Calculate the total cost
  var totalCost = localAdultValue * localAdultPrice + localKidValue * localKidPrice + foreignAdultValue * foreignAdultPrice + foreignKidValue * foreignKidPrice;
  if (guideForAdultValue) {
    totalCost += guideForAdultPrice;
  }
  if (guideForKidsValue) {
    totalCost += guideForKidsPrice;
  }

  // Update the table content
  adventureSummaryTable.innerHTML = `
    <tr>
      <td>Adventure Type</td>
      <td>${adventureTypeValue}</td>
    </tr>
    <tr>
      <td>Local Adult</td>
      <td>${localAdultValue}</td>
    </tr>
    <tr>
      <td>Local Kid</td>
      <td>${localKidValue}</td>
    </tr>
    <tr>
      <td>Foreign Adult</td>
      <td>${foreignAdultValue}</td>
    </tr>
    <tr>
      <td>Foreign Kid</td>
      <td>${foreignKidValue}</td>
    </tr>
    <tr>
      <td>Guide for Adult</td>
      <td>${guideForAdultValue ? "Yes" : "No"}</td>
    </tr>
    <tr>
      <td>Guide for Kids</td>
      <td>${guideForKidsValue ? "Yes" : "No"}</td>
    </tr>
  `;

  adventureSummaryTable.style.display = "table";


  // Update the cost element
  adventureCost.innerHTML = totalCost;
};



// Add event listeners to the input elements to call the updateTable function when they change
adventureType.addEventListener("change", updateTable);
localAdult.addEventListener("change", updateTable);
localKid.addEventListener("change", updateTable);
foreignAdult.addEventListener("change", updateTable);
foreignKid.addEventListener("change", updateTable);
guideForAdult.addEventListener("change", updateTable);
guideForKids.addEventListener("change", updateTable);

// Call the updateTable function once to initialize the table
updateTable();

