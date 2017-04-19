var length = 10;
var sides = 20;
var turn = 45;

for (var i=0; i<sides; i++)
{
forward(length);
right(turn);
length+=5;
}