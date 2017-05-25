class KForm{
    static basicrow(config){
		var $tr = $('<tr></tr>');
		var $td = $('<td></td>');
		$td.text(config.lable);
		$tr.append($td);
		$td = $('<td></td>');
		$td.append(config.input);
		$tr.append($td);
		return $tr;
    }

    static basicform($form){
        var $tbl = $('<table></table>');
        console.log($form);
        for(var i=0; i<$form.length; i++){
            $tbl.append(KForm.basicrow($form[i]));
        }
        return $tbl;
    }
}