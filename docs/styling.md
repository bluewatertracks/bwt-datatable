Styling
===
The biggest difficulty is styling, because the way Polymer and the shadow DOM works it's incredibly hard to style elements that are hidden in the shadow DOM, as is the case for the cells. Dynamically setting up mixins isn't possible either however, so in the end the following compromise was reached:

Header cell and Row cell styling
---
It is possible to define a css string that will be applied to the header cell and all cells in a column like

	<bwt-datatable-column [...] style="color:green;" cell-style="color:red;"></bwt-datatable-column>

Which would make the header `green` and the content in each cell in the column `red`. This is especially useful to set a `min-width` on the header. There is also a convenience attribute `align='center'` to center columns (both the header and cells) and a convenience attribute `width` to set the minimum width.

Tip: Check the `theming.html` demo for a live demonstration.

Styling content inside `<template>`'s
---
Sometimes you need to style content inside of a cell when using `<template>`'s. There are 3 ways to achieve this:

 - Inline styling. 
   - Advantage: It's pretty clear what you're doing. 
   - Disadvantages: *If* you need the same style in multiple columns you end up with duplicated styles and you can't 
     style Polymer specific styles.
 - `bwt-datatable-class-n` are a set of classes with matching mixins to style specific classes inside cells. 
   - Advantage: You can apply the same style to multiple different elements in different columns.
   - Disadvantages: It's hard to read and it only works in Shadow DOM
 - [Cross scope styling](https://www.polymer-project.org/1.0/docs/devguide/styling.html#xscope-styling). Stuff like `/deep/`
   - Advantage: It works really well.
   - Disadvantage: It's deprecated.

<bwt-datatable>
===

 Custom property | Description | Default
 ----------------|-------------|----------
 `--bwt-datatable-divider-color` | divider color between rows | `--divider-color`
 `--bwt-datatable-row-selection-color` | divider color between rows | `--paper-grey-100`
 `--bwt-datatable-row-hover-color` | color of hovered row | `--paper-grey-200`
 `--bwt-datatable-checkbox-border-color` | checkbox color | `--primary-text-color`
 `--bwt-datatable-header-checkbox-border-color` | checkbox color | `--primary-text-color`
 `--bwt-datatable-icon-color` | icon color of editable icon | `rgba(0,0,0,.54)`

Mixins
---

 Mixin | Description
 ------|-------------
 `--bwt-datatable-column-header` | column header style applied to text headers
 `--bwt-datatable-cell` | applied to all data cells
 `--bwt-datatable-cell-last` | applied to the last cell of each row (used to increase the `padding-right` if you overwrite it in `--paper-datatable-cell`)
 `--bwt-datatable-column-header-sorted` | applied to the sort icon
 `--bwt-datatable-column-header-sort-icon-hover` | applied to the sort icon when hovered
 `--bwt-datatable-array-item` | oly works when using the proper Shadow DOM and is applied to columns using the `array-display-prop` attribute.
 `--bwt-datatable-class-1` | only works when using the proper Shadow DOM and is applied to any content in cells with `class='class-1'`.
 `--bwt-datatable-class-2` | only works when using the proper Shadow DOM and is applied to any content in cells with `class='class-2'`.
 `--bwt-datatable-class-3` | only works when using the proper Shadow DOM and is applied to any content in cells with `class='class-3'`.
 `--bwt-datatable-class-4` | only works when using the proper Shadow DOM and is applied to any content in cells with `class='class-4'`.
 `--bwt-datatable-class-5` | only works when using the proper Shadow DOM and is applied to any content in cells with `class='class-5'`.

<bwt-datatable-card>
===
Variables
---
 Custom property | Description | Default
 ----------------|-------------|----------
 `--bwt-datatable-divider-color` | divider color is used to draw the bottom line | --divider-color
 `--bwt-datatable-selection-toolbar-color` | color of selection toolbar, should be 50 of the secondary color | `--paper-pink-50`
 `--bwt-datatable-selection-toolbar-text-color` | color of text on selection toolbar | `--accent-color`
 `--bwt-datatable-navigation-bar-text-color` | color of text in navigation bar |
 `--bwt-datatable-top-toolbar-text-color` | color of text in the top toolbar | `rgba(0,0,0,.54)`
 `--bwt-datatable-top-toolbar-icon-color` | color of icons in the top toolbar | ``
 `--bwt-datatable-selection-toolbar-icon-color` | color of icons on selection toolbar | 

Mixins
---

 Mixin | Description
 ------|-------------
 `--bwt-datatable-card` | applied to the main card
 `--bwt-datatable-navigation-bar` | applied to the bottom bar containing the navigation
 `--bwt-datatable-selection-toolbar` | applied to the selection toolbar
 `--bwt-datatable-top-toolbar` | Applied to the general area above the data table
