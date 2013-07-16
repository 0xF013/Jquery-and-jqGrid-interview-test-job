Launch.DialogManager = function(options){
    
        
        function invalidateForm($form) {
            //gotta replace with a nice form invalidation
			$form.find(":input").val("").removeClass("error");
			$form.find(":selected").removeAttr("selected");
        }
        
        function populateForm($form, entity) {
			if (entity) {
				$form.attr("rel", entity.id);
				$.each(entity, function(k, v){
					$form.find("[name=" + k + "]").val(v);
				});
			} else {
				$form.attr("rel", "");
			}
        }

		this.showFormDialog = function(entity) {
			var $form = $(".launch-form-dialog form");
			invalidateForm($form);
			populateForm($form, entity);
			var $dialog = $(".launch-form-dialog");
			$dialog.dialog({
				modal: true,
				title: "Market Launch",
				width: "auto",
				buttons: {
					"Cancel" : function() {$dialog.dialog("close");},
					"Save": function() {$form.submit();}
				}
			});		
		}
		
		this.showConfirmDialog = function(confirmOptions){
            var $dialog = $(".launch-delete-dialog");
            $dialog.dialog({
                modal: true,
                title: "Confirm",
                width: "auto",
                buttons: {
                    "Cancel" : function() {
                        confirmOptions["cancel"](function(){
                            $dialog.dialog("close");
                        });
                },
                    "Ok": function() {
                        confirmOptions["ok"](function(){
                            $dialog.dialog("close");
                        });
                    }
                }
            });
		}
        
		var $form = $(".launch-form-dialog form");
		$.validator.messages.required = "";
		$.validator.messages.digits = "";
		$form.validate();
		$form.submit(function(){
			if (!$form.valid()) {
				return false;
			}
			var data = {};
			$form.find(":input").each(function(){
				var $input = $(this);
				data[$input.attr("name")] = $input.val();
			});
			
			//in case the form becomes more complicated, this part should be refactored to a mapping of form data to entity
			data['potential'] = parseFloat($("[name=potential]").val());
			if (isNaN(data['potential'])) {
				data['potential'] = 0.0;
			}
			
			var id = 0;
			
			var $dialog = $(".launch-form-dialog");
			if (id = $form.attr("rel")) {
                options.onUpdate(id, data, function(){
                    $dialog.dialog("close");
                });
			} else {
                options.onCreate(data, function(){
                    $dialog.dialog("close");
                });
			}
			return false;
		});
}
