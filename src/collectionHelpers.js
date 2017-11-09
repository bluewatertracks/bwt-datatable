class CollectionHelpers {
    constructor(data) {
        this.store = data.slice();
        this._initMap();
    }

    getItem (key) {
        if (key = this._parseKey(key)) {
            return this.store[key];
        }
    }

    getKey (item) {
        let key;
        if (item && typeof item == 'object') {
            key = this.omap.get(item);
        } else {
            key = this.pmap[item];
        }
        if (key != undefined) {
            return '#' + key;
        }
    }

    getKeys () {
        return Object.keys(this.store).map((key) => {
            return '#' + key;
        });
    }

    _initMap () {
        this.omap = new WeakMap();
        this.pmap = {};
        var s = this.store;
        this.store.forEach((item, index)=>{
            if (item && typeof item == 'object') {
                this.omap.set(item, index);
            } else {
                this.pmap[item] = index;
            }
        });
    }

    _parseKey (key) {
        if (key && key[0] === '#') {
            return key.slice(1);
        }
    }
}
