# Squeezebox Redux

---
### by Alex Pearson
Squeezebox Redux is an intro block that slides out to uncover a gallery of items, based on
[this article on CodyHouse](http://codyhouse.co/gem/squeezebox-portfolio-template/), forked from the CodyHouse squeezebox-portfolio-template repo. See the demo for the original product [here](http://codyhouse.co/demo/squeezebox-portfolio-template/index.html).

To see Squeezbox Redux in action, check out the Team and Portfolio sliders on the [Limerick Designs Homepage](http://limerickdesigns.com).

 -------

## Features

The original version of Squeezebox Portfolio had two major issues:

1. The slider was only usable on a page *once*. Either that, or all SCSS, JavaScript, and HTML had to be repeated with different (and more specific) selectors.
2. When individual projects in the slider were clicked, the project content that was displayed was limited to one set of content.

Squeezebox Redux solves these issues by...

1. ...generalizing the implementation of all JavaScript functions. Now, instead of looking for specific classes inside of functions, you'll see a lot more use of `this`, `$(this)`, `.parent()`,`.children()`, and `.next()`. In short, you can now expect each function to run without global conflicts.
2. ...allowing for multiple `item-content` sections, assignable to specific ids of content through a `data-action` attribute on clickable content.

As much as possible, the feature set of [the original Squeezebox](http://codyhouse.co/gem/squeezebox-portfolio-template/) has been maintained.
