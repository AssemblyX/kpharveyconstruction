class KScreen {
    constructor(){
        var $topbar = $('<div id="screentopbar" class="screentopbar"></div>');
        var $logoimg = $('<img src="images/logo.png" alt="KP Harvey Constrution" class="navlogoimage" />');
        $topbar.append($logoimg);
        $topbar.append($('<div style="clear:both"></div>'));
        if(kctrl.user.user_type_id == USER_SYSTEM){
            $topbar.append(new KNav());
        }else if(kctrl.user.user_type_id == USER_CLIENT){
            new KClient(kctrl.user);
        }
        $("BODY").append( $topbar );
    }
}