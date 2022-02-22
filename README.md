# Off centered Pie Chart

Don't you just LOVE pie charts? Me neither!

Then why don't you simply offset the center to make them even more unreadable??

Looks too bad to be true? [IT IS NOT](https://off-centered-pie.netlify.app/)!

## What is this?

It's a library that exposes a function you can use to build an off-centered pie chart, where the center from which all slices are cut can be moved around the circle itself, but the surface of each slice will represent the data.

It needs an array of values (`number[]`), the center offset (`number[]`) and the radius length (`number`) (in some order, check the signature it's too late).

In the storybook you can see on the website it's implemented in a quite simple React application with SVG, but it can be used with canvas or something else.

Ideally, the center could be draggable.

## How does it work

Not in the best way honestly. But it's a joke library, it works (seemingly) and I'm ok with that, for now.

Ideally, I should write better math and better code. But that's always true, and eventually it might even happen.

Built with TSDX