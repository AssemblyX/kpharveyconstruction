class KScreen {
    constructor(){
        var $topbar = $('<div id="screentopbar" class="screentopbar"></div>');
        $topbar.append(new KNav());
        $("BODY").append( $topbar );

    }

    dropmain(){
        var $divdropdown = $('<div class="dropdown dropdown_header"></div>');
        var $divdropbtn = $('<div class="dropbtn"></div>');
        var $divdropicon = $('<div class="screenmenutopparent">Menu</div>');
        var $divdropadmin = $('<div class="screenmenutopparent">Admin</div>');
        var $divdropcontent = $('<div class="dropdown-content">');
        var $divdropul = $('<ul></ul>');

        var $divdroplistudy = $('<li><div><div class="fa fa-book variable_add"></div>&nbsp;&nbsp;Study</div></li>');
            var $divdroplistudyoptions = $('<ul></ul>');
            var $divdroplistudynew = $('<li><div><div class="fa fa-plus-circle variable_add"></div>&nbsp;&nbsp;New</div></li>');
            var $divdroplistudyedit = $('<li><div><div class="fa fa-pencil-square-o variable_add"></div>&nbsp;&nbsp;Edit</div></li>');
            var $divdroplistudyarchive = $('<li><div><div class="fa fa-archive variable_add"></div>&nbsp;&nbsp;Archived</div></li>');
            $divdroplistudyoptions.append($divdroplistudynew);
            $divdroplistudyoptions.append($divdroplistudyedit);
            $divdroplistudyoptions.append($divdroplistudyarchive);
            $divdroplistudy.append($divdroplistudyoptions);
        
        var $divdroplicostanalysis = $('<li><div><div class="fa fa-book variable_add"></div>&nbsp;&nbsp;Cost analysis</div></li>');
            var $divdroplicostanalysisoptions = $('<ul></ul>');
            var $divdroplicostanalysisnew = $('<li><div><div class="fa fa-plus-circle variable_add"></div>&nbsp;&nbsp;New</div></li>');
            var $divdroplicostanalysisedit = $('<li><div><div class="fa fa-pencil-square-o variable_add"></div>&nbsp;&nbsp;Edit</div></li>');
            var $divdroplicostanalysisarchive = $('<li><div><div class="fa fa-archive variable_add"></div>&nbsp;&nbsp;Archived</div></li>');
            $divdroplicostanalysisoptions.append($divdroplicostanalysisnew);
            $divdroplicostanalysisoptions.append($divdroplicostanalysisedit);
            $divdroplicostanalysisoptions.append($divdroplicostanalysisarchive);
            $divdroplicostanalysis.append($divdroplicostanalysisoptions);
        
        $divdropul.append($divdroplistudy);
        $divdropul.append($divdroplicostanalysis);
        $divdropul.menu();
        $divdropdown.append($divdropbtn);
        $divdropbtn.append($divdropicon);
        $divdropbtn.append($divdropadmin);

        $divdropdown.append($divdropcontent);
        $divdropcontent.append($divdropul);
        $divdroplistudynew.on("click", function(){
            new KStudy();
        });
        $divdroplicostanalysisnew.on("click", function(){
            new KCostanalysis();
        });
        return $divdropdown;
    }
}