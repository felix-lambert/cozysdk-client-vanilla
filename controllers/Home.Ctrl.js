(function (window) {

	var HomeVanController = function(CozySdk) {
		var vm = this;
		vm.CozySdk = CozySdk;
		vm.send();
		vm.update();
		vm.destroy();
		vm.updateContactList();
	}


	HomeVanController.prototype = {
		constructor: HomeVanController,
		send: send,
		update: update,
		destroy: destroy,
		_makeDoubleEvent: _makeDoubleEvent,
		_getId: _getId,
		_Id: _Id,
		updateContactList: updateContactList,
		render: render
	};

	function send() {
		var vm = this;
		document.querySelector('.send').addEventListener('change', function () {
			var contact = document.querySelector('.send').value;

			if (contact.trim() === '') {
				return;
			}

			var user = {
				n: contact.trim()
			};
			vm.CozySdk.create('Contact', user, function () {
				document.querySelector('.send').value = '';
				vm.updateContactList();
			});
		});
	}

	function update() {
		var vm = this;
		vm._makeDoubleEvent('ul .edit', 'blur', function () {
			var contactName = {
	          n: this.value.trim()
	        };

			vm.CozySdk.update('Contact', vm._Id(this), contactName, function () {
				vm.updateContactList();
			});
		});
		vm._makeDoubleEvent('ul .edit', 'keypress', function (event) {
			if (event.keyCode === 13) {
				this.blur();
			}
		});
	}

	function destroy() {
		var vm = this;
		vm._makeDoubleEvent('.destroy', 'click', function () {
			vm.CozySdk.destroy('Contact', vm._Id(this), function() {
				vm.updateContactList();
			});
		});
	}

	function _makeDoubleEvent(klass, action, callback) {
		function doubleEvent(event) {
			if (Array.prototype.indexOf.call(document.querySelectorAll(klass), event.target) >= 0) {
				callback.call(event.target, event);
			}
		}
		var blur = action === 'blur';
		document.querySelector('.contact-list').addEventListener(action, doubleEvent, !!blur);
	}

	function _getId(element, tagName) {
		var vm = this;
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return vm._getId(element.parentNode, tagName);
	}

	function _Id(element) {
		var vm = this;
		var dataId = vm._getId(element, 'ul');
		return dataId.dataset.id;
	}

	function updateContactList() {
		var vm = this;
		vm.CozySdk.findAll(function(data) {
			data.forEach(function (input) {
				input.key = input.key.replace(/ /g, '\u00a0');
			});
			vm.render(data);
		});
	}

	function render(data) {
		var i, j;
		var view = '';

		for (i = 0, j = data.length; i < j; i++) {
			var template = '<ul data-id="{{id}}">'
			+		'<input value={{contact}} class="edit">'
			+		'<input type="button" class="update" value="Update">'
			+		'<input type="button" class="destroy" value="Destroy">'
			+	'</ul>';
			template = template.replace('{{id}}', data[i].id);
			template = template.replace('{{contact}}', data[i].key);
			view = view + template;
		}
		document.querySelector('.contact-list').innerHTML = view;
	}

	window.app = window.app || {};
	window.app.HomeVanController = HomeVanController;
}(window));
