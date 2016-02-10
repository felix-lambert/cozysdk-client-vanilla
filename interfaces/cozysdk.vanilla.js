
(function (window) {

	var CozySdk = function() {
	};

	CozySdk.prototype = {
		constructor: CozySdk,
		findAll: findAll,
		create: create,
		update: update,
		destroy: destroy
	};

	function findAll(callback) {
		cozysdk.defineRequest('Contact', 'all', 'function(doc) { emit(doc.n); }', function(err, res) {
            if (err != null) {
	            return alert(err);
	        } else {
	        	cozysdk.run('Contact', 'all', {}, function(err, res) {
		            if (err != null) {
		                return alert(err);
		            } else {
		                callback.call(this, JSON.parse("" + res));
		            }
		        });
	        }
        });
		
	}

	function create(docType, data, callback) {
		cozysdk.create(docType, data, function(err, res) {
            if (err != null) {
	            return alert(err);
	       	} else {
	       		callback.call(this);
	       	}
        });
	}

	function update(docType, id, user, callback) {
		cozysdk.updateAttributes(docType, id, user, function(err, res) {
            if (err != null) {
	            return alert(err);
	       	} else {
	       		callback.call(this);
	       	}
        });
	};

	function destroy(docType, id, callback) {
		cozysdk.destroy(docType, id, function(err, res) {
			if (err) {
				return alert(err);
			} else {
				callback.call(this);
			}
        });
		
	};

	// Export to window
	window.app = window.app || {};
	window.app.CozySdk = CozySdk;
})(window);