
var removeAddButtons = document.querySelectorAll('.Remove_add');

var itemsDetails = document.getElementById('items_details');


var selectedItems = [];


removeAddButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
        var buttonText = button.querySelector('p:first-child').textContent.trim();
        var item = button.closest('.name_price_container1');
        var itemName = item.querySelector('.name_price_list p:first-child').textContent.trim();
        var itemPrice = parseFloat(item.querySelector('.container1_list_price').textContent.trim().replace('₹', ''));

        if (buttonText === "Add item") {
            button.querySelector('p:first-child').textContent = "Remove item";
            item.classList.add('added');
            selectedItems.push({ name: itemName, price: itemPrice });
            updateDisplay();
        } else {
            button.querySelector('p:first-child').textContent = "Add item";
            item.classList.remove('added');
         
            selectedItems = selectedItems.filter(function(item) {
                return item.name !== itemName;
            });
            updateDisplay();
        }
    });
});


function updateButtonText() {
    var addButtonTxt = selectedItems.length === 0 ? "Add item" : `Remove item`;
    document.querySelectorAll('.additem').forEach(function(button) {
        button.querySelector('p:first-child').innerHTML = addButtonTxt;
    });
}

function updateDisplay() {
   
    itemsDetails.innerHTML = '';

 
    if (selectedItems.length === 0) {
        itemsDetails.innerHTML = `
            <div class="default_items" id="defult">
                <img src="info.png" alt="" height="38px">
                <p class="big_txt">No Items Added</p>
                <p>Add items to the cart from the service bar</p>
            </div>
        `;
        document.getElementById("booknow_btns").style.opacity = "0.5";
    } else {

        selectedItems.forEach(function(item, index) {
            var itemElement = document.createElement('div');
            itemElement.classList.add('content_item');
            itemElement.innerHTML = `
                <p>${index + 1}</p>
                <p>${item.name}</p>
                <p class="carts_price">₹${item.price.toFixed(2)}</p>
            `;
            itemsDetails.appendChild(itemElement);
            document.getElementById("booknow_btns").style.opacity = "1";
        });
    }

    updateTotal();

    updateButtonText();
}

function updateTotal() {
    var totalPriceElement = document.getElementById('total');
    var total = selectedItems.reduce(function(acc, curr) {
        return acc + curr.price;
    }, 0);
    totalPriceElement.textContent = '₹' + total.toFixed(2);
}

document.getElementById("booknow_btns").addEventListener("click", function() {
  
    if (selectedItems.length > 0) {
     
        document.getElementById("message").innerHTML = `<p class="green">Email has Sent Successfully! </p>`;

     
       document.getElementById("id1").textContent ="Add item"
       document.getElementById("id2").textContent ="Add item"
       document.getElementById("id3").textContent ="Add item"
       document.getElementById("id4").textContent ="Add item"
       document.getElementById("id5").textContent ="Add item"
       document.getElementById("id6").textContent ="Add item"

        selectedItems = [];
        updateDisplay();
       
      
    } else {
   
        document.getElementById("message").innerHTML =`<p class="red">Add the items to the cart to book! </p>`;
    }
});


updateDisplay();
