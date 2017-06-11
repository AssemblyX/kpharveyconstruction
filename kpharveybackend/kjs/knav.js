class KNav{
    constructor(){
        var $nav = $('<nav></nav>');
        var $ulcore = $('<ul></ul>');

        var $liadmin = KNav.createli({type:"drop", href:"Admin"})
        var $uladmin = $('<ul class="sub-menu"></ul>');

        var $liadminuser = KNav.createli({type:"null", href:"Users", icon:"fa-user"});
        $liadminuser.on("click", function(){
            new KAdminuser();
        });
        $uladmin.append($liadminuser);

        $liadminuser = KNav.createli({type:"null", href:"Client", icon:"fa-hospital-o"});
        $liadminuser.on("click", function(){
            new KAdminclient();
        });
        $uladmin.append($liadminuser);



        $nav.append($ulcore);
        $ulcore.append($liadmin);
        $liadmin.append($uladmin);
        $nav.append($('<div style="clear:both"></div>'));
        return $nav;
    }

    static createli(config){
        var $li;
        switch(config.type){
            case "drop":
                $li = $('<li class="dropdown"></li>');
                $li.append('<a href="#">'+config.href+'</a>');
                KNav.addhover($li);
                break;
            default:
                $li = $('<li></li>');
                $li.append('<a href="#"><i class="fa '+config.icon+' navicon" aria-hidden="true"></i>'+config.href+'</a>');
        }
        return $li;
    }

    static addhover($li){
        $li.hover(
            function(){
                $(this).children('.sub-menu').slideDown(200);
            },
            function(){
                $(this).children('.sub-menu').slideUp(200);
            }
        );
    }

    appendli(ul){

    }
}