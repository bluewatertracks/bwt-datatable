# Bwt-datatable

We greatly appreciated the work of [David Mulder's paper-datatable](https://github.com/David-Mulder/paper-datatable) and decide to inherited it cause so good project must to evolve. Since many people already use `paper-datatable` component we create this component in compability with `paper-datatable`. You can easily use this element only change path to `paper-datatable` elements to import it. The example is below

### Before
	<link rel="import" href="/bower_components/paper-datatable/paper-datatable.html">
	
### Now
	<link rel="import" href="/bower_components/bwt-datatable/bwt-datatable.html">

 - Documentation can be found [here](http://david-mulder.github.io/paper-datatable/components/paper-datatable/docs/docs.html?installation)
 - Demos can be found [here](http://david-mulder.github.io/paper-datatable/components/paper-datatable/demo/paper-datatable-card/full-implementation.html)

[![datatable full implementation](http://david-mulder.github.io/paper-datatable/components/paper-datatable/docs/screenshot.png)](http://david-mulder.github.io/paper-datatable/components/paper-datatable/demo/paper-datatable-card/full-implementation.html)

## New changes

 - Column header update dynamically according to [paper-datatable pull request #78](https://github.com/David-Mulder/paper-datatable/pull/78)
 - Ability to use `bwt-datatable` on mobile devices by easily set `responseWidth` property to desired screen resolution.
 
 		<paper-datatable data="{{data}}" selectable multi-selection response-width="767px">
			<paper-datatable-column header="Title" property="title" sortable editable>
			</paper-datatable-column>
		</paper-datatable>

<p align="center">
  <img src="https://github.com/bluewatertracks/bwt-datatable/blob/master/images/bwt-datatable-mobile.png" alt="bwt-datatable mobile view"/>
</p>

We also try to add additional functionality and fix some bugs in datatable and we approve some pull requests from `paper-datatable`:
- Fix issue with null values inside paper-column [pull request #113](https://github.com/David-Mulder/paper-datatable/pull/113)
- Change es6 to es5 code [request #51](https://github.com/David-Mulder/paper-datatable/pull/51) and [request #106](https://github.com/David-Mulder/paper-datatable/pull/106) 
- Use textContent instead of innerHTML inside elements [request #108](https://github.com/David-Mulder/paper-datatable/pull/108) 

## Installation

The element can be installed using bower using

    bower install --save bwt-datatable

**Important:** If you wish to use `<bwt-datatable-card>` you need the paper elements listed in `devDependencies` as well. They are not listed as normal dependencies to prevent them from being pulled in on production if you do not need them.

## Usage

Check out the [getting started guide](http://david-mulder.github.io/paper-datatable/components/paper-datatable/docs/docs.html?getting-started).

## Contributors

[![Maisnam Raju Singh](https://avatars2.githubusercontent.com/u/2786378?v=3&s=80)](https://github.com/maisnamraju)
[![Dmytro Hrytsenko](https://avatars0.githubusercontent.com/u/12988041?v=3&s=80)](https://github.com/dhrytsenko)
[![Bhargav Konkathi](https://avatars2.githubusercontent.com/u/24550636?v=3&u=ddd3f64f6888100d6eebd283768b61dabc6f495d&s=80)](https://github.com/bhargavkonkathi)

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
