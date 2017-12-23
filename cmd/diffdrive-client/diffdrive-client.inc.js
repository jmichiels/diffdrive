// Distance between center of wheels (m).
const WheelsSpacing = 0.25;

// Radius of the wheels (m).
const WheelRadius = 0.035;

// Generate and append the robot vizualisation to the page body.
const robotSVG = AppendRobotSVG(WheelsSpacing, WheelRadius, 0.02, 0.005, 0.005);

function AppendRobotSVG(WheelsSpacing, WheelRadius,WheelWidth, Margin, Stroke) {

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
    const RChassis = Math.sqrt((LxChassis / 2) * (LxChassis / 2) + (LyWell / 2) * (LyWell / 2));

    // Append SVG container.
    const svgContainer = d3.select("body").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 3 0.001");

    // Create a group for the robot.
    const group = svgContainer.append("g")
        .attr("transform", "translate(0.5,0.5)");

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

    return group;
}