Launch.GridManager = function(options) {
                
        var $grid = $(".launch-grid");        
        $grid.bind("reloadGrid", options.onReload);		        
                
        //maybe there should be a populate method in case of big data so that reloadGrid is triggered only once        
		this.createRow = function(id, row) {
		    $grid.jqGrid('addRowData', id, row);
		    $grid.trigger("reloadGrid");
		}
		
		this.updateRow = function(id, row) {
		    $grid.jqGrid('setRowData', id, row);
		    $grid.trigger("reloadGrid");
		}
		
		this.deleteRow = function(id) {
		    $grid.jqGrid('delRowData', id);		
		    $grid.trigger("reloadGrid");
		}
		
		$grid.delegate(".launch-updater", "click", function(){
            options.onUpdateClick($(this).attr("rel"));
		});        
        
		$grid.delegate(".launch-deleter", "click", function(){
            options.onDeleteClick($(this).attr("rel"));
		});      		
		
		$grid.jqGrid({
			datatype: "local",
			pager: '#launch_grid_pager',
			recordtext: "View {0} - {1} of {2}",
			viewrecords: true,
            autoencode: true,
            gridComplete: function() {
                var ids = $grid.jqGrid('getDataIDs');
				$grid.jqGrid('setGridParam', {autoencode:false});
                for (var i = 0; i < ids.length; i++) {
                    var rowId = ids[i];
                    var buttons = '<a class="launch-updater" rel="' + rowId + '" href="#">Edit</a> <a class="launch-deleter" rel="' + rowId + '" href="#">Delete</a>';
                    $grid.jqGrid('setRowData', rowId, { actions: buttons });                    
                }
				$grid.jqGrid('setGridParam', {autoencode:true});
            },                
			colNames:['ID', 'Title', 'Brand', 'Launch TimeFrame', 'Est. Sales Potential (USD)', 'Est. Sales Potential (CHF)', 'Status', 'Actions'],
			colModel:[
				{
					name:'id', 
					index: 'id',
					sorttype:"int", 
					width: 50, 
					formatter: function(value) {
						var str = '' + value;
						if (str.length == 1) {
							str = '0' + str;
						}
						return 'ML' + str;		
					}							
				},
				{name: 'title', index: 'title'},
				{name: 'brand', index: 'brand'},
				{name: 'timeframe', index : function(obj){
					//timeframe should be sorted by year first and then by quarter. 
					return obj.timeframe.substr(obj.timeframe.length - 4) + obj.timeframe[1];
				}},
				{name: 'usd_potential', index: 'usd_potential', width: 80, align: "right", sorttype: "float", "formatter": "currency"},		
				{name: 'chf_potential', index: 'chf_potential', width: 80, align: "right", sorttype: "float", "formatter": "currency"},
				{name: 'status', index : 'status'},	
				{name:'actions', width:50, sortable: false}		
			]
		});
}		
		
