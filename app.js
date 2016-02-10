(function () {
	function Contact() {
		this.cozysdk = new app.CozySdk();
		this.HomeVanController = new app.HomeVanController(this.cozysdk);
	}

	var contact = new Contact();
})();