//colorbox, jquery, and js-cookie need to be included before this file

function onPopupOpen(){
  $("#myInput").focus();
}

function onPopupClose(){
    var checked;
    // checked = ($("#colorbox").find('#cbox1')).prop("checked");
    checked = $("#colorbox").find('#cbox1');
    console.log(checked);
    if(checked) {
        Cookies.set('colorboxShown', 'yes');
        console.log('cookie set');
    }
}

function displayPopup(){
  $.colorbox({
    href:"popUpMessage.html",
    className: "popUp",
    width: 350,
    height: 250,
    onComplete: onPopupOpen,
    onClosed: onPopupClose
  });
}

function popUp(){
    Cookies.remove('colorboxShown');
    var popupShown = Cookies.get('colorboxShown');

    if(popupShown){
        console.log("Cookie found. No action necessary");
    } else {
        displayPopup();
    }
};
