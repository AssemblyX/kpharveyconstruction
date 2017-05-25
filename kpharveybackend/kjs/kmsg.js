class KMsg{
    constructor(msg, type, time){
        switch(type){
            case "error":
                var $msg = $('<div class="ui-state-error msgmain"></div>');
                var $icon = $('<i class="fa fa-remove msgicon" aria-hidden="true"></i>');
                break;
            case "warning":
                var $msg = $('<div class="ui-state-highlight msgmain"></div>');
                var $icon = $('<i class="fa fa-warning msgicon" aria-hidden="true"></i>');
                break;
            case "success":
            default:
                var $msg = $('<div class="ui-state-active msgmain"></div>');
                var $icon = $('<i class="fa fa-check msgicon" aria-hidden="true"></i>');
        }
        
        var $span = $('<span></span>');
        var $text = $('<span></span>');
        $text.html(msg);
        $span.append($icon);
        $span.append($text);
        $msg.append($span);
        $("body").append($msg);
        $msg.fadeIn();
        $msg.delay((time)?time:1500).fadeOut();
    }
}