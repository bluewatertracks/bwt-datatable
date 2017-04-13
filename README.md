[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bluewatertracks/bwt-datatable)

# bwt-datatable

### About
We greatly appreciated the work of [David Mulder's paper-datatable](https://github.com/David-Mulder/paper-datatable) but since it hasn't been active for a while and we at Blue Water Tracks really wanted to keep pushing the work done so far, we decided to inherit the project and let it evolve but combining the pull requests on the project along with a couple of fixes and features that we came up with. Since many people already use the `paper-datatable` component, we created this component to make sure that it is compatible with the `paper-datatable` component. You can easily use this element only changing the path to `paper-datatable` import element like below. 
We hope that David takes what we have done with`bwt-datatable` and merges it into the original `paper-datatable`. 

### Before
	<link rel="import" href="/bower_components/paper-datatable/paper-datatable.html">

### Now
	<link rel="import" href="/bower_components/bwt-datatable/bwt-datatable.html">

If you already used selection toolbar in `paper-datatable-card` you need to add slot property to it like this: 

    <div slot="toolbar-select-single">
      <paper-icon-button icon="info" on-tap="info"></paper-icon-button>
    </div>
    <div slot="toolbar-select">
      <paper-icon-button icon="delete" on-tap="delete"></paper-icon-button>
    </div>

 - Original `paper-datatable` documentation and demos can be found [here](http://david-mulder.github.io/paper-datatable/components/paper-datatable/docs/docs.html?installation)
 - Our documentation and demos can be found [here](https://bluewatertracks.github.io/bwt-datatable/components/bwt-datatable/docs/docs.html?installation)


[![datatable full implementation](http://david-mulder.github.io/paper-datatable/components/paper-datatable/docs/screenshot.png)](http://david-mulder.github.io/paper-datatable/components/paper-datatable/demo/paper-datatable-card/full-implementation.html)

## New changes

 - Column header update dynamically according to [paper-datatable pull request #78](https://github.com/David-Mulder/paper-datatable/pull/78)
 - Truly responsive; ability to use `bwt-datatable` on mobile devices by easily setting the  `responseWidth` property to the desired breakpoint resolution.

 		<paper-datatable data="{{data}}" selectable multi-selection response-width="767px">
			<paper-datatable-column header="Title" property="title" sortable editable>
			</paper-datatable-column>
		</paper-datatable>

<p align="center">
  <img src="https://github.com/bluewatertracks/bwt-datatable/blob/master/images/bwt-datatable-mobile.png" alt="bwt-datatable mobile view"/>
</p>

- Table and/or column header can be fixed to the top of the page for better usability when you have very big amount of data in table. More info can be found [here](https://bluewatertracks.github.io/bwt-datatable/components/bwt-datatable/docs/docs.html?getting-started#fixed-header)

<p align="center">
  <img src="https://github.com/bluewatertracks/bwt-datatable/blob/master/images/header-fixed.gif" alt="bwt-datatable fixed header"/>
</p>

We also tried to add additional functionality and fix some of the bugs in paper-datatable and also merge the following pull requests for ``paper-datatable``
- Fix issue with null values inside paper-column [pull request #113](https://github.com/David-Mulder/paper-datatable/pull/113)
- Change es6 to es5 code to support some of the older browsers [request #51](https://github.com/David-Mulder/paper-datatable/pull/51) and [request #106](https://github.com/David-Mulder/paper-datatable/pull/106)
 (Hopefully when Polymer 2 ships with transpiling, we can rewrite the code into proper ES6 code)
- Use textContent instead of innerHTML inside elements [request #108](https://github.com/David-Mulder/paper-datatable/pull/108)

## Installation

The element can be installed using bower using

    bower install --save bwt-datatable

**Important:** If you wish to use `<bwt-datatable-card>` you need the paper elements listed in `devDependencies` as well. They are not listed as normal dependencies to prevent them from being pulled in on production if you do not need them.

## Usage

Check out the [getting started guide](https://bluewatertracks.github.io/bwt-datatable/components/bwt-datatable/docs/docs.html?getting-started).

## Contributors

| | | |
|----------|:-------------:|------:|
| [![@bhargavkonkathi](https://avatars2.githubusercontent.com/u/24550636?v=3&u=ddd3f64f6888100d6eebd283768b61dabc6f495d&s=80)](https://github.com/bhargavkonkathi) |  Programming is like playing chess; each line is as important as each step to determine what kind of player or programmer you are. When ever not playing chess, it's Javascript, Java and mongodb.
| [![@maisnamraju](https://avatars2.githubusercontent.com/u/2786378?v=3&s=80)](https://github.com/maisnamraju) |  Javascript Ninja; saving the world with one line of javascript at a time. ;) 
| [![@dhrytsenko](https://avatars0.githubusercontent.com/u/12988041?v=3&s=80)](https://github.com/dhrytsenko) | What is my opinion about JavaScript, NodeJS, MongoDB and Polymer? Building blocks to the future! Allowing me to help make the world a better place.



## Pull Requests are welcome

If you feel that you have something that could improve the component, please feel free to send a PR or create an issue with an explaination.

## License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License version 3 of the License as published by
the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

This project uses a fair share license construction, if you wish to use this project commercially you will likely want to
continue reading [here](https://github.com/David-Mulder/fair-share-license/blob/master/CONTRIBUTING.md). If you wish to
donate please contact me personally.
