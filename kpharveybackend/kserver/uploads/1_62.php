<html>
<head>
<meta charset="utf-8">
<title>AssemblyX Production</title>
<link href="css/screen.css" rel="stylesheet" type="text/css" >
<script src="kjs/kstart.js"></script>
</head>
<body>
<div class="screenbody">
    <div class="screenlogo"></div>
    <div class="screenlogotext" style="color:#FFFFFF">Public Gaming - League Survey</div>
    <div class="screenform">

<form name="myform" action="" method="post" onsubmit="return lolform.click();">
<div class="form-style-2">
<div class="form-style-2-heading">Provide your information</div>



<label for="element_9"><span>Name <span class="required">*</span></span><input type="text" class="input-field" name="element_9" value="" required /></label>
<label for="element_10"><span>Email <span class="required">*</span></span><input type="text" class="input-field" name="element_10" value="" required /></label>
<label><span>Telephone</span><input type="text" class="tel-number-field" name="tel_no_1" value="" maxlength="4" />-<input type="text" class="tel-number-field" name="tel_no_2" value="" maxlength="4"  />-<input type="text" class="tel-number-field" style="width:80px" name="tel_no_3" value="" maxlength="10"  /></label>
<label><span>Postal Code</span><input type="text" class="tel-number-field" name="postal_1" value="" maxlength="4" />-<input type="text" class="tel-number-field" name="postal_2" value="" maxlength="4"  /></label>

<div class="form-style-2-heading">Do you play League of Legends? <span class="required">*</span></div>
<span>
<span class="element_radio"><input id="element_11_0" name="element_11" class="element radio" type="radio" value="v0" required onclick="lolform.toggle()"></span><label class="choice" for="element_11_0">Yes</label>
<span class="element_radio"><input id="element_11_1" name="element_11" class="element radio" type="radio" value="v1" required onclick="lolform.toggle()"></span><label class="choice" for="element_11_1">No</label>
</span>

<div class="screenhide" id="lolno">
    <div class="form-style-2-heading">Are you considedring playing League of Legends?</div>
    <span>
    <span class="element_radio"><input id="element_12_0" name="element_12" class="element radio" type="radio" value="v0"></span><label class="choice" for="element_12_0">Yes</label>
    <span class="element_radio"><input id="element_12_1" name="element_12" class="element radio" type="radio" value="v1"></span><label class="choice" for="element_12_1">No</label>
    <span class="element_radio"><input id="element_12_3" name="element_12" class="element radio" type="radio" value="v2"></span><label class="choice" for="element_12_3">Not sure</label>
    </span>

    <div class="form-style-2-heading">Would you attend a League of Legends event hosted in Sudbury?</div>
    <span>
    <span class="element_radio"><input id="element_13_0" name="element_13" class="element radio" type="radio" value="v0"></span><label class="choice" for="element_13_0">Yes</label>
    <span class="element_radio"><input id="element_13_1" name="element_13" class="element radio" type="radio" value="v1"></span><label class="choice" for="element_13_1">No</label>
    </span>
</div>

<div class="screenhide" id="lolyes">
    <div class="form-style-2-heading">Do you consider yourself to be a casual or competitive League of Legends player?</div>
    <span>
    <span class="element_radio"><input id="element_0_0" name="element_0" type="radio" value="v0" class="radiobutton"></span><label class="choice" for="element_0_0">Casual </label>
    <span class="element_radio"><input id="element_0_1" name="element_0" type="radio" value="v1" class="radiobutton"></span><label class="choice" for="element_0_1">Competitive</label>
    <span class="element_radio"><input id="element_0_2" name="element_0" type="radio" value="v2" class="radiobutton"></span><label class="choice" for="element_0_2">Both</label>
    <span class="element_radio"><input id="element_0_3" name="element_0" type="radio" value="v3" class="radiobutton"></span><label class="choice" for="element_0_3">Not sure</label>
    </span>

    <div class="form-style-2-heading">How many years have you played League of Legends?</div>
    <span>
    <span class="element_radio"><input id="element_1_0" name="element_1" class="radiobutton" type="radio" value="v0"></span><label class="choice" for="element_1_0">1 year</label>
    <span class="element_radio"><input id="element_1_1" name="element_1" class="radiobutton" type="radio" value="v1"></span><label class="choice" for="element_1_1">2 years</label>
    <span class="element_radio"><input id="element_1_2" name="element_1" class="radiobutton" type="radio" value="v2"></span><label class="choice" for="element_1_2">3 years</label>
    <span class="element_radio"><input id="element_1_3" name="element_1" class="radiobutton" type="radio" value="v3"></span><label class="choice" for="element_1_3">4 years</label>
    <span class="element_radio"><input id="element_1_4" name="element_1" class="radiobutton" type="radio" value="v4"></span><label class="choice" for="element_1_4">5+ years</label>
    </span>


    <div class="form-style-2-heading">How many hours, on average, do you spend playing League of Legends per week?</div>
    <span>
    <span class="element_radio"><input id="element_2_0" name="element_2" class="element radio" type="radio" value="v0"></span><label class="choice" for="element_2_0">1 to 4 hours</label>
    <span class="element_radio"><input id="element_2_1" name="element_2" class="element radio" type="radio" value="v1"></span><label class="choice" for="element_2_1">5 to 9 hours</label>
    <span class="element_radio"><input id="element_2_2" name="element_2" class="element radio" type="radio" value="v2"></span><label class="choice" for="element_2_2">10 to 14 hours</label>
    <span class="element_radio"><input id="element_2_3" name="element_2" class="element radio" type="radio" value="v3"></span><label class="choice" for="element_2_3">15 to 19 hours</label>
    <span class="element_radio"><input id="element_2_4" name="element_2" class="element radio" type="radio" value="v4"></span><label class="choice" for="element_2_4">20 to 24 hours</label>
    <span class="element_radio"><input id="element_2_5" name="element_2" class="element radio" type="radio" value="v5"></span><label class="choice" for="element_2_5">25 hours or more</label>
    </span>

    <div class="form-style-2-heading">Have you played League of Legends at LAN centers or LAN events?</div>
    <span>
    <span class="element_radio"><input id="element_3_0" name="element_3" class="element radio" type="radio" value="v0"></span><label class="choice" for="element_2_0">Yes</label>
    <span class="element_radio"><input id="element_3_1" name="element_3" class="element radio" type="radio" value="v1"></span><label class="choice" for="element_2_1">No</label>
    </span>

    <div class="form-style-2-heading">Have you ever competed in a League of Legends tournament online?</div>
    <span>
    <span class="element_radio"><input id="element_4_0" name="element_4" class="element radio" type="radio" value="v0"></span><label class="choice" for="element_2_0">Yes</label>
    <span class="element_radio"><input id="element_4_1" name="element_4" class="element radio" type="radio" value="v1"></span><label class="choice" for="element_2_1">No</label>
    </span>

    <div class="form-style-2-heading">Would you play at a League of Legends event hosted in Sudbury?</div>
    <span>
    <span class="element_radio"><input id="element_5_0" name="element_5" class="element radio" type="radio" value="v0"></span><label class="choice" for="element_2_0">Yes</label>
    <span class="element_radio"><input id="element_5_1" name="element_5" class="element radio" type="radio" value="v1"></span><label class="choice" for="element_2_1">No</label>
    </span>
</div>



<div class="form-style-2-heading">What age category do you fall into?</div>
<span>
<span class="element_radio"><input id="element_6_0" name="element_6" class="element radio" type="radio" value="v0"></span><label class="choice" for="element_116_0">Under 15</label>
<span class="element_radio"><input id="element_6_1" name="element_6" class="element radio" type="radio" value="v1"></span><label class="choice" for="element_116_1">15 to 19</label>
<span class="element_radio"><input id="element_6_2" name="element_6" class="element radio" type="radio" value="v2"></span><label class="choice" for="element_116_2">20 to 24</label>
<span class="element_radio"><input id="element_6_3" name="element_6" class="element radio" type="radio" value="v3"></span><label class="choice" for="element_116_3">25 to 30</label>
<span class="element_radio"><input id="element_6_4" name="element_6" class="element radio" type="radio" value="v4"></span><label class="choice" for="element_116_4">31 to 34</label>
<span class="element_radio"><input id="element_6_5" name="element_6" class="element radio" type="radio" value="v5"></span><label class="choice" for="element_116_5">35 and over</label>
</span>

<div class="form-style-2-heading">Would you participate in League of Legends cosplay competition? </div>
<span
<span class="element_radio"><input id="element_14_0" name="element_14" class="element radio" type="radio" value="v0"></span><label class="choice" for="element_14_0">Yes</label>
<span class="element_radio"><input id="element_14_1" name="element_14" class="element radio" type="radio" value="v1"></span><label class="choice" for="element_14_1">No</label>
</span>

<div class="form-style-2-heading">Would you like to receive future information about our plans for casual and amateur gamers? <span class="required">*</span></div>
<span
<span class="element_radio"><input id="element_7_0" name="element_7" class="element radio" type="radio" value="v0" required></span><label class="choice" for="element_2_0">Yes</label>
<span class="element_radio"><input id="element_7_1" name="element_7" class="element radio" type="radio" value="v1" required></span><label class="choice" for="element_2_1">No</label>
</span>

<div class="form-style-2-heading">Please leave any final thoughts or comments on how you think we could get involved with your community.</div>
<label for="element_8"><span>Message</span><textarea name="element_8" class="textarea-field"></textarea></label>

<label><span>&nbsp;</span><input type="submit" value="Submit" /></label>
</form>
</div>



    </div>
</div>

</body>
</html>