// Find a way to give user sorting functionality here
// Allow the user to flip through pages of their information

// var pagination = document.getElementById('pagination');

// var node = document.createElement('div');
// var textnode = document.createTextNode('test');
// node.appendChild(textnode);

// pagination.appendChild(node);

// Get elements
results = document.getElementById('results');
displaynumbers = document.getElementById('display-numbers');

// Get amount of results
var textnode = document.createTextNode(items.length);
results.insertBefore(textnode, results.childNodes[0]);

// Show default amt
show_amt = document.querySelector('.show-dropbtn').innerHTML.split("<")[0];
insertData(show_amt, 0);
setPagination(show_amt);

// Insert Data
function insertData(end, start) {
    // Show the data to the specified row (amt)
    // need to change the args later. end then start is just stupid.

    if (end > items.length){
        end = items.length;
    }

    // clear table
    table = document.querySelector('.table-data').childNodes;
    table[1].innerHTML = "";
    table[3].innerHTML = "";
    table[5].innerHTML = "";
    table[7].innerHTML = "";

    // column 1 -> Item
    for (i = start; i < end; i++) {
        if (i % 2 == 0) {
            var t = document.createElement('div');
            t.setAttribute('class', 'elem altmain');
            t.innerText = items[i][2]; // item
        } else {
            var t = document.createElement('div');
            t.setAttribute('class', 'elem');
            t.innerText = items[i][2]; // item
        }
        table[1].appendChild(t);
    }

    // column 1 -> Amount
    for (i = start; i < end; i++) {
        if (i % 2 == 0) {
            var t = document.createElement('div');
            t.setAttribute('class', 'elem altmain');
            t.innerText = '$' + items[i][3]; // amount
        } else {
            var t = document.createElement('div');
            t.setAttribute('class', 'elem');
            t.innerText = '$' + items[i][3]; // amount
        }
        table[3].appendChild(t);
    }

    // column 1 -> Category
    for (i = start; i < end; i++) {
        if (i % 2 == 0) {
            var t = document.createElement('div');
            t.setAttribute('class', 'elem altmain');
            t.innerText = items[i][4]; // category
        } else {
            var t = document.createElement('div');
            t.setAttribute('class', 'elem');
            t.innerText = items[i][4]; // category
        }
        table[5].appendChild(t);
    }

    // column 1 -> Date
    for (i = start; i < end; i++) {
        if (i % 2 == 0) {
            var t = document.createElement('div');
            t.setAttribute('class', 'elem altmain');
            t.innerText = items[i][5]; // date
        } else {
            var t = document.createElement('div');
            t.setAttribute('class', 'elem');
            t.innerText = items[i][5]; // date
        }
        table[7].appendChild(t);
    }
}   

function setPagination(amt) {
    // Set the page links at the right

    pages = document.querySelector('.pages');
    pages.innerHTML = "";
    
    pagenum = items.length/amt;

    if((Math.round(pagenum) != pagenum) && pagenum > 1) {
        pagenum = Math.floor(pagenum) + 1;
        console.log(pagenum)
    } 
    else {
       pagenum = 1;
    }

    // Insert the page links
    for(i = 0; i < pagenum; i++) {
        var elem = document.createElement('div');
        elem.setAttribute('class', 'pages-inside');
        var a = document.createElement('a');
        a.setAttribute('href', 'javascript:gotoPage(' + (i+1) + ')')
        a.innerText = i+1;
        elem.appendChild(a);
        pages.appendChild(elem);
    }

    pages.childNodes()[0].setAttribute('class', 'selected');
}

function gotoPage(p) {
    // Shows the page of info given a certain size of page

    var page_length = Number(document.querySelector('.show-dropbtn').innerHTML.split("<")[0]); //amount on page
    var start = page_length * (p-1);// the start of the data in row

    console.log('start ' + start);
    var t = (Number(start) + page_length);
    console.log('end ' + t)
    
    // Put page info
    insertData(start + page_length, start);

    // Change the selected page

}

// Let user change the amount of results they want to show
function showDropdown() {
    // displaynumbers.style.display = 'flex';
    console.log('show');
}

function changeNumDisplayed(e) {
    console.log(e);
    insides = document.querySelector('.show-dropbtn').innerHTML;
    insides = e + insides.slice(2);
    console.log(insides);
    document.querySelector('.show-dropbtn').innerHTML = insides;

    insertData(e,0);
    setPagination(e)
}