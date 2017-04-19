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

function snippetLines(a)
{
	var out = "<ul>\n";
	for (var i=0; i<a.length; ++i)
	{
		var s = a[i];
		var link = false;
		if (s.file != undefined && s.file != null && s.file != "")
			link=true;
		out += "<li>";
		if (link)
			out += "<a href=\"#\" onclick=\"loadSnippet('"+s.file+"');\" data-dismiss=\"modal\">";
		out += s.title;
		if (link)
			out += "</a>";
		out += "</li>\n";

		if (s.children != null)
			out += snippetLines(s.children);
	}
	out += "</ul>";
	return out;
}


function loadSnippetList(element)
{
	element.innerHTML = "";

	var indexurl = CONFIG.snippet_data_url;

	if (CONFIG.snippet_nocache)
		indexurl += loadNoCache();

	$.getJSON(indexurl, function(data) {
		
		var l = snippetLines(data.snippets);
		element.innerHTML += l;
		


		element.innerHTML += "";

	});
}

function loadSnippet(key)
{
	var dataurl = CONFIG.snippet_code_url +key;
	if (CONFIG.snippet_nocache)
		dataurl+=loadNoCache();

	$.ajax({
		url: dataurl, 
		dataType: 'text',
		async: true,
		success: function(data)
		{
			document.getElementById('turtle_code').value = data;
		}
	});

}

function loadNoCache()
{
	return "?nc="+Math.random()*100000000;
}