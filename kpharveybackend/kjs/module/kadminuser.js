/***
NorthernClinical
Client admin user
***/


class KAdminuser{
    constructor(){
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
    }

    getmodule(){
		kctrl.send({config:{module:this.type.name, type:"list"}, data:{}}, this.modulelist.bind(this), {});
    }

    modulelist(json){

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
    	this.makewin();
    }

	moduleinsert(){
		for(var i=0; i<this.moduleadd.form.length; i++){
			this.moduleadd.form[i].value = this.moduleadd.form[i].input.val();
		}
		var data = {};
		data.insert = this.moduleadd.form;

		kctrl.send({config:{module:this.type.name, type:"insert"}, data:data}, this.moduleinsertreturn.bind(this), {});
	}

	moduleinsertreturn(json){
		if(!json.data.error){
			new KMsg(this.type.lable + " has been added.");
			for(var i=0; i<this.moduleadd.form.length; i++){
				this.moduleadd.form[i].input.val("");
				this.moduleadd.form[i].value = "";
			}
		}else{
			new KMsg(json.data.msg, "error");
		}
	}

    moduleadd(){
        var self = this;
        this.moduleadd = {};
        this.moduleadd.form = [];
		this.moduleadd.form.push({
			type:"text",
			name:"firstname",
			lable:"First",
			input:$('<input type="text" value="Kenneth"></input>')
		});

		this.moduleadd.form.push({
			type:"text",
			name:"lastname",
			lable:"Last",
			input:$('<input type="text" value="Desormeaux"></input>')
		});

		this.moduleadd.form.push({
			type:"text",
			name:"login",
			lable:"Login",
			input:$('<input type="text" value="AssemblyX"></input>')
		});

		this.moduleadd.form.push({
			type:"text",
			name:"password",
			lable:"Password",
			input:$('<input type="text"  value="Password"></input>')
		});

		this.moduleadd.form.push({
			type:"text",
			name:"email",
			lable:"Email",
			input:$('<input type="text" value="kd@assemblyx.net"></input>')
		});
       
        var $divcontent = $('<div></div>');
		$divcontent.append(KForm.basicform(this.moduleadd.form));


		this.$dialog = $('<div></div>').dialog({
			modal:false,
			dialogClass:'moduledialog',
			title:this.type.lable + " Add",
			open:function(){
				$(this).append($divcontent);
			},
			buttons:{
				'Add':function(){
					self.moduleinsert();
				}
			},
			beforeClose:function(event, ui){
				if(self.checksaved != JSON.stringify(self.data)){
					var $stralert = $('<div></div>');
					if(self.checksaved == ""){
						$stralert.html(self.type.lable + " has not been saved. Do you want to save before closing?");
					}else{
						$stralert.html(self.type.lable + " has been modified. Do you want to save before closing?");
					}
					$('<div></div>').dialog({
						modal:true,
						dialogClass:'',
						title:"Unsaved Changes",
						width:380,
						buttons:{
							'Save':function(){

							},
							"Discard":function(){
								$(this).dialog("close");
								self.checksaved = JSON.stringify(self.data);
								self.$dialog.dialog("close");
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