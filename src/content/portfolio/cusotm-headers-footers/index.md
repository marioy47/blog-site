---
title: Custom Headers & Footers
cover: ./custom-header-footer-featured.png
date: 2019-11-26
client: iHealthSpot
tags: [wordpress, php, bitbucket, git]
summary: Allows you to add any type of code on the header or footer of a WP page
---

![Cover Image](./custom-header-footer-featured.png)

This plugin was made for the company [iHealthSpot](https://ihealthspot.com) so the marketing team could add any kind of tag on the header or footer of a page.

The main reason to create it as a new plugin instead of using one of the existing ones where:

- There are tags used in Medical Directories in the US that require to add content on both header and footers of a page
- Some of the tags required you to source an external `js` file and add additional JS objects on the content
- The existing plugins allowed you to add content globally and not per page
- The existing plugins did not allow you to set "firing priorities"
- The marketing team wanted _syntax highlight_ when adding code
- The existing plugins had issues with older versions (version < 4.9) of WordPress.
- They needed to keep track of which users made which changes to the code

So this plugin was created to solve those issues, and used an interface that was easier for them to use.

## Technologies Used

This is very simple plugin. It just adds content using the `wp_head` and `wp_footer` WordPress Hooks.

For storing the code I created a new custom post type the supported additional meta information:

- Placement of the code (header or footer)
- _Firing_ priority
- Page or pages where the code should be fired

The hard part of this plugin was the creation of a black list of code patters that could not be added. This was achieved by using regular expressions that look for pre-defined patters on the code, and if one of those patters was found then that code would not be added to the header or the footer.

## Screenshots

### Custom Headers & Footers with JavaScript code

![Adding JS code](./custom-header-footer-js.png)

### Custom Headers & Footers with CSS code

![Adding CSS code](./custom-header-footer-css.png)

### Live Coding

Here is the live coding sessions of the development:

_This is for demonstration purposes only, there is no sound or explanation of the process._

<!-- markdownlint-ignore -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLqJrOd2CQU3cpPdSSU8k5V_ZmoRuISCfv" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
