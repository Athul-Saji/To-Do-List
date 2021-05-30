add = document.getElementById("add");
add.addEventListener("click", get_and_update);
update();

clr = document.getElementById("clear");
clr.addEventListener("click", clear);

//Adding items (tasks, desc, date) to the local storage
function get_and_update() {
    console.log("Updating List...");
    tsk = document.getElementById('Task').value;
    desc = document.getElementById('Description').value;
    d_te = document.getElementById('Date').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemsArray = [];
        itemsArray.push([tsk, desc, d_te]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsArray))
    }
    else {
        itemsArray = JSON.parse(localStorage.getItem('itemsJson'));
        itemsArray.push([tsk, desc, d_te]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsArray));
    }
    //Updating the table
    update();
}

function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemsArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsArray))
    }
    else {
        itemsArray = JSON.parse(localStorage.getItem('itemsJson'));
        localStorage.setItem('itemsJson', JSON.stringify(itemsArray));
    }
    let tablebody = document.getElementById("table-body");
    let str = "";
    itemsArray.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td><button type="submit" class="btn btn-primary btn-sm" onclick="deleted(${index})">Done</button></td>
        </tr>`;
    });
    tablebody.innerHTML = str;
}

function deleted(itemIndex) {
    itemsArray = JSON.parse(localStorage.getItem('itemsJson'));
    itemsArray.splice(itemIndex, 1); //Deletes 1 element from the given index
    localStorage.setItem('itemsJson', JSON.stringify(itemsArray));
    update();
}

function clear() {
    if (confirm("Do you really want to clear?")) {
        localStorage.removeItem("itemsJson");
        update();
    }
}