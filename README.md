Omni-score
==========
__The "*-score" label generator__

What is this?
-------------

Omni-score is an exploration on the powers and limits of SVG by hand-crafted,
programmatically manipulated, SVG document trees.


### Say what?

Ok, it's an online tool to generate rating labels inspired
by the (in)famous [Nutri-Score](https://en.wikipedia.org/wiki/Nutri-Score)
nutritional rating system.


## Features

With Omni-score you can:
- Customize the label caption
- Customize a caption (one-char at most, any Unicode char is ok 😃) and color for each grade
- Your customized label can be saved and/or shared simply by bookmarking
  or sharing the page url
- A gallery of pre-made templates is available

[See it in action](https://shb.github.io/omni-score/)!


## Roadmap

If and when I come back to code these would be the next features to be added:
- [ ] Downloading generated labels as SVG files
- [ ] Support for more than five grades in a label


### Contribute!

You can share your custom *-score by
[opening an issue](https://github.com/shb/omni-score/issues),
to be considered for inclusion in the gallery section.

Of course you are welcome to open an issue to signal bugs, suggestions
and especially glitches in the generated SVG.


Technically speaking
--------------------

Highlights:
- Score labels are generated starting from a `template` containung the minimal
  SVG label structure, and then dynamically updated according to configuration.
- Configuration is stored and retrieved on the `location.hash`
