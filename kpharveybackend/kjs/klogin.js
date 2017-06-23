/***
KPHarvey 
Client screen
***/
"use strict";

var recaptchacallback = null;
function googlerecaptcha(){
	recaptchacallback();
}

class KLogin  {
    constructor(config){
        this.$divcontent = $('<div></div>');
        this.form = {
            user:$('<input type="text" value=""></input>'),
            pass:$('<input type="password" value=""></input>')
        }
        var $divlogin = $('<div class="login"></div>');
        
        var $divuser = $('<div class="loginuser"></div>');
        $divuser.append(this.form.user);
        var $divuserlable = $('<div class="loginlable">Username or Email address</div>');

        var $divpass = $('<div class="loginpass"></div>');
        $divpass.append(this.form.pass);
        var $divpasslable = $('<div class="loginlable">Password</div>');

        $divlogin.append($divuserlable, $divuser, $divpasslable, $divpass);
        this.$divcontent.append($divlogin);
        this.makewin();
    }

    makewin(){
    	recaptchacallback = this.checklogin.bind(this);
    	var config = {};
    	var self = this;

    	var $divtitle = $('<div class="dalogtitlediv"></div>');
    	$divtitle.text("User Login");
    	var $divtitlebuttons = $('<div class="dalogtitlebuttondiv"></div>');

		config.width = 250;
		config.height = 255;
		config.modal = true;
		config.title = $divtitle;
		config.content = this.$divcontent;

		if(SERVERIP != "localhost"){
			config.buttons = { 
				'Login':function(){}
			}
			config.recaptcha = {
				button:"Login",
				sitekey:"6LfDriYUAAAAAInl0f0F9AUYWkcr4_xmiKYm1qVf",
				callback:"googlerecaptcha"
			}	
		}else{
			config.buttons = { 
				'Login':function(){recaptchacallback();}
			}
		}
		this.$dialog = new KDialog(config);
		this.wincreated = true;
    }

    checklogin(){
        ksocket.opencallback = this.socketopen.bind(this);
        ksocket.init();
    }

    socketopen(){
        new KMsg("Socket ksocket Established, Initializing Handshake.");
        kctrl.send({config:{module:"user", type:"handshack"}}, this.handshack.bind(this), {});
    }

    handshack(json){
    	new KMsg("Handshake complete, checking credentials.");
        kctrl.handshackid = json.data;
		var data = {};
		data.user = this.form.user.val();
		var password = sha512(this.form.pass.val());
		var password = sha512(password + kctrl.handshackid);
		data.pass = password;
		if(SERVERIP != "localhost")
			data.grecaptcharesponse = grecaptcha.getResponse();
		kctrl.send({config:{module:"user", type:"login"}, data:data}, this.handshackreturn.bind(this), {});
    }

    handshackreturn(json){
    	console.log(json);
    	if(SERVERIP != "localhost") grecaptcha.reset();

    	if(json.data.login == true){
    		kctrl.user = json.data.result;
    		new KMsg("Login Completed");
    		new KScreen(json.data.result.user_type_id);
    		this.$dialog.dialog("close");
    	}else{
    		new KMsg(json.msg, "error");
    	}
    }
}