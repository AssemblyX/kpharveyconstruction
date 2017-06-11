/***
KPHarveryConstrution
Client admin
***/

class KAdminclient{
    constructor(){
    	this.wincreated = false;
    	this.type = {
    		name : "client",
    		lable : "Client"
    	}
    	this.checksaved = "";
    	this.uniqueid = 1;

        this.$divcontent = $('<div class="modulecontent"></div>');
        this.getmodule();
    }

    makewin(){
    	var config = {};
        var self = this;

		var $divtitle = $('<div class="dalogtitlediv"></div>');
		$divtitle.text(this.type.lable);

		var $divtitlebuttons = $('<div class="dalogtitlebuttondiv"></div>');
		var $close = $('<button type="button" class="dalogtitlebutton"><i class="fa fa-times dalogtitlebuttonicon" aria-hidden="true"></i></button>');
    	$close.on("click", function(e){
			e.stopPropagation() 
			e.preventDefault();
    		self.$dialog.dialog("close");
    	});

    	$divtitlebuttons.append($close);
		
		config.title = $divtitle;
		config.titlebuttons = $divtitlebuttons;
		config.content = this.$divcontent;
		config.buttons = { 
			'New':function(){
				self.moduleadd();
			}
		}
		this.$dialog = new KDialog(config);
		this.wincreated = true;
    }

    getmodule(){
		kctrl.send({config:{module:this.type.name, type:"list"}, data:{}}, this.modulelist.bind(this), {});
    }

    modulelist(json){
		this.$divcontent.empty();
    	var $ul = $('<ul class="modulelistul"></ul>');
    	for(var i=0; i<json.data.length; i++){
    		var $li = $('<li class="modulelistli"></li>');
    		$li.on("click", {json:json.data[i]}, function(e){
    			new KClient(e.data.json);
    		});



    		var $div = $('<div class="modulelistname modulelistleft modulelistlable"></div>');
    		$div.text(json.data[i].client_name);
    		$li.append($div);

    		$li.append($('<div style="clear:both"></div>'));

    		$ul.append($li);
    	}
    	this.$divcontent.append($ul);
    	if(!this.wincreated)this.makewin();
    }

	moduleinsert(){
		for(var i=0; i<this.moduleform.length; i++){
			if(this.moduleform[i].name != "user_password"){
				this.moduleform[i].value = this.moduleform[i].input.val();
			}else{
				this.moduleform[i].value = sha512(this.moduleform[i].input.val());
			}
		}
		var data = {};
		data.insert = this.moduleform;

		kctrl.send({config:{module:this.type.name, type:"insert"}, data:data}, this.moduleinsertreturn.bind(this), {});
	}

	moduleinsertreturn(json){
		if(!json.data.error){
			new KMsg(this.type.lable + " has been added.");
			for(var i=0; i<this.moduleform.length; i++){
				this.moduleform[i].input.val("");
				this.moduleform[i].value = "";
			}
			this.getmodule();
		}else{
			new KMsg(json.data.msg, "error");
		}
	}

    moduleadd(){
    	var config = {};
        var self = this;

        this.moduleform = [];
        this.moduleform.push({
			type:"text",
			name:"client_name",
			lable:"Name",
			input:$('<input type="text" value=""></input>')
		});

        this.moduleform.push({
			type:"text",
			name:"user_login",
			lable:"Login",
			input:$('<input type="text" value=""></input>')
		});

        this.moduleform.push({
			type:"text",
			name:"user_password",
			lable:"Password",
			input:$('<input type="text" value=""></input>')
		});

        var $divcontent = $('<div></div>');
		$divcontent.append(KForm.basicform(this.moduleform));

		var $divtitle = $('<div class="dalogtitlediv"></div>');
		$divtitle.text(this.type.lable + " Add");

		var $divtitlebuttons = $('<div class="dalogtitlebuttondiv"></div>');
		var $close = $('<button type="button" class="dalogtitlebutton"><i class="fa fa-times dalogtitlebuttonicon" aria-hidden="true"></i></button>');
    	$close.on("click", function(e){
			e.stopPropagation() 
			e.preventDefault();
    		self.$dialogadd.dialog("close");
    	});

    	$divtitlebuttons.append($close);
		
		config.modal = true;
		config.title = $divtitle;
		config.titlebuttons = $divtitlebuttons;
		config.content = $divcontent;
		config.modal = true;
		config.buttons = { 
			'Add':function(){
				self.moduleinsert();
			}
		}
		this.$dialogadd = new KDialog(config);
    }
}