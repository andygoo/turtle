var sides = 5;
var length = 100;

penup();
forward(20);
right(180-18);
pendown();

for(var i=0; i<sides; ++i)
{
forward(length);
right(180-36);
}