/*==_=======_======================_=====
 __| |___  | |   ___  __ _ ___ _ _(_)___ 
/ _` / -_) | |__/ _ \/ _` / -_) '_| / -_)
\__,_\___| |____\___/\__, \___|_| |_\___|
=====================|___/===============
Powered by HTML5, CSS3, jQuery, Modernizr
  Bootstrap, HTML5Boilerplate, Initializr
=======================================*/

!function ($) {
	$(function(){
		$('#moodsetter').carousel({interval: 10000});
		$(".fancybox").fancybox({ openEffect: 'none', closeEffect: 'none' });

		$('input#versturen').click(function(event) {
			$.post("/cgi/contactform.php", {
				fullname: $("input[name=fullname]").val(),
				street: $("input[name=street]").val(),
				city: $("input[name=city]").val(),
				phonenumber: $("input[name=phonenumber]").val(),
				email: $("input[name=email]").val(),
				message: $("textarea[name=message]").val(),
			}, function(data) {
                                if(data!=='false')
                                        $('div#formContainer').html(data);
			});
		});
	});
}(window.jQuery)

// Google analytics
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-9885262-3"]);
_gaq.push(["_trackPageview"]);

(function() {
	var ga = document.createElement("script"); 
	ga.type = "text/javascript";
	ga.async = true;
	ga.src = "http://www.google-analytics.com/ga.js";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(ga, s);
})();
