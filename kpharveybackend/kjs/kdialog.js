class KDialog{
    constructor(config){
        var intmaxheight = (config.maxheight)?config.maxheight:300;
        var intheight = (config.height)?config.height:300;

		var $dialog = $('<div></div>').dialog({
			modal:false,
			dialogClass:'moduledialog',
			open:function(){
                var $titlebar = $(this).parent().find(".ui-dialog-titlebar");
                $titlebar.empty();
                $titlebar.append(config.title);
                $titlebar.append(config.titlebuttons);
                $(this).append(config.content);
			},
			buttons:config.buttons
		});

        $dialog.dialog("option", "height", intheight);
		if(config.width)$dialog.dialog("option", "width", config.width);
		if(config.maxheight)$dialog.dialog("option", "maxHeight", config.maxheight);
		

		return $dialog;
    }

    buttons(){
        
    }
}