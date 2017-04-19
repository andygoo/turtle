var length = 10;
var sides = 20;
var turn = 45;
var cols = ['blue','red','green'];
var col = 0;

for (var i=0; i<sides; i++)
{
colour(cols[col++]);
forward(length);
right(turn);
length+=5;
if (col >= cols.length) col=0;
}