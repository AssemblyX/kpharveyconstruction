/***
KPHarveryConstrution
User admin user
***/

class KAdminuser{
    constructor(){
    	this.wincreated = false;
    	this.type = {
    		name : "user",
    		lable : "User"
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
    	this.$divcontent.empty()

    	var $ul = $('<ul class="modulelistul"></ul>');
    	for(var i=0; i<json.data.length; i++){
    		var $li = $('<li class="modulelistli"></li>');

    		var $div = $('<div class="modulelistname modulelistleft modulelistlable"></div>');
    		$div.text(json.data[i].user_firstname + " " + json.data[i].user_lastname);
    		$li.append($div);

    		$li.append($('<div style="clear:both"></div>'));

    		$div = $('<div class="modulelistemail modulelistleft modulelistlable"></div>');
    		$div.text(json.data[i].user_email);
    		$li.append($div);


    		$li.append($('<div style="clear:both"></div>'));

    		$ul.append($li);
    	}
    	this.$divcontent.append($ul);
    	if(!this.wincreated)this.makewin();
    }

	moduleinsert(){
		for(var i=0; i<this.moduleform.length; i++){
			this.moduleform[i].value = this.moduleform[i].input.val();
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
			name:"user_firstname",
			lable:"First",
			input:$('<input type="text" value="Kenneth"></input>')
		});

		this.moduleform.push({
			type:"text",
			name:"user_lastname",
			lable:"Last",
			input:$('<input type="text" value="Desormeaux"></input>')
		});

		this.moduleform.push({
			type:"text",
			name:"user_login",
			lable:"Login",
			input:$('<input type="text" value="AssemblyX"></input>')
		});

		this.moduleform.push({
			type:"text",
			name:"user_password",
			lable:"Password",
			input:$('<input type="text"  value="Password"></input>')
		});

		this.moduleform.push({
			type:"text",
			name:"user_email",
			lable:"Email",
			input:$('<input type="text" value="kd@assemblyx.net"></input>')
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