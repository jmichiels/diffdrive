// Distance between center of wheels.
const WheelsSpacing = 250;

// Width of the wheels.
const WheelWidth = 35;

// Radius of the wheels.
const WheelRadius = 40;

// Distance between the body and the wheel.
let Margin = 5;

// Chassis stroke thickness.
const Stroke = 5;



// Increase margin to take stroke in consideration.
Margin += Stroke;

// Width of the wheel.
const LxWheel = WheelWidth;

// Length of the wheel.
const LyWheel = 2 * WheelRadius;

// Width of the wheel well.
const LxWell = WheelWidth + Margin;

// Length of the wheel well.
const LyWell = 2 * (WheelRadius + Margin);

// Width of the chassis.
const LxChassis = WheelsSpacing + WheelWidth;

// Compute chassis radius.
const RChassis = Math.sqrt((LxChassis/2)*(LxChassis/2)+(LyWell/2)*(LyWell/2));

// Append SVG container.
const svgContainer = d3.select("body").append("svg");

// Create a group for the robot.
const group = svgContainer.append("g")
    .attr("transform", "translate(400,200)");

// Append chassis path (gray).
group.append("path")
    .attr("stroke", "black")
    .attr("stroke-width", Stroke)
    .attr("stroke-linejoin", "round")
    .attr("fill", "lightgray")
    .attr("d",
        `M ${-LxChassis / 2} ${-LyWell / 2} ` +
        `a ${RChassis} ${RChassis} 0 0 1 ${LxChassis} 0 ` +
        `l ${-LxWell} 0 l 0 ${LyWell} l ${LxWell} 0 ` +
        `a ${RChassis} ${RChassis} 0 0 1 ${-LxChassis} 0 ` +
        `l ${LxWell} 0 l 0 ${-LyWell} ` +
        "Z");

const appendWheelRectangle = function (x, color) {
    group.append("rect")
        .attr("fill", color)
        .attr("stroke", "black")
        .attr("stroke-width", Stroke)
        .attr("stroke-linejoin", "round")
        .attr("width", LxWheel)
        .attr("height", LyWheel)
        .attr("x", x - LxWheel / 2)
        .attr("y", -LyWheel / 2);
};

// Append left wheel rectangle (red).
appendWheelRectangle(-(LxChassis - LxWheel) / 2, "red");

// Append right wheel rectangle (blue).
appendWheelRectangle((LxChassis - LxWheel) / 2, "blue");