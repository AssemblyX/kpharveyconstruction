/***
KPHarvey 
Client screen
***/

class KClient  {
    constructor(config){
    	this.wincreated = false;
    	this.type = {
    		name : "client",
    		lable : "Client"
    	}

    	this.config = config;
    	this.checksaved = "";
    	this.uniqueid = 1;

    	this.data = {
    		study_id:"",
			study_name:"",
			study_protocol_number:"",
			study_createdate:"",
			project:[]
    	};

		this.form = {
			study_name:$('<input type="text" placeholder="Sponsor"></input>'),
			study_protocol_number:$('<input type="text" placeholder="Protocol Number"></input>'),
			study_protocol_number:$('<input type="text" placeholder="Protocol Number"></input>'),
			study_createdate:"",
			project:[]
		}

		this.tabs = {};

        this.$divcontent = $('<div class="studycontent"></div>');
        this.getprojectdata();
    }

    makewin(){
    	var config = {};
    	var self = this;

    	var $divtitle = $('<div class="dalogtitlediv"></div>');
    	$divtitle.text(this.config.client_name);
    	var $divtitlebuttons = $('<div class="dalogtitlebuttondiv"></div>');
    	var $close = $('<button type="button" class="dalogtitlebutton"><i class="fa fa-times dalogtitlebuttonicon" aria-hidden="true"></i></button>');
    	$close.on("click", function(e){
			e.stopPropagation() 
			e.preventDefault();
    		self.$dialog.dialog("close");
    	});
    	
//     	var $file = $('<button type="button" class="dalogtitlebutton"><i class="fa fa-paperclip dalogtitlebuttonicon" aria-hidden="true"></i></button>');
//     	$file.on("click", function(e){
// 			e.stopPropagation() 
// 			e.preventDefault();
// 			new KFileupload();

// 		});

    	var $add = $('<button type="button" class="dalogtitlebutton"><i class="fa fa-plus-circle dalogtitlebuttonicon" aria-hidden="true"></i></button>');
    	$add.on("click", function(e){
			e.stopPropagation() 
			e.preventDefault();
			self.projectadd();

		});

    	var $archive = $('<button type="button" class="dalogtitlebutton"><i class="fa fa-archive dalogtitlebuttonicon" aria-hidden="true"></i></button>');
    	$archive.on("click", function(e){
			e.stopPropagation() 
			e.preventDefault();

		});

		$divtitlebuttons.append($add, $archive, $close);

		config.width = 800;
		config.height = 600;
		config.title = $divtitle;
		config.titlebuttons = $divtitlebuttons;
		config.content = this.$divcontent;
		config.buttons = {};
		this.$dialog = new KDialog(config);
		this.wincreated = true;

    }

    getprojectdata(){
		var data = {};
		data.client_id = this.config.client_id;
    	kctrl.send({config:{module:this.type.name, type:"projectlist"}, data:data}, this.getprojectdatareturn.bind(this), {});
    }

	getprojectdatareturn(json){
		this.$divcontent.empty();
		this.tabs = {};
		this.$divcontent.append(this.buildtabs());
		if(!json.data.error){
			for(var i=0; i< json.data.length; i++){
				this.projectaddtab(json.data[i]);
			}
		}else{
			new KMsg(json.data.msg, "error");
		}

		if(!this.wincreated)this.makewin();
	}

    projectadd(){
    	var config = {};
        var self = this;

        this.moduleform = [];
        this.moduleform.push({
			type:"text",
			name:"project_name",
			lable:"Name",
			input:$('<input type="text" value="assemblyx project"></input>')
		});

        var $divcontent = $('<div></div>');
		$divcontent.append(KForm.basicform(this.moduleform));

		var $divtitle = $('<div class="dalogtitlediv"></div>');
		$divtitle.text(this.config.client_name + " Project Add");

		var $divtitlebuttons = $('<div class="dalogtitlebuttondiv"></div>');
		var $close = $('<button type="button" class="dalogtitlebutton"><i class="fa fa-times dalogtitlebuttonicon" aria-hidden="true"></i></button>');
    	$close.on("click", function(e){
			e.stopPropagation() 
			e.preventDefault();
    		self.$dialogprojectadd.dialog("close");
    	});

    	$divtitlebuttons.append($close);
		
		config.title = $divtitle;
		config.titlebuttons = $divtitlebuttons;
		config.content = $divcontent;
		config.modal = true;
		config.buttons = { 
			'Add':function(){
				self.projectinsert();
			}
		}
		this.$dialogprojectadd = new KDialog(config);
    }

	projectinsert(){
		for(var i=0; i<this.moduleform.length; i++){
			this.moduleform[i].value = this.moduleform[i].input.val();
		}
		var data = {};
		data.insert = this.moduleform;
		data.client_id = this.config.client_id;

		kctrl.send({config:{module:this.type.name, type:"projectinsert"}, data:data}, this.projectinsertreturn.bind(this), {});
	}

    projectinsertreturn(json){
		if(!json.data.error){
			new KMsg(this.type.lable + " Project has been added.");
			for(var i=0; i<this.moduleform.length; i++){
				this.moduleform[i].input.val("");
				this.moduleform[i].value = "";
			}
			this.$dialogprojectadd.dialog("close");
			this.getprojectdata();
		}else{
			new KMsg(json.data.msg, "error");
		}
	}

    projectaddtab(json){
    	var idproject = "project_" + this.uniqueid;
    	this.uniqueid++;
    	var strproject = json.project_name;
    	var obj = {
    		project_id:strproject,
    		study_id:"",
			project_name:"",
			project_createdate:""
    	};
    	this.data.project.push(obj);


		var $liproject = $('<li><a href="#'+idproject+'">'+strproject+'</a></li>');
		this.tabs.tabbody[idproject] = $('<div id="'+idproject+'"></div>');
		this.tabs.tabbody[idproject].append(this.projectbuildform(json));
		this.tabs.$ul.append($liproject);
		this.tabs.$divtabs.append(this.tabs.tabbody[idproject]);
		this.tabs.$divtabs.tabs("refresh");
    }

    projectimagesreturn(json, config){
    	for(var i=0; i<json.data.length; i++){
    		var $filename = config.project_id + "_" + json.data[i].image_id + "."+json.data[i].image_filename.split('.').pop();
    		var $image = $('<img src="kserver/uploads/'+$filename+'" width="100" />');
    		config.div.append($image);
    	}
    }



    projectbuildform(json){
    	var $divform = $('<div></div>');
		var $constanalysis = $('<button class="dalogtitlebutton"><i class="fa fa-picture-o dalogtitlebuttonicon" aria-hidden="true"></i></button');
		$constanalysis.on("click", {json:json}, function(e){
			new KFileupload(e.data.json);
		});
		$divform.append($constanalysis);
		var obj = {
			div:$divform,
			project_id:json.project_id
		}
		kctrl.send({config:{module:this.type.name, type:"projectimages"}, data:json}, this.projectimagesreturn.bind(this), obj);
    	return $divform;
    }

    buildtabs(){
		this.tabs.$divtabs = $('<div id="tabs"></div>');
		this.tabs.$ul = $('<ul></ul>');
		this.tabs.$divtabs.append(this.tabs.$ul);
		this.tabs.tabbody = [];
		this.tabs.$divtabs.tabs();
		return this.tabs.$divtabs;
    }
}