import { PolymerElement, html } from '../@polymer/polymer';
import { mixinBehaviors } from '../@polymer/polymer/lib/legacy/class.js';
import { Templatizer } from '../@polymer/polymer/lib/legacy/templatizer-behavior.js';
import { Whenever } from './src/whatever.js';
import { dom } from '../@polymer/polymer/lib/legacy/polymer.dom.js';
'use strict';
class PaperDatatableColumn extends mixinBehaviors([Templatizer], PolymerElement) {
	static get template() {
		return html`
		<style>
			:host {
				display: block;
			}
		</style>
		<template id="arrayTemplate">
			<template is="dom-repeat" items="[[value]]" as="arrayItem">
				<div class="array-item">[[_getArrayItemLabel(column, arrayItem)]]</div>
			</template>
		</template>
		<template id="editableInputTemplate">
			<paper-input type="[[_getCorrectTypeForInput(column.type)]]" value="{{value}}" step="any" no-label-float></paper-input>
		</template>
		<template id="editableBooleanTemplate">
			<paper-checkbox checked="{{value}}"></paper-checkbox>
		</template>`;
	}
	static get properties() {
		return {
			/**
				 * String displayed in `<th></th>`
				 *
				 * @attribute header
				 * @type String
				 * @required
				 */
			header: {
				type: String,
				notify: true,
				observer: '_headerChanged'
			},
			/**
			 * The property to be used from `data` for this column
			 *
			 * @attribute property
			 * @type String
			 * @required
			 */
			property: String,
			/**
			 * The type of the property (can be 'String', 'Number', 'Array', 'Date', etc.)
			 * Used for sorting and default display
			 *
			 * @attribute type
			 * @type String
			 * @default 'String'
			 */
			type: {
				type: String,
				value: 'String'
			},
			/**
			 * Tooltip shown when hovering the `<th>`
			 *
			 * @attribute tooltip
			 * @type String
			 */
			tooltip: {
				type: String,
				notify: true
			},
			/**
			 * Whether to show sorting UI on the column. Sorting only works automagically
			 * on simple data types.
			 *
			 * @attribute sortable
			 * @type Boolean
			 * @default false
			 */
			sortable: Boolean,
			/**
			 * Whether the column is currently sorted. Should only be set on one column at a time
			 *
			 * @attribute sorted
			 * @type Boolean
			 * @default false
			 */
			sorted: {
				type: Boolean,
				notify: true,
				observer: '_sortChanged',
				reflectToAttribute: true
			},
			/**
			 * Whether the column is currently sorted. Should only be set on one column at a time
			 *
			 * @attribute sortDirection
			 * @type String
			 * @default 'asc'
			 */
			sortDirection: {
				type: String,
				value: 'asc',
				observer: '_sortChanged'
			},
			/**
			 * If `type` is a simple type, then if this is true one of the default editable
			 * templates is used. For example if `type` is `String` every cell will contain
			 * a `<paper-input>`. This is practically just a convenience method so that you
			 * don't have to define every `<template>` on your own.
			 *
			 * If you do use a custom `<template>` this will prevent a `row-tap` from triggering
			 * a selection. So if you click in a `<paper-input>` it won't select the row.
			 *
			 * @attribute editable
			 * @type Boolean
			 * @default false
			 */
			editable: Boolean,
			/**
			 * If `type` is an `Array` and the array consists of `Object`s it's a common need
			 * to display a single property of every object (in non-editable mode).
			 *
			 * Note that it's not possible to use this in combination with an editable dialog,
			 * as internally this is using a `<template>` and Polymer currently allows only
			 * one template to be templatized per element.
			 *
			 * @attribute arrayDisplayProp
			 * @type String
			 */
			arrayDisplayProp: String,
			/**
			 * Style to be applied to every cell.
			 *
			 * @attribute cellStyle
			 * @type String
			 */
			cellStyle: {
				type: String,
				value: ''
			},
			/**
			 * Convenience attribute to align the header and cell content (e.g. 'center')
			 *
			 * @attribute align
			 * @type String
			 * @default 'left'
			 */
			align: {
				type: String,
				value: 'left'
			},
			/**
			 * Style to be applied to the header.
			 *
			 * @attribute style
			 * @type String
			 */
			_styleString: {
				type: String,
				value: function () {
					var alignment = this.align || this.getAttribute('align') || 'left';
					var minWidth = this.width || this.getAttribute('width') || 0;
					minWidth += parseFloat(minWidth).toString() === minWidth ? 'px' : '';
					var styleString = this.getAttribute('style') || '';
					return 'text-align:' + alignment + ';min-width:' + minWidth + ';' + styleString;
				}
			},
			/**
			 * If you have `undefined`'s in your `data` this method can be used to
			 * set a default, thus preventing auto-saves from triggering.
			 *
			 * @attribute default
			 * @type Object
			 */
			default: Object,
			/**
			 * Can be overwritten to manually format the value in a non-editable state
			 *
			 * IMPORTANT: This is a property, not a method you should call directly.
			 *
			 * @attribute formatValue
			 * @type Function
			 * @default see code
			 */
			formatValue: Function,
			/**
			 * Can be overwritten to manually sort the datatable if internal sorting is used. This is a normal
			 * function following the Javascript sort API.
			 *
			 * IMPORTANT: This is a property, not a method you should call directly.
			 *
			 * @attribute sort
			 * @type Function
			 * @default see code
			 */
			sort: Function,
			/**
			 * Instead of rendering the `<template>` inline in the cell it will instead be rendered in a
			 * floating `<paper-datatable-edit-dialog>` after the user `tap`s on the cell.
			 *
			 * @attribute dialog
			 * @type Boolean
			 * @default false
			 */
			dialog: {
				type: Boolean
			},
			/**
			 * Per material design spec it's often useful to indicate that a cell is editable if you're using
			 * `[dialog]` based editing. This will show a little pencil icon to the right of the cell, but can be
			 * a bit overwhelming if used on more than one column.
			 *
			 * @attribute editIcon
			 * @type Boolean
			 * @default false
			 */
			editIcon: {
				type: Boolean
			},

			/**
			 * Removing and adding columns entirely from the DOM is a bit hard, so instead there is this
			 * convenience method to entirely disable a column.
			 *
			 * @attribute inactive
			 * @type Boolean
			 * @default false
			 */
			inactive: {
				type: Boolean,
				observer: '_requeryColumnList'
			},
			/**
			 * If you're using the `dynamic-columns` resize behavior this attribute is used to determining
			 * how important the column is when columns have to be hidden due to the window size. Set to -1
			 * if the column should always be shown. If columns have the same priority they will be assumed to
			 * be ordered by importance from left to right.
			 */
			resizePriority: {
				type: Number,
				value: 0
			},
			/**
			 * Mostly just a convenience attribute to set min-width, but required in conjuction with
			 * the `dynamic-columns` resize behavior
			 *
			 * @type Number in px or String
			 */
			width: Object
		}
	}
	static get is() {
		return 'paper-datatable-column';
	}
	ready() {
		super.ready();
		this.beenAttached = Whenever();
		// if template exists user use hiw own implementation for column content
		let template = dom(this).querySelector('template');
		if (!template) {
			if (this.type.toLowerCase() == 'array') {
				template = this.$.arrayTemplate;
			} else if (this.editable && this.type.toLowerCase() == 'string') {
				template = this.$.editableInputTemplate;
			} else if (this.editable && this.type.toLowerCase() == 'number') {
				template = this.$.editableInputTemplate;
			} else if (this.editable && this.type.toLowerCase() == 'boolean') {
				template = this.$.editableBooleanTemplate;
			}
		}

		if (template) {
			this._instanceProps = {};
			this._instanceProps.item = true;
			this._instanceProps.value = true;
			this._instanceProps.column = true;
			this.templatize(template);

			this.template = true;
		}
	}

	connectedCallback() {
		super.connectedCallback();
	}

	_createCellInstance(model, notificationKey) {
		if (typeof model[this.property] == 'undefined' && typeof this.default !== 'undefined') {
			var instance = this.stamp({ item: model, column: this, value: this.default, _dataKey: notificationKey });
		} else {
			var instance = this.stamp({ item: model, column: this, value: model[this.property], _dataKey: notificationKey });
		}
		return instance;
	}

	_formatValue(data) {
		data = this._cast(data);
		if ('formatValue' in this) {
			return this.formatValue(data);
		}
		if (typeof data == 'undefined') {
			return '';
		}
		var value = this._cast(data);
		if (this.type.toLowerCase() == 'string') {
			return value;
		} else if (this.type.toLowerCase() == 'number') {
			return value;
		} else if (this.type.toLowerCase() == 'boolean') {
			return value ? 'Yes' : 'No';
		} else if (this.type.toLowerCase() == 'date') {
			var prependZero = function (val) {
				return val < 10 ? '0' + val : val;
			}
			return value.getUTCFullYear() + '/' + prependZero(value.getUTCMonth() + 1) + '/' + prependZero(value.getUTCDate()) + '&nbsp;' + prependZero(value.getUTCHours()) + ':' + prependZero(value.getUTCMinutes()) + ':' + prependZero(value.getUTCSeconds());
		} else {
			console.warn('Complex objects should implement their own template or format-value function.', data);
			return '?';
		}
	}

	_sort(valA, valB) {
		valA = this._cast(valA);
		valB = this._cast(valB);

		if ('sort' in this) {
			return this.sort(valA, valB);
		}

		if (valA < valB) return -1;
		if (valA > valB) return 1;
		return 0;
	}

	_cast(value) {
		if (typeof value === 'undefined' || value === null) {
			if (typeof this.default !== 'undefined') {
				value = JSON.parse(JSON.stringify(this.default));
			} else {
				value = '';
			}
		}

		if (this.type.toLowerCase() == 'string') {
			return value.toString();
		} else if (this.type.toLowerCase() == 'number') {
			return parseFloat(value);
		} else if (this.type.toLowerCase() == 'boolean') {
			return value ? true : false;
		} else if (this.type.toLowerCase() == 'date') {
			return new Date(value);
		} else {
			return value;
		}
	}

	_sortChanged() {
		if (this.sorted && this.beenAttached) {
			this.beenAttached.whenReady(function () {
				this.parentNodeRef.sort(this);
			}.bind(this));
		}
	}

	_forwardParentProp(prop, value) {
		console.warn('_forwardParentProp', arguments);
	}
	_forwardParentPath(prop, value) {
		console.warn('_forwardParentPath', arguments);
	}

	_forwardInstanceProp(templateInstance, prop, value) {
		var path = prop.split('.');
		var item = path.shift();
		if (item == 'value') {
			var parentPath = ['data', templateInstance.get('_dataKey'), this.property];
			value = this._cast(value);
			this.parentNodeRef.set(parentPath, value);
		} else if (item == 'item') {
			console.warn('_forwardInstanceProp', arguments);
		}
	}

	_forwardInstancePath(templateInstance, prop, value) {
		var path = prop.split('.');
		var item = path.shift();
		if (item == 'value') {
			var parentPath = ['data', templateInstance.get('_dataKey'), this.property].concat(path);
			if (path.length == 0) {
				value = this._cast(value);
			}
		} else if (item == 'item') {
			var parentPath = ['data', templateInstance.get('_dataKey')].concat(path);
		}
		this.parentNodeRef.set(parentPath, value);
	}
	_requeryColumnList() {
		//only trigger this if ready, anything before that point will be handled automatically during
		// initial initialization.
		if (this.beenAttached.state.ready) {
			this.parentNodeRef._queryAndSetColumns();
		}
	}
	_getArrayItemLabel(column, value) {
		return column.arrayDisplayProp ? value[column.arrayDisplayProp] : value;
	}
	_getCorrectTypeForInput(type) {
		if (type.toLowerCase() == 'string') {
			return 'string';
		} else if (type.toLowerCase() == 'number') {
			return 'number';
		}
	}
	_headerChanged(header) {
		this.fire('header-changed');
	}
}
window.customElements.define(PaperDatatableColumn.is, PaperDatatableColumn);
