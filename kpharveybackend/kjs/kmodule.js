class KModule{
    constructor(config){
		this.$dialog = $('<div></div>').dialog({
			modal:false,
			dialogClass:config.dialogClass,
			title:config.title,
			open:function(){
				$(this).append(config.content);
			},
			buttons:{
				'Add User':function(){
					config.self.useradd();
				}
			},
			beforeClose:function(event, ui){
				if(config.self.checksaved != JSON.stringify(config.self.data)){
					var $stralert = $('<div></div>');
					if(config.self.checksaved == ""){
						$stralert.html(config.title + " has not been saved. Do you want to save before closing?");
					}else{
						$stralert.html(config.title + " been modified. Do you want to save before closing?");
					}
					$('<div></div>').dialog({
						modal:true,
						dialogClass:'',
						title:config.title + " Unsaved Changes",
						width:380,
						buttons:{
							'Save':function(){

							},
							"Discard":function(){
								$(this).dialog("close");
								config.self.checksaved = JSON.stringify(config.self.data);
								config.self.$dialog.dialog("close");
							},
							"Cancel":function(){
								$(this).dialog("close");
							}
						},
						open:function(){
							$(this).append($stralert);
							$('.ui-dialog-buttonpane').find('button:contains("Save")').prepend('<div class="fa fa-floppy-o dialogbuttonicon"></div>');
							$('.ui-dialog-buttonpane').find('button:contains("Discard")').prepend('<div class="fa fa-window-close dialogbuttonicon"></div>');
							$('.ui-dialog-buttonpane').find('button:contains("Cancel")').prepend('<div class="fa fa-ban dialogbuttonicon"></div>');
						}
					});
					return false;
				}
			}
		});
    }
}