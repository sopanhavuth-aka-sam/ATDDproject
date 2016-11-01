/**(Sam) File B: dateTag(), drawDetections()**/

//There's an error here when timeUnit is not defined. Possible solution: pass
//timeUnit as param.
function dateTag(currentStep)
{
    if(timeUnit === 0)
    {
        $("#currentHour").text(getSliderHour(dots, currentStep))
    }
    else
    {
        $("#currentDate").text(getSliderDate(dots, currentStep));
    }
}

//drawDetections doesn't work when move here. Undefined "dots" on line 24
//FIXED THIS:pass dots as param?

// /*This function adds all the detections to the map with a radius of 2 and blinks
// * detections based on the current step on the slider.
// * @param currentStep The step that the slider is currently on.
// */
// function drawDetections(currentStep){
//     //add this to fixed the circle size
//     var max_rad = $(window).height() * 0.15;//dynamcially change base on screen size
//     var maxDetectionCount = Math.max.apply(Math,dots.map(function(o){
//                                     return o.count;
//                                 })); //maximum detection at a single location/dot
//
//     circles
//     .attr("cx", function(d)
//     {
//         return project(d).x;
//     })
//     .attr("cy", function(d)
//     {
//         return project(d).y;
//     })
//     .style({
//         fill: "#ff1a1a",
//         "fill-opacity": 0.6,
//         stroke: "#004d60",
//         "stroke-width": 1
//     })
//     .transition().duration(500)
//     .attr("r", function(d)
//     {
//         if(d.tm === currentStep)
//             //return d.rad;//simply use return d.rad to display all (no if statement)
//             return d.count * max_rad / maxDetectionCount;
//         else
//             return 2;
//     })
// }
