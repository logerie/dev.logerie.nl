<?php
/*==_=======_======================_=====
 __| |___  | |   ___  __ _ ___ _ _(_)___ 
/ _` / -_) | |__/ _ \/ _` / -_) '_| / -_)
\__,_\___| |____\___/\__, \___|_| |_\___|
=====================|___/===============
Powered by HTML5, CSS3, jQuery, Modernizr
  Bootstrap, HTML5Boilerplate, Initializr
=======================================*/

function sanitize($input){
	if(is_array($input)){
		foreach($input as $value) sanitize($value);
	}else{
		if(get_magic_quotes_gpc()) $input = stripslashes($input);
		//$input = mysql_real_escape_string($input);
		$input = htmlspecialchars($input);
	}
	return $input;
}

if (isset($_POST['fullname'])
	&& isset($_POST['street'])
	&& isset($_POST['phonenumber'])
	&& isset($_POST['email'])
	&& isset($_POST['message'])) {
	
	$naam = sanitize($_POST['fullname']);
	$adres = sanitize($_POST['street']);
	$plaats = sanitize($_POST['city']);
	$telefoon = sanitize($_POST['phonenumber']);
	$email = sanitize($_POST['email']);
	$opmerking = sanitize($_POST['message']);
	
	$headers  = "From: Logerie.nl <noreply@logerie.nl>\r\n";
	$headers .= "Reply-To: $naam <$email>\r\n";
	$headers .= "X-Mailer: Logerie.nl website\r\n";
	
	$bericht = $opmerking."\r\n\r\n".$naam."\r\n".$adres."\r\n".$plaats."\r\n".$telefoon."\r\n".$email;
	
        $result = mail('info@logerie.nl', 'Contactformulier', $bericht, $headers);
        mail('justus@ju5tu5.nl', 'Logerie Contactformulier', $bericht, $headers);

	if($result){
		echo '<h2>Bericht verstuurd</h2><p>Bedankt voor uw bericht, wij nemen spoedig contact met u op!</p>';
	} else {
		echo 'false';
	}
} else {
	echo 'false';
}
?>
