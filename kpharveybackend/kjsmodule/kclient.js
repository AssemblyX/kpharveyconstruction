/***
KPHarvey 
Client screen
***/
"use strict";

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
			projects:[]
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

    	var $note = $('<button type="button" class="dalogtitlebutton"><i class="fa fa-comment-o dalogtitlebuttonicon" aria-hidden="true"></i></button>');
    	$note.on("click", {config:this.config}, function(e){
			e.stopPropagation() 
			e.preventDefault();
			self.noteadd();

		});
    	
    	var $file = $('<button type="button" class="dalogtitlebutton"><i class="fa fa-paperclip dalogtitlebuttonicon" aria-hidden="true"></i></button>');
    	$file.on("click", {json:this.config}, function(e){
			e.stopPropagation() 
			e.preventDefault();
			var $active = KForm.getactivetab(self.tabs.$ul);
			if($active){
				var obj = {};
				obj.id = $($active).data('project_id');
				obj.tbl = 'project';
				e.data.json.lookupconfig = JSON.stringify(obj);
				new KFileupload(e.data.json, self);
			}else{
				new KMsg("A project must be selected.", "error");
			}
		});

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

		$divtitlebuttons.append($note, $file, $add, $archive, $close);

		config.width = 800;
		config.height = 600;
		config.title = $divtitle;
		config.titlebuttons = $divtitlebuttons;
		config.content = this.$divcontent;
		config.buttons = {};
		this.$dialog = new KDialog(config);
		this.wincreated = true;

    }

    filecallback(){
		console.log("filecallback");
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

		if(!this.wincreated){
			this.makewin();
			$( this.tabs.$divtabs ).tabs({ active: 0 });
		}
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
    	this.form.projects["project_" + json.project_id] = {};
    	var idproject = "project_" + json.project_id;
    	var strproject = json.project_name;
    	var obj = {
    		project_id:strproject,
    		study_id:"",
			project_name:"",
			project_createdate:""
    	};
    	this.data.project.push(obj);

		var $liproject = $('<li><a href="#'+idproject+'">'+strproject+'</a></li>');
		$liproject.data('project_id', json.project_id);
		this.tabs.tabbody[idproject] = $('<div id="'+idproject+'"></div>');
		this.tabs.tabbody[idproject].append(this.projectbuildform(json));
		this.tabs.$ul.append($liproject);
		this.tabs.$divtabs.append(this.tabs.tabbody[idproject]);
		this.tabs.$divtabs.tabs("refresh");
    }

    projectfilesreturn(json, config){

    	for(var i=0; i<json.data.length; i++){
    		var $ext = json.data[i].file_nameorig.split('.').pop();
    		var $filename = config.project_id + "_" + json.data[i].file_id + "."+$ext;
    		var $fileorig = json.data[i].file_nameorig;
    		if(KFileupload.filetype($ext) == FILE_IMAGE){
				var $image = $('<img src="kserver/uploads/'+$filename+'" width="100" />');
				this.form.projects["project_" + config.project_id].image.append($image);
    		}else{
				var $div = $('<div></div>');
				$div.text($fileorig);
				this.form.projects["project_" + config.project_id].file.append($div);
    		}
    	}
    }

    projectbuildform(json){
		this.form.projects["project_" + json.project_id] = {
			note : $('<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"></div>'),
			image : $('<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"></div>'),
			file : $('<div class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"></div>')
			
		};

    	var $div = $('<div></div>');

		$div.append(KForm.accordion({
			lable:"Notes",
			div:this.form.projects["project_" + json.project_id].note
		}));

		$div.append(KForm.accordion({
			lable:"Pictures",
			div:this.form.projects["project_" + json.project_id].image
		}));

		$div.append(KForm.accordion({
			lable:"Documents",
			div:this.form.projects["project_" + json.project_id].file
		}));



		

		kctrl.send({config:{module:this.type.name, type:"projectfiles"}, data:json}, this.projectfilesreturn.bind(this), json);
    	return $div;
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