let viewbox = {
    // Pixels by meters.
    scale: 1000,
    // Center of the viewbox (meters).
    center: {x: 0, y: 0},
};

const svg = d3.select('body').append('svg')
    .attr('preserveAspectRatio', 'xMinYMin slice');


function update() {

    svg.data([viewbox]);

    // Update SVG viewbox.
    svg.attr('viewBox', function (data) {

        // Size of the SVG element (in pixels).
        const {width, height} = this.getBoundingClientRect();
        console.log(height);

        // Size of the viewbox (in meters).
        const w = width / data.scale;
        const h = height / data.scale;

        // Coordinate of the upper left corner.
        const x = (data.center.x - (w / 2));
        const y = (data.center.y - (h / 2));

        return `${x} ${y} ${w} ${h}`;
    });

    // Distance between center of wheels (m).
    const WheelsSpacing = 0.25;

    // Radius of the wheels (m).
    const WheelRadius = 0.035;

    // Generate and append the robot vizualisation to the page body.
    // const robotSVG = AppendRobot(svg, WheelsSpacing, WheelRadius, 0.02, 0.005, 0.005);

    // Appends a robot description to the svg.
    function AppendRobot(svg, WheelsSpacing, WheelRadius, WheelWidth, Margin, Stroke) {

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


        // Create a group for the robot.
        const group = svg.append("g");

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
}

window.addEventListener('resize', function () {

    // Recompute svg viewbox.
    update();
});

update();


// Place the robot.
// robotSVG.attr("transform", "translate(1.5,0)");