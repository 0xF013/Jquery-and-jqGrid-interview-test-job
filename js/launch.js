var Launch = new function() {

	function mapEntityToGridRow(entity) {
		return {
			id: entity.id,
			title: entity.title,
			brand: entity.brand,
			quarter: entity.quarter,
			year: entity.year,
			timeframe: "Q" + entity.quarter.toString() + " " + entity.year.toString(),
			usd_potential: entity.potential,
			chf_potential: calculateUDF(entity.potential),
			status: entity.status
		};
	}
	
	function calculateUDF(value) {
		return value * 0.9;
	}
	
	this.init = function() {
	    var repository = new Launch.Repository();
	    var gridManager;
	    var dialogManager = new Launch.DialogManager({
	        onCreate: function(data, callback) {
				repository.create(data, function(entity){
					gridManager.createRow(entity.id, mapEntityToGridRow(entity));
					callback();
				});				        
	        },	    
	        onUpdate: function(id, data, callback) {
				repository.update(id, data, function(entity){
                    gridManager.updateRow(entity.id, mapEntityToGridRow(entity));
					callback();
				});	        
	        }
	    });
	    
	    gridManager = new Launch.GridManager({
            onReload: function () {
		        repository.getList(function(data){
			        var count = 0;
			        var totalPotential = 0.0;
			        $.each(data, function(id, entity){
				        count++;
				        totalPotential += entity.potential;
			        });
			        $(".launch-summary-count").text(count);
			        $(".launch-summary-regionalAmount").text(totalPotential.toFixed(2));
			        $(".launch-summary-globalAmount").text(calculateUDF(totalPotential).toFixed(2));
		        });
		    },
		    
		    onUpdateClick: function(id){
                repository.getEntity(id, function(entity){
                    dialogManager.showFormDialog(entity);
                });			
                return false;
		    },
		    
		    onDeleteClick: function(id) {
                dialogManager.showConfirmDialog({
                    "ok": function(callback){
                        repository.remove(id, function(){
                            gridManager.deleteRow(id);     
                            callback();                      
                        });		
                    },
                    "cancel": function(callback) {
                        callback();
                    }
                });
                return false;		    
		    }
        });
        
        //bind button
		$(".launch-adder").click(function(){
			dialogManager.showFormDialog();
		});        
        
        //populate grid
		repository.getList(function(entities) {					
			$.each(entities, function(id, entity) {
				gridManager.createRow(entity.id, mapEntityToGridRow(entity));
			});
		});	
	};
};

$(function(){
    Launch.init();
});









