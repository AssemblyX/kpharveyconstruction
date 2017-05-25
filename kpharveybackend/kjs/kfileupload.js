class KFileupload {
    constructor(){
        var self = this;
        this.checksaved = "";
        this.uniqueid = 1;
        this.data = [];
        this.form = {
            inputfile : $('<input id="fileuploadinput" type="file" name="filetoupload" multiple/>'),
            dropzone : $('<div id="fileuploaddropzone" class="fileuploaddropzone"><div id="fileuploadicon"><i class="fa fa-upload" aria-hidden="true"></i></div><div id="fileuploadinstuctions">Drag files here or click to choose files.</div></div>'),
            selectul : $('<ul id="fileuploadlistul" class="fileuploadlistul"></ul>')
        };
        this.form.dropzone.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
            e.preventDefault();
            e.stopPropagation();
        })
        .on('dragover dragenter', function() {
            self.form.dropzone.addClass('fileuploadover');
        })
        .on('dragleave dragend drop', function() {
            self.form.dropzone.removeClass('fileuploadover');
        })
        .on('drop', function(e) {
            self.filesadd(e.originalEvent.dataTransfer.files);
        })
        .on('click', function(){
            self.form.inputfile.trigger("click");
        });

        this.form.inputfile.on('change', function(){
            self.filesadd(self.form.inputfile.prop('files'));
        });

        this.$divcontent = $('<div class="fileupload"></div>');
        var $divlist = $('<div class="fileuploadlistdiv"></div>');
        $divlist.append(this.form.selectul);
        this.$divcontent.append(this.form.inputfile);
        this.$divcontent.append(this.form.dropzone);
        this.$divcontent.append($divlist);
        this.getdata();
    }

    makewin(){
        var self = this;
        this.$dialog = $('<div></div>').dialog({
            modal:true,
            dialogClass:'fileuploaddialog',
            title:"File Upload",
            width:400,
            height:500,
            open:function(){
                $(this).append(self.$divcontent);
            },
            buttons:{
                'Upload':function(){
                	if(self.data.length){
                		self.fileupload(this);	
                	}else{
                		self.form.inputfile.trigger("click");
                	}
                },
                'Clear':function(){
                    
                },
                'Cancel':function(){
                    $(this).dialog("close");
                }
            },
            beforeClose:function(event, ui){
            	if(self.checksaved != JSON.stringify(self.data)){
            		var $stralert = $('<div></div>');
            		if(self.checksaved == ""){
            			$stralert.html("Study has not been saved. Do you want to save before closing?");
            		}else{
            			$stralert.html("Study has been modified. Do you want to save before closing?");
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

    getdata(){
    	this.makewin();
    }

    clearlist(){
        this.form.selectul.empty();
    }


    filesadd(filedata){
        var self=this;
        for (var property in filedata) {
            if (filedata.hasOwnProperty(property)) {
            	var index = this.data.findIndex(x => x.name==filedata[property].name);
            	if(index < 0){
					var obj = {};
					obj.uniqueid = this.uniqueid;
					this.uniqueid++;
					obj.name = filedata[property].name;
					obj.file = filedata[property];
					obj.html = $('<li class="fileuploadli"></li>');
					obj.html.data("uniqueid", obj.uniqueid);
					obj.html.append(KFileupload.filetypeicon(obj.name));
					obj.html.append($('<div class="fileuploadname">'+obj.name+'</div>'));
					var $divclose = $('<i class="fa fa-times fileuploadclose" aria-hidden="true"></i>');
					$divclose.on('click', function(){
						var $li = $(this).parent();
						var index = self.data.findIndex(x => x.uniqueid==$li.data("uniqueid"));
						self.data.splice(index,1);
						$li.remove();
					});

					obj.html.append($divclose);
					obj.html.append($('<div style="clear:both"></div>'));
					this.form.selectul.append(obj.html);
					this.data.push(obj);
                }else{
                	new KMsg("One or more files are named the same.<br /> Assure all files have a unique name.", "warning")
                }
            }
        }
    }

    fileupload(dialog){
        var self = this;
        var formdata = new FormData();
        for(var i=0; i<this.data.length; i++){
            formdata.append('filetoupload_'+i, this.data[i].file);
        }


    	var $progressdialog = new Process();
        
        $.ajax({
            url: 'http://localhost:1338',
            type: 'post',
            data: formdata,
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'text', 
            xhr:function(){
                var xhr = $.ajaxSettings.xhr();
                if (xhr.upload){
                    xhr.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        $progressdialog.$progressbar.progressbar( "value", percent );
                    }, true);
                }
                return xhr;

            },
            mimeType:"multipart/form-data"

        }).done( function(res){
        	new KMsg("Upload Complete.");
            self.clearlist();
        });
    }

    static filetypeicon(filename){
        var arr = filename.split(".");
        switch(arr[1]){
            case "txt":
                return $('<i class="fa fa-file-text-o fileuploadicon" aria-hidden="true"></i>');
                break;
            case "png":
                return $('<i class="fa fa-file-image-o fileuploadicon" aria-hidden="true"></i>');
                break;
            case "pdf":
                return $('<i class="fa fa-file-pdf-o fileuploadicon" aria-hidden="true"></i>');
                break;
            case "zip":
                return $('<i class="fa fa-file-archive-o fileuploadicon" aria-hidden="true"></i>');
                break;
            default: return $('<i class="fa fa-file-o fileuploadicon" aria-hidden="true"></i>');
        }
    }
}