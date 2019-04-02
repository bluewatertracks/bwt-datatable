
/**
 * This file is only an example how you could use this datatable
 */
import { PolymerElement, html } from '@polymer/polymer';
import '../../node_modules/bwt-datatable/bwt-datatable.js';
import '../../node_modules/bwt-datatable/bwt-datatable-card.js';
import '../../node_modules/bwt-datatable/bwt-datatable-column.js';
class YourDatatable extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                /*
                    Styles goes here to change something on table
                */
                --paper-datatable-selection-toolbar-color: var(--secondary-color);
                --paper-datatable-selection-toolbar-text-color: #fff;

                --paper-datatable-checkbox-color: var(--secondary-color);
                --paper-datatable-header-checkbox-color: var(--secondary-color);
                --paper-datatable-top-toolbar-header: {
                    font-size: 16px;
                    line-height: 20px;
                    font-weight: bold;
                    color: var(--page-header-color, #000);
                }
            }

        </style>

        <paper-datatable-card id="datatableCard" header="[[headerLabel]]" pagination-label="Cantidad de líneas" data-source="{{dataSource}}" id-property="_id" selected-ids="{{selectedIds}}" page-size="5">
            <!-- You can add whatever you want to toolbar based on number of selected rows -->
            <div slot="toolbar-main">
				<paper-input value="{{searchTerm}}" on-input="retrieveResults" label="Search..." style="display:inline-block" no-label-float>
                    <div prefix>
                        <iron-icon icon="search"></iron-icon>
                    </div>
			    </paper-input>
				<paper-icon-button icon="add" role="button"></paper-icon-button>
			</div>
			<div slot="toolbar-select" hidden$="[[!multiSelection]]">
				<paper-icon-button icon="delete"></paper-icon-button>
			</div>
			<div slot="toolbar-select-single">
				<paper-icon-button icon="datatable:editable"></paper-icon-button>
			</div>
			<paper-datatable id="datatableElement" selectable="[[selectable]]" multi-selection>
			    <slot></slot>
			</paper-datatable>
		</paper-datatable-card>
        `;
    }

    static get is() {
        return 'your-datatable';
    }

    // Element properties
    static get properties() {
        return {
            /**
             * Datatable props
             */
            headerLabel: String,
            dataSource: Object,
             /*
                A list with selected row items (it's have whole object with all properties)
            */
            selectedItems: Array,
            /*
                A list with selected row ids
            */
            selectedIds: Array,
            selectedKeys: Array,
            /**
             * You can use this prop to bind selection from parent component
             */
            selectable: {
                type: Boolean,
                value: false,
            },
            /**
             * You can use this prop to bind selection from parent component
             */
            multiSelection: {
                type: Boolean,
                value: false,
            },
             /**
             * Youer property to send data
             */
            data: {
                type: Array,
                value: [],
                observer: "_dataChanged"
            },
            /**
             * Query string what you want to find
             */
            searchTerm: {
                type: String,
                value: ''
            }
        }
    }

    ready() {
        super.ready();
    }

    _dataChanged(data) {
        //call it to initialize a table
        this.dataSource = this.setData();
    }
    /**
     * Initialize datatable with funstion to make actions as sort etc
     * @param {string} idProp property which will be served as `id` prop
     */
    setData(idProp) {
        if (!idProp) idProp = "_id";
        return {
            queryForIds: (sort, page, pageSize) => {
                return this.select(this.data, '_id', this.searchTerm, sort, (page - 1) *
                    pageSize, page * pageSize, idProp);
            },
            getByIds: (ids) => {
                return this.select(this.data, '*', ids, null, null, null, idProp);
            },
            set: (item, property, value) => {
                return this.update(item._id, property, value);
            },
            length: 0
        }
    }
    /**
     * Perform all types of actions with table from initialization to filter and sorting
     * @param {Array} columns list of table rows
     * @param {String} rowName property of a row
     * @param {String} query search phase to filder table data
     * @param {Object} orderBy order direction `desc` or `asc`
     * @param {Number} skip when use pagination number of items to skip
     * @param {Number} limit max number of rows in table
     * @param {String} idProp property which will be served as `id` prop
     */
    select(columns, rowName, query, orderBy, skip, limit, idProp) {
        if (typeof query === 'object') {
            return new Promise((resolve, reject) => {
                resolve(columns.filter((item) => {
                    return query.indexOf(item[idProp]) > -1;
                }));
            });
        } else {
            return new Promise((resolve, reject) => {
                var searchedItems;
                if (query.length > 0) {
                    searchedItems = columns.filter((item) => {
                        for (var key in item) {
                            if (key == '_id' || !item[key]) continue;
                            if (typeof item[key] == "object" || typeof item[key] == "boolean") continue;
                            if (typeof item[key] == "number") item[key] = item[key].toString();
                            if (item[key].toLowerCase().indexOf(query.toLowerCase()) > -1) return true;
                        }
                    });
                } else {
                    searchedItems = columns;
                }
                this.set('dataSource.length', searchedItems.length);
                if (orderBy && orderBy.property != "_id") {
                    searchedItems.sort((a, b) => {
                        if (orderBy.direction == 'desc') {
                            var c = a;
                            a = b;
                            b = c;
                        }
                        a = a[orderBy.property];
                        b = b[orderBy.property];
                        a = typeof a === 'string' ? a.toLowerCase() : a;
                        b = typeof b === 'string' ? b.toLowerCase() : b;

                        if (a > b) return 1;
                        if (a < b) return -1;
                        return 0;
                    });
                }
                if (searchedItems.length <= 5 && rowName === '_id')
                    resolve(searchedItems.slice(0, limit).map((item) => item[idProp]));
                if (rowName === '_id') resolve(searchedItems.slice(skip, limit).map((item) => item[idProp]));
                else resolve(searchedItems.slice(skip, limit));
            });
        }
    }
    /**
     * Update table in case if you edit cell/row and update it withour full reset and 
     * @param {String} id id of edited row
     * @param {String} property property to change
     * @param {String} value bew value to set
     */
    update(id, property, value) {
        return new Promise((resolve, reject) => {
            var editedItem;
            this.data.forEach((item) => {
                if (item._id == id) {
                    editedItem = item;
                }
            });
            //call this func to send data to server
            this._sendDateToServer(editedItem, property, value);
            editedItem[property] = value;
            resolve(true);
        });
    }
    /**
     * Refresh table if perform any actions
     */
    retrieveResults() {
        this.$.datatableCard.retrieveVisibleData();
    }
}
window.customElements.define(YourDatatable.is, YourDatatable);
