class Process {
    constructor(str){
        var self=this;
		var $progressbody = $('<div class="progressbody"></div>');
		var $progresslable = $('<div class="progresslable">Starting upload ...</div>');
        this.$progressbar = $('<div  class="progressbar"></div>').progressbar({
        	value:0,
        	change:function(){
        		$progresslable.text( "Current Progress: " + self.$progressbar.progressbar( "value" ) + "%" );
        	},
        	complete:function(){
        	    $progressdialog.dialog("close");
        	}
        });

        $progressbody.append($progresslable);
        $progressbody.append(this.$progressbar);


        var $progressdialog = $("<div></div>").dialog({
			modal:false,
			closeOnEscape: false,
			dialogClass:'processdialog',
			title:"Uploading Files",
			position:{

			},
			open:function(event, ui){
				$(this).parent().find(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
				$(this).append($progressbody);
			}
		});
    }
}