Droppin' Bars
=============

Simple CSS Responsive Grid. Word.

##Demo
Czech it [here](http://blog.antoniocapelo.com/droppin-bars/).

## Hooking Up

Just clone this repository or do ``bower install droppin-bars`` for some flow on your website.

If you're using [wiredep](https://github.com/taptapship/wiredep) don't forget to add the following lines on the SCSS files where you want to include the dependency and configure wiredep properly:

	// bower:scss
	// endbower

## Usage

### General

This grid follows a 12-column - **bars** - rule. So, for each **row** there needs to be a total of 12 bars for it to be filled.

	12 || 6 + 6 || 5 + 7 || 4 + 8 || 3 + 9 || 2 + 10 || 1 + 11 
	|| 3 + 3 + 3 + 3 || 4 + 4 + 4 || 1 + 1 + 1 + 1 + 1 + ....

### Responsiveness

The <b>Droppin' Bars</b> grid responds to 3 (it's the <a href="https://www.youtube.com/watch?v=0irL1M15DH8">magic number</a>) types of sizes: **desktop**, **tablet** and **mobile**. 
For this, 3 breakpoints are used, stored on the **$mobile-break**, **$tablet-break** and **$desktop-break** SASS variables.

### Utils

* Use **.hide-desktop**, **.hide-tablet** and **.hide-mobile** classes to hide an element on a specific device.
* Use **.bar-center** class as a shortcut to **text-align: center** on an element.
* Use **.bar-img** on an image element to make it responsive while maintaining its ratio
* **.bar-** classes are rounded to 100% width on mobile, but you can use **.bar-1-mobile ... .bar-12-mobile** to control the width percentage on mobile devices.

### And that's all. Peace.