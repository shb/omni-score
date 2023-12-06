Omni-score
==========
__"*-score" label generator__

What is this?
-------------

Omni-score is an exploration on the powers and limits of SVG via hand-crafted,
programmatically manipulated, SVG document trees.


### Say what?

Ok, it's an online tool to generate rating labels inspired
by the (in)famous [Nutri-Score](https://en.wikipedia.org/wiki/Nutri-Score)
nutritional rating system.

Features:
- Customize label caption
- Customize a mark and color for each grade
- The current configuration can be saved and/or share simply by bookmarking
  or sharing the page url
- A gallery of pre-made templates is available

[See it in action](https://shb.github.io/omni-score/)!


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
