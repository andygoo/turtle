/**
This file is part of Purplepixie Turtle.

Purplepixie Turtle is (C) Copyright 2017 David Cutting (dcutting@purplepixie.org).

Purplepixie Turtle is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Purplepixie Turtle is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Purplepixie Turtle.  If not, see <http://www.gnu.org/licenses/>.
**/

/**
 * TurtleCommand (class) - pair sets of command and value for the stack
**/
function TurtleCommand(comm, val)
{
	this.command = comm;
	this.value = val;
}

/**
 * Turtle (class) - the actual turtle and logic
**/
function Turtle(xSize, ySize)
{
	// Dimensions X, Y of canvas
	this.xsize = xSize;
	this.ysize = ySize;
	// X and Y position of turtle (initially in the middle)
	this.x = xSize/2;
	this.y = ySize/2;
	// Angle of the turtle
	this.angle = 0;
	// Do we wrap (when x > xsize move onto the other side for example)
	this.wrap = false;
	// Stack of commands
	this.stack = new Array();

	// Draw size of the turtle
	this.turtleSize = 10;
	// Default colour
	this.defCol = 'black';
	// Turtle colour (circle element)
	this.turCol = '#00a000';
	// Direction colour (arrow element)
	this.dirCol = '#a03030';

	// Default line width
	this.defWidth = 3;

	// Canvas and context (of 2d canvas) to draw on
	this.canvas = null;
	this.context = null;

	// Visual status elements (textual display)
	this.stateX = null;
	this.stateY = null;
	this.stateAngle = null;

	// Pen down flag (draw)
	this.penDown = true;

	// Draw the turtle
	this.drawTurtle = true;

	// Set visual elements
	this.setVisual = function(ca, sx, sy, sa)
	{
		this.canvas = document.getElementById(ca);
		this.context = this.canvas.getContext("2d");
		this.stateX = document.getElementById(sx);
		this.stateY = document.getElementById(sy);
		this.stateAngle = document.getElementById(sa);
	}

	// Reset to start conditions (centred and 0 angle)
	this.startConditions = function()
	{
		this.angle = 0;
		this.x = this.xsize / 2;
		this.y = this.ysize / 2;
	}

	// Clear command stack
	this.clearStack = function()
	{
		this.stack = new Array();
	}

	// Reset
	this.reset = function()
	{
		this.startConditions();
		this.clearStack();
		this.updateState();
		this.redraw();
	}

	// "Real" functions i.e. Y is inverted and angle is wrapped to 360
	this.realX = function(ix) { return ix; }
	this.realY = function(iy) { return this.ysize - iy; }
	this.realAngle = function(ia) { return this.angleWrap(ia); }

	// Wrap Angle
	this.angleWrap = function(ang)
	{
		while(ang>360)
			ang-=360;
		while(ang<0)
			ang+=360;
		return ang;
	}

	// For given start ix,iy at angle ang and for length len return [x][y] of end point
	this.endPoint = function(ix, iy, ang, len)
	{
		var xd = Math.round(len * Math.sin(ang * (Math.PI/180)));
		var yd = Math.round(len * Math.cos(ang * (Math.PI/180)));
		return [ix+xd, iy+yd];
	}

	// initialise
	this.init = function()
	{
		this.updateState();
		this.clear();
		this.drawTurtleShape();
	}

	// Update visual state
	this.updateState = function()
	{
		this.stateX.innerHTML = this.x;
		this.stateY.innerHTML = this.y;
		this.stateAngle.innerHTML = this.angle;
	}

	// Draw the turtle
	this.drawTurtleShape = function()
	{
		this.context.lineWidth=1;
		this.context.beginPath();
		this.context.arc(this.realX(this.x), this.realY(this.y), this.turtleSize, 0, 2*Math.PI);
		this.context.strokeStyle = this.turCol;
		this.context.stroke();

		var p1 = this.endPoint(this.x, this.y, this.realAngle(this.angle), this.turtleSize);
		var p2 = this.endPoint(this.x, this.y, this.realAngle(this.angle+90), this.turtleSize);
		var p3 = this.endPoint(this.x, this.y, this.realAngle(this.angle-90), this.turtleSize);
		this.context.beginPath();
		this.context.moveTo(this.realX(p1[0]), this.realY(p1[1]));
		this.context.lineTo(this.realX(p2[0]),this.realY(p2[1]));
		this.context.lineTo(this.realX(p3[0]),this.realY(p3[1]));
		this.context.lineTo(this.realX(p1[0]),this.realY(p1[1]));
		this.context.moveTo(this.realX(this.x), this.realY(this.y));
		this.context.lineTo(this.realX(p1[0]),this.realY(p1[1]));
		this.context.strokeStyle = this.dirCol;
		this.context.stroke();
	}

	// Clear display
	this.clear = function()
	{
		this.context.clearRect(0,0,this.xsize,this.ysize);
	}

	// Add a command to the stack
	this.addCommand = function(comm, val)
	{
		var c = new TurtleCommand(comm,val);
		this.stack.push(c);
	}

	// Redraw stack
	this.redraw = function()
	{
		this.clear();
		this.startConditions();
		var slength = this.stack.length;
		for(var i=0; i<slength; ++i)
		{
			this.execute(this.stack[i]);
		}
		if (this.drawTurtle)
			this.drawTurtleShape();
	}

	// Move to x,y
	this.moveTo = function(nx, ny)
	{
		if (nx>this.xsize)
			nx=this.xsize;
		else if (nx<0)
			nx=0;
		
		if (ny>this.ysize)
			ny=this.ysize;
		else if (ny<0)
			ny=0;

		this.x=nx;
		this.y=ny;

		this.updateState();
	}

	// Set angle to a
	this.setAngle = function(a)
	{
		this.angle = this.angleWrap(a);
		this.updateState();
	}

	// Execute a command
	this.execute = function(c)
	{
		if (c.command.toLowerCase() == "forward" || c.command.toLowerCase() == "backward")
		{
			var dist = c.value;
			if (c.command.toLowerCase() == "backward")
				dist = 0-dist;
			var xy = this.endPoint(this.x, this.y, this.angle, dist);
			if (this.penDown)
			{
				this.context.beginPath();
				this.context.moveTo(this.realX(this.x),this.realY(this.y));
				this.context.lineTo(this.realX(xy[0]),this.realY(xy[1]));
				this.context.strokeStyle = this.defCol;
				this.context.lineWidth = this.defWidth;
				this.context.stroke();
			}
			this.moveTo(xy[0],xy[1]);
		}
		else if (c.command.toLowerCase() == "right")
		{
			this.setAngle(this.angleWrap(this.angle+c.value));
		}
		else if (c.command.toLowerCase() == "left")
		{
			this.setAngle(this.angleWrap(this.angle-c.value));
		}
		else if (c.command.toLowerCase() == "penup")
		{
			this.penDown = false;
		}
		else if (c.command.toLowerCase() == "pendown")
		{
			this.penDown = true;
		}
		else if (c.command.toLowerCase() == "colour" || c.command.toLowerCase() == "color")
		{
			this.defCol = c.value;
		}
		else
			alert("Unknown Turtle Command in Stack: "+c.command);
	}
}