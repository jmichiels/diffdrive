package main

import (
	"github.com/jmichiels/diffdrive"
	"honnef.co/go/js/console"
)

const (
	UP    = 38
	RIGHT = 39
	DOWN  = 40
	LEFT  = 37
)

const (
	T = 0.01
)

func main() {
	console.Log("diffdrive started")

	diffdrive.NewRobot(1.0, 0.025, 0.15)

	//for {
	//	robot.Update(10 * time.Millisecond)
	//	time.Sleep(10 * time.Millisecond)
	//	console.Log(robot.Pos)
	//}
}
