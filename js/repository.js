Launch.Repository = function(){
		var maxID = 2;
		var defaultStatus = 'To Be Launched';
	
		var entities = {			
			"1" : {id: "1", title: "Summer Launch", brand: "Vinter's Chip", quarter: 2, year: "2011", potential: 12000.0, 'status' : defaultStatus, "win_id" : 1},
			"2" : {id: "2", title: "Winter Launch", brand: "Vinter's Chip", quarter: 4, year: "2010", potential: 10000.0, 'status' : defaultStatus, "win_id" : 2}
		};
		
		//we use a callback instead of return to be able to swap the datasource for a async one
		this.getList = function(callback) {
			callback(entities);
		};
		
		this.getEntity = function(id,callback) {
			callback(entities[id] || null);
		};		
		
		this.create = function(data, callback) {
			var id = ++maxID;
			$.extend(data, {id:id, status: defaultStatus});
			entities[id] = data;
			callback(entities[id]);
		};		
		
		this.update = function(id, data, callback) {
			var entity = entities[id];
			$.extend(entity, data);
			callback(entity);
		};		
		
		this.remove = function(id, callback) {
			delete entities[id];
			callback();
		};			
	};
