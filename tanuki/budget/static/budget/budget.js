function categorySpending(category) {
    
    // Get the values of all of the forms
    var essential = document.getElementById("id_essential").value;
    var leisure = document.getElementById('id_leisure').value;
    var optional = document.getElementById('id_optional').value;
    var unexpected = document.getElementById('id_unexpected').value;

    // Replace the values in the specific form
    document.getElementById('ess_in_' + category).setAttribute('value', essential);
    document.getElementById('lei_in_' + category).setAttribute('value', leisure); 
    document.getElementById('opt_in_' + category).setAttribute('value', optional); 
    document.getElementById('unx_in_' + category).setAttribute('value', unexpected);
    
    document.getElementById(category + '_cash_form').submit();
}