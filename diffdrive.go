package diffdrive

import (
	"math"
	"time"
)

type Robot struct {
	State

	// Mass (kg).
	M float64

	// Inertia (kgm2).
	I float64

	// Wheel radius (m).
	R float64

	// Axle radius (m).
	L float64
}

// Returns a new robot.
func NewRobot(mass, wheelRadius, axleRadius float64) *Robot {
	robot := &Robot{
		M: mass,
		R: wheelRadius,
		L: axleRadius}
	robot.computeInertia()
	return robot
}

// Computes the inertia of the robot approximated as a solid cylinder.
func (r *Robot) computeInertia() {
	r.I = (r.M * r.L * r.L) / 2
}

type State struct {
	// Pose.
	Pos Pose

	// Velocity.
	Vel Velocity

	// Wheel torques.
	Tor WheelTorques
}

type Velocity struct {
	// Linear velocity (m/s).
	Lin float64

	// Angular velocity (rad/s).
	Ang float64
}

type Acceleration struct {
	// Linear acceleration (m/s2).
	Lin float64

	// Angular acceleration (rad/s2).
	Ang float64
}

type Pose struct {
	// Position along the main axis and and absolute orientation.
	X, Y, A float64
}

type Effort struct {
	// Linear force (N).
	Lin float64

	// Angular force (Nm).
	Ang float64
}

type WheelTorques struct {
	// Torque applied on the left wheel (Nm).
	L float64

	// Torque applied on the right wheel (Nm).
	R float64
}

func (r *Robot) Update(dt time.Duration) {
	seconds := dt.Seconds()

	f := Effort{

		// linear force.
		Lin: (r.Tor.R + r.Tor.L) / r.R,

		// angular force.
		Ang: (r.Tor.R - r.Tor.L) * r.L / r.R,
	}

	a := Acceleration{

		// linear acceleration.
		Lin: f.Lin / (r.M),

		// angular acceleration.
		Ang: f.Ang / (r.I),
	}

	nextV := Velocity{

		// Updated linear velocity.
		Lin: r.Vel.Lin + a.Lin*seconds,

		// Updated angular velocity.
		Ang: r.Vel.Ang + a.Ang*seconds,
	}

	meanV := Velocity{

		// Average linear velocity.
		Lin: (r.Vel.Lin + nextV.Lin) / 2.0,

		// Average angular velocity.
		Ang: (r.Vel.Ang + nextV.Ang) / 2.0,
	}

	// Update velocity.
	r.Vel = nextV

	// Updated orientation.
	nextA := r.Pos.A + meanV.Ang*seconds

	// Average orientation.
	meanA := (r.Pos.A + nextA) / 2.0

	// Updated position.
	r.Pos.X += seconds * meanV.Lin * math.Cos(meanA)
	r.Pos.Y += seconds * meanV.Lin * math.Sin(meanA)

	// Update orientation.
	r.Pos.A = nextA
}

type VelocityController struct {
	robot *Robot

	// Target velocity.
	Target Velocity
}

// Returns a new velocity controller.
func NewVelocityController(r *Robot) *VelocityController {
	return &VelocityController{robot: r}
}

func (ctrl *VelocityController) Update() {

}
