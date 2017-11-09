/*
 IMPORTANT: Right now this Cache is **not** weak in the sense that it discards items based memory pressure, however
 it is written in a way that will allow this later to be added without rewriting the rest of the code and right now
 'emulates' the behaviour by having a fixed maximum of items.
 */
class WeakCache {
	constructor(limit) {
		this.limit = limit;
		this.values = [];
		this.keys = [];
	}
	set (key, obj) {
		var index = this.keys.indexOf(key);
		if(index  > -1){
			this.values[index] = obj;
			this.values.splice(this.values.length, 0, this.values.splice(index, 1)[0]);
			this.keys.splice(this.keys.length, 0, this.keys.splice(index, 1)[0]);
		}else{
			this.keys.push(key);
			this.values.push(obj);
			if(this.keys.length > this.limit){
				this.keys.shift();
				this.values.shift();
			}
		}
	}
	has (key){
		return this.keys.indexOf(key) > -1;
	}
	get (key){
		var index = this.keys.indexOf(key);
		return this.values[index];
	}
	delete (key){
		var index = this.keys.indexOf(key);
		this.values.splice(index, 1);
		this.keys.splice(index, 1);
	}
}