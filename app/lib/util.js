module.exports = {
	toSlug: function(str) {
		return str.toLowerCase().replace(/[ _]/g, '-').replace(/[^0-9a-z\-]/g, '');
	}
};