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

var turtle = new Turtle(340, 340);

turtle.setVisual('turtle_canvas','turtle_x','turtle_y','turtle_angle');
turtle.init();

function turtleReady()
{
	if (CONFIG.snippet)
	{
		loadSnippetList(document.getElementById('scriptlets'));
	}

	$('#loading').hide();
	$('#body').show();
}

function display_error(err)
{
	document.getElementById('error-message').innerHTML = err;
	$('#errorModal').modal('show');
}

function execute_code(code)
{
	try 
	{
		eval(code);
		turtle.redraw();
	}
	catch(e)
	{
		display_error("<p><b>Error executing code:</b><br /><br /> "+e.message+"</p>");
	}
}

function execute_click()
{
	var code = document.getElementById('turtle_code').value;
	execute_code(code);
}

function execute_single()
{
	var code = document.getElementById('command-input').value;
	execute_code(code);
}

function test_click()
{
	/*
	turtle.addCommand("forward",20);
	turtle.addCommand("left",90);
	turtle.addCommand("forward",20);
	turtle.addCommand("penup");
	turtle.addCommand("forward",20);
	turtle.addCommand("pendown");
	turtle.addCommand("forward",20);
	turtle.redraw();
	*/
	for (var i=0; i<=8; i++)
	{
		forward(20);
		backward(20);
		right(45);
	}
	turtle.redraw();
}

function reset_click()
{
	turtle.reset();
}

function hide_click()
{
	turtle.drawTurtle = !turtle.drawTurtle;
	turtle.redraw();
}

/** helper functions **/

function forward(x) { turtle.addCommand("forward",x); }
function backward(x) { turtle.addCommand("backward",x); }
function left(x) { turtle.addCommand("left",x); }
function right(x) { turtle.addCommand("right", x); }
function penup() { turtle.addCommand("penup");  }
function pendown() { turtle.addCommand("pendown");  }
function colour(x) { turtle.addCommand("colour", x); }
function color(x) { colour(x); }
