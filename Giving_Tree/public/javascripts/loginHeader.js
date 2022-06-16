function loginHeader(loginStatus) {
	console.log(loginStatus);
	if (loginStatus == 'none' || loginStatus == null) {
		$('#before_login').css({'display': 'inline'});
		$('#after_login').css({'display': 'none'});
		$('#after_login_user').css({'display': 'none'});
		$('#after_login_admin').css({'display': 'none'});
	}
	else {
		$('#before_login').css({'display': 'none'});
		$('#after_login').css({'display': 'inline'});
		$('#after_login_user').css({'display': 'none'});
		$('#after_login_admin').css({'display': 'none'});
		if (loginStatus == 'admin')
			$('#after_login_admin').css({'display': 'inline'});
		else if (loginStatus == 'user')
			$('#after_login_user').css({'display': 'inline'});

	}
}