# Squeezebox Redux

---
### by Alex Pearson
Squeezebox Redux is an intro block that slides out to uncover a gallery of items, based on
[this article on CodyHouse](http://codyhouse.co/gem/squeezebox-portfolio-template/), forked from the CodyHouse squeezebox-portfolio-template repo. See the demo for the original product [here](http://codyhouse.co/demo/squeezebox-portfolio-template/index.html).

To see Squeezbox Redux in action, check out the Team and Portfolio sliders on the [Limerick Designs Homepage](http://limerickdesigns.com).

 -------

## Features

See the latest Squeezbox Redux demo [here](https://squeezebox-redux-demo.firebaseapp.com/).

The original version of Squeezebox Portfolio had three major issues:

1. The slider was only usable on a page *once*. Either that, or all SCSS, JavaScript, and HTML had to be repeated with different (and more specific) selectors.
2. When individual projects in the slider were clicked, the project content that was displayed was limited to one set of content.
3. Especially on desktop, escaping the slider view was difficult and unintuitive. Users had to click on a small arrow icon, which disappeared on scroll when implemented as a part of a large page.

Squeezebox Redux solves these issues by...

1. ...generalizing the implementation of all JavaScript functions. Now, instead of looking for specific classes inside of functions, you'll see a lot more use of `this`, `$(this)`, `.parent()`,`.children()`, and `.next()`. In short, you can now expect each function to run without global conflicts.
2. ...allowing for multiple `item-content` sections, assignable to specific ids of content through a `data-action` attribute on clickable content.
3. ...adding an easy-to-see and simple-to-understand 'close slider' button through the `close-btn` class.

As much as possible, the feature set of [the original Squeezebox](http://codyhouse.co/gem/squeezebox-portfolio-template/) has been maintained.

---

*the following is adapted from the [original Squeezebox article](http://codyhouse.co/gem/squeezebox-portfolio-template/)*

## Creating the Structure

The **HTML structure** is composed by 3 main blocks: a `.cd-intro-block` element, containing the action button to reveal the items slider, an unordered list `.cd-slider`, which is the item gallery/slider, and `.cd-item-content` elements with the full content of a single item, further identified by a specific id.

```html

<div class="cd-intro-block">
  <div class="cd-content-wrapper">
    <h1>Squeezebox Redux Item Slider 1</h1>
    <a href="#0" class='cd-btn' data-action="show-items">Show items</a>
  </div>
</div> <!-- .cd-intro-block -->

<div class="cd-items-wrapper">
  <a href="#0" class="cd-btn close-btn" data-action="close-items">close slider</a>
  <ul class="cd-slider">
    <li class="current">
      <a href="#0"  data-action="item1_content">
        <img src="img/img.png" alt="item image">
        <div class="item-info">
          <h2>Item 1</h2>
          <!-- preview content -->
        </div>
      </a>
    </li>

    <div class="cd-item-content" id="item1_content">
  		<div>
  			<h2>Item 1 Title Here</h2>
  			<em>Subtitle</em>
          <!--project content-->
  		</div>
  		<a href="#0" class="close cd-img-replace">Close</a>
  	</div>

```

---
