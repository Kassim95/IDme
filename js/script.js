// Get API data
var request = new XMLHttpRequest();
request.open("GET", "https://idme-interview.herokuapp.com/");
request.send();
request.onload = () => {
    console.log(request);
    if (request.status === 200) {
        console.log(JSON.parse(request.response));
        buildList(JSON.parse(request.response));
    } else {
        console.log(`error ${request.status} ${request.statusText}`)
    }
}

// Build table and mobile cards
function buildList(purchases) {
    purchases.forEach(function(purchase) {
        addLineToHTMLTable(purchase.name, purchase.location, purchase.purchaseDate, purchase.category, purchase.description, purchase.price);
        addPurchaseCard(purchase.name, purchase.location, purchase.purchaseDate, purchase.category, purchase.description, purchase.price);
    });
}

// Add a line to the HTML table
function addLineToHTMLTable(name, location, purchaseDate, category, description, price) {
    // Get the body of the table
    var tableBody = document.querySelector("#table-body");

    // Add a new row at the end of the table
    var newRow = tableBody.insertRow();

    // add  new cells to the row
    var blankCell = newRow.insertCell();
    blankCell.innerHTML = `<div class="td-blank"></div>`;

    var nameCell = newRow.insertCell();
    nameCell.innerHTML = `<p class="d-name">${name}</p>`;

    var locationCell = newRow.insertCell();
    locationCell.innerHTML = `<img class="d-location" src="${location}" alt="img">`;

    var purchaseDateCell = newRow.insertCell();
    purchaseDateCell.innerHTML = `<p class="d-purchase-date">${new Date(purchaseDate).toLocaleDateString('en-us', {year:"numeric", month:"long", day:"numeric"})}</p>`;

    var categoryCell = newRow.insertCell();
    categoryCell.innerHTML = `<p class="d-category ${category.toLowerCase()}">${category}</p>`;

    var descriptionCell = newRow.insertCell();
    descriptionCell.innerHTML = `<p class="d-description">${description}</p>`;

    var priceCell = newRow.insertCell();
    priceCell.innerHTML = `<p class="d-price">${price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>`;

    var ellipsisCell = newRow.insertCell();
    ellipsisCell.innerHTML = `<img class="d-ellipsis" src="./assets/images/ellipsis.png" alt="ellipsis" />`;
}

// Create card element
function addPurchaseCard(name, location, purchaseDate, category, description, price) {
    document.querySelector("#m-container").innerHTML += `<div class="m-card"><section class="first-section"><img class="m-location" src="${location}" alt="img"><div class="m-name">${name}</div><div class= m-price>${price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div></section><section class="second-section"><div class="m-description">${description}</div><div class="purchase-date-label"><p>Purchase Date</p></div><div class="m-purchase-date">${new Date(purchaseDate).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}</div></section></div>`;
}
