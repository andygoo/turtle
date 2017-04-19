<?php
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
$snippets=array();

function addSnippet($title, $file, $children=null)
{
	$arr = array(
		"title" => $title,
		"file" => $file,
		"children" => $children);
	return $arr;
}


$snippets[] = addSnippet(

	"Simple Examples","",
	array(
		addSnippet("Simple Star Test","test.js",null),
		addSnippet("Incrementing Steps","increment.js",null),
		addSnippet("Five Sided Pentagram","pentagram.js",null),
		)
	);

$snippets[] = addSnippet(

	"Coloured Examples","",
	array(
		addSnippet("Incrementing Coloured Steps","increment-colour.js",null),
		)
	);

$list = array("snippets" => $snippets);

echo json_encode($list, JSON_PRETTY_PRINT)."\n";