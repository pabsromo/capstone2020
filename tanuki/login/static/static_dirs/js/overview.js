

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }

var days = {
    'monday': 1,
    'tuesday': 2,
    'wednesday': 3,
    'thursday': 4,
    'friday': 5,
    'saturday': 6,
    'sunday': 7,
}

function colorOn() {
    document.getElementById("footer").style.backgroundColor = "cadetblue";
    document.getElementById("sunday").style.backgroundColor = "#ff8cf5";
    document.getElementById("saturday").style.backgroundColor = "burlywood";
    document.getElementById("friday").style.backgroundColor = "darkseagreen";
    document.getElementById("thursday").style.backgroundColor = "firebrick";
    document.getElementById("wednesday").style.backgroundColor = "gray";
    document.getElementById("tuesday").style.backgroundColor = "greenyellow";
    document.getElementById("monday").style.backgroundColor = "chocolate";
    //document.getElementById("weekday").style.backgroundColor = "chartreuse";
    document.getElementById("unx7").style.backgroundColor = "burlywood";
    document.getElementById("unx6").style.backgroundColor = "burlywood";
    document.getElementById("unx5").style.backgroundColor = "burlywood";
    document.getElementById("unx4").style.backgroundColor = "burlywood";
    document.getElementById("unx3").style.backgroundColor = "burlywood";
    document.getElementById("unx2").style.backgroundColor = "burlywood";
    document.getElementById("unx1").style.backgroundColor = "burlywood";
    document.getElementById("opt7").style.backgroundColor = "blueviolet";
    document.getElementById("opt6").style.backgroundColor = "blueviolet";
    document.getElementById("opt5").style.backgroundColor = "blueviolet";
    document.getElementById("opt4").style.backgroundColor = "blueviolet";
    document.getElementById("opt3").style.backgroundColor = "blueviolet";
    document.getElementById("opt2").style.backgroundColor = "blueviolet";
    document.getElementById("opt1").style.backgroundColor = "blueviolet";
    document.getElementById("lei7").style.backgroundColor = "beige";
    document.getElementById("lei6").style.backgroundColor = "beige";
    document.getElementById("lei5").style.backgroundColor = "beige";
    document.getElementById("lei4").style.backgroundColor = "beige";
    document.getElementById("lei3").style.backgroundColor = "beige";
    document.getElementById("lei2").style.backgroundColor = "beige";
    document.getElementById("lei1").style.backgroundColor = "beige";
    document.getElementById("ess7").style.backgroundColor = "aquamarine";
    document.getElementById("ess6").style.backgroundColor = "aquamarine";
    document.getElementById("ess5").style.backgroundColor = "aquamarine";
    document.getElementById("ess4").style.backgroundColor = "aquamarine";
    document.getElementById("ess3").style.backgroundColor = "aquamarine";
    document.getElementById("ess2").style.backgroundColor = "aquamarine";
    document.getElementById("ess1").style.backgroundColor = "aquamarine";
    document.getElementById("total").style.backgroundColor = "#ff8cf5";
    document.getElementById("week").style.backgroundColor = "#eeff8c";
    document.getElementsByClassName("week_total")[0].style.backgroundColor = "#8ca0ff";
    document.getElementById("cat_totals").style.backgroundColor = "aqua";

}

function colorOff() {
    document.getElementById("footer").style.backgroundColor = "transparent";
    document.getElementById("sunday").style.backgroundColor = "transparent";
    document.getElementById("saturday").style.backgroundColor = "transparent";
    document.getElementById("friday").style.backgroundColor = "transparent";
    document.getElementById("thursday").style.backgroundColor = "transparent";
    document.getElementById("wednesday").style.backgroundColor = "transparent";
    document.getElementById("tuesday").style.backgroundColor = "transparent";
    document.getElementById("monday").style.backgroundColor = "transparent";
    //document.getElementById("weekday").style.backgroundColor = "transparent";
    document.getElementById("unx7").style.backgroundColor = "transparent";
    document.getElementById("unx6").style.backgroundColor = "transparent";
    document.getElementById("unx5").style.backgroundColor = "transparent";
    document.getElementById("unx4").style.backgroundColor = "transparent";
    document.getElementById("unx3").style.backgroundColor = "transparent";
    document.getElementById("unx2").style.backgroundColor = "transparent";
    document.getElementById("unx1").style.backgroundColor = "transparent";
    document.getElementById("opt7").style.backgroundColor = "transparent";
    document.getElementById("opt6").style.backgroundColor = "transparent";
    document.getElementById("opt5").style.backgroundColor = "transparent";
    document.getElementById("opt4").style.backgroundColor = "transparent";
    document.getElementById("opt3").style.backgroundColor = "transparent";
    document.getElementById("opt2").style.backgroundColor = "transparent";
    document.getElementById("opt1").style.backgroundColor = "transparent";
    document.getElementById("lei7").style.backgroundColor = "transparent";
    document.getElementById("lei6").style.backgroundColor = "transparent";
    document.getElementById("lei5").style.backgroundColor = "transparent";
    document.getElementById("lei4").style.backgroundColor = "transparent";
    document.getElementById("lei3").style.backgroundColor = "transparent";
    document.getElementById("lei2").style.backgroundColor = "transparent";
    document.getElementById("lei1").style.backgroundColor = "transparent";
    document.getElementById("ess7").style.backgroundColor = "transparent";
    document.getElementById("ess6").style.backgroundColor = "transparent";
    document.getElementById("ess5").style.backgroundColor = "transparent";
    document.getElementById("ess4").style.backgroundColor = "transparent";
    document.getElementById("ess3").style.backgroundColor = "transparent";
    document.getElementById("ess2").style.backgroundColor = "transparent";
    document.getElementById("ess1").style.backgroundColor = "transparent";
    document.getElementById("total").style.backgroundColor = "transparent";
    document.getElementById("week").style.backgroundColor = "transparent";
    document.getElementsByClassName("week_total")[0].style.backgroundColor = "transparent";
    document.getElementById("cat_totals").style.backgroundColor = "transparent";
}

function handleForm(event) {
    event.preventDefault();
}

function showPopup(e) {
    document.getElementById(e).style.display = "flex";
}

function hidePopup(e) {
    document.getElementById(e).style.display = "none";
}

function showAdd(e) {
    var forms = document.getElementById(e + "_form");
    //forms.elements["item_day"] = 
    document.getElementById(e).style.display = "flex";
}

function hideAdd(e) {
    document.getElementById(e + "_div").style.display = "none";
}

function addnewItem(e) {
    var forms = document.getElementById(e + "_form");
    var divs = document.getElementById(e + "_div");

    forms.addEventListener('submit', handleForm);

    var item_name = forms.elements["item_name"].value;
    var item_price = forms.elements["item_price"].value;
    var item_day = forms.elements["item_day"].value;

    switch(e) {
        case "essential":
            var short_e = "ess";
            break;
        case "leisure":
            var short_e = "lei";
            break;
        case "optional":
            var short_e = "opt";
            break;
        case "unexpected":
            var short_e = "unx";
            break;
        default:
            break;
    }

    var col = document.getElementById(short_e + days[item_day]);
    var row = col.childElementCount - 1;
    var row_id = short_e + "_item_" + row;

    // Making the item
    var item = document.createElement("div");
    item.classList.add("item");
    var title = document.createElement("p");
    title.innerHTML = item_name + " $" + item_price;
    var item_btn = document.createElement("button");
    item_btn.setAttribute("type", "button");
    item_btn.setAttribute("onclick", "showPopup('" + row_id + "')");
    item_btn.innerHTML = "<i class='material-icons'>subject</i>";
    var popup = document.createElement("div");
    popup.classList.add("popup");
    popup.id = row_id;
    var innerpopup = document.createElement("div");
    innerpopup.classList.add("innerpopup");
    var des = document.createElement("p");
    des.innerHTML = item_name + " $" + item_price;
    innerpopup.appendChild(des);
    var popbtn = document.createElement("button");
    popbtn.setAttribute("type", "button");
    popbtn.setAttribute("onclick", "hidePopup('" + row_id + "')");
    popbtn.innerHTML = "<i class='tiny material-icons'>clear</i>";
    innerpopup.appendChild(popbtn);
    popup.appendChild(innerpopup);
    item.appendChild(title);
    item.appendChild(item_btn);
    item.appendChild(popup);

    // Making the add_item button
    var add_item = document.createElement("div");
    add_item.classList.add("add_item")
    var b = document.createElement("button");
    b.innerHTML = "<i class='material-icons'>add</i>";
    b.setAttribute("onclick", "showAdd('" + e + "_div')");
    add_item.appendChild(b);


    console.log('got to before insertion');

    // Find the second to last spot in the div and insert the new item
    col.removeChild(col.lastElementChild);
    col.appendChild(item);
    col.appendChild(add_item);
    
    divs.style.display = "none";

    // Erase the form
    forms.elements["item_name"].value = null;
    forms.elements["item_price"].value = null;
    forms.elements["item_day"].value = null;
}