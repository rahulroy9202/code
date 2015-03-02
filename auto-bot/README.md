PROBLEM

A spy agency has built a squad of robotic insects, that are small enough to infiltrate enemy buildings. The enemy headquarters has several rectangular rooms which must be navigated by the insects in order to reach and photograph secret documents.

An insect's location is represented by x and y coordinates. It's heading is represented by one of four cardinal compass points. The room is divided into a grid to simplify navigation. An example position could be <0, 0, N>, which means that the insect is at the bottom-left corner and facing north.

Being a robot with limited computing capacity, the insect is only capable of understanding very simple commands:
L -- makes the insect turn left 90 degrees
R -- makes the insect turn right 90 degrees
F -- make the insect move forward 1 square
Assume the square directly north of <x, y> is <x, y+1>.


INPUT

The first line of input represents the size of the room with the base index being <0, 0>.

The rest of the input is data pertaining to the insects that have been deployed. Each insect has two lines of input. The first line gives the insect's position, and the second line is the sequence of commands that tell the insect where to navigate.

Each insect will finish it's navigation sequentially, which means that the second insect wont start moving until the first one has finished moving.


OUTPUT

The output for each insect should be its final coordinates and heading.


SAMPLE INPUT AND OUTPUT

Input:
5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF

Expected output:
1 3 N
5 1 E
