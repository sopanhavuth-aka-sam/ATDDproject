/**(Sam) File A: getTimeUnit(), getSliderSteps(), setSliderSteps()**/

function getSliderSteps(dots) {
    return dots[dots.length-1].tm;
}

function setSliderSteps(steps) {
    $('#rangeSlider').prop({
        'min': 0,
        'max': steps
    });
}


function getTimeUnit() {
    var selection = document.getElementsByName("radioButton");
    var timeUnit = 0;
    for(var i = selection.length; i--;)
    {
        if(selection[i].checked)
        {
            timeUnit = selection[i].value;
        }
    }

    return Number(timeUnit);
}
