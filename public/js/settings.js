var Settings = function () {
	this.MaxFPS = 60;
	this.Start = "enter";
	this.Select = "esc";
	this.Up = "up";
	this.Down = "down";
	this.Left = "left";
	this.Right = "right";
	this.A = "A";
	this.B = "B";
	this.X = "X";
	this.Y = "Y";

	this.configureGUI = function (GUI) {
		GUI.add(this, "MaxFPS");
		GUI.add(this, "Start");
		GUI.add(this, "Select");
		GUI.add(this, "Up");
		GUI.add(this, "Down");
		GUI.add(this, "Left");
		GUI.add(this, "Right");
		GUI.add(this, "A");
		GUI.add(this, "B");
		GUI.add(this, "X");
		GUI.add(this, "Y");
	}
}