export const Whenever = () => {
	var callbacks = [];
	var ready = false;
	var args;
	return {
		get state(){
			return {
				ready: ready,
				args: args,
				pendingCallbacks: callbacks.length
			};
		},
		ready() {
			args = arguments;
			callbacks.forEach(function(callback){
				callback.apply(this, args);
			});
			callbacks = [];
			ready = true;
		},
		whenReady(callback) {
			if(ready){
				callback.apply(this, args);
			}else{
				callbacks.push(callback);
			}
		}
	}
};