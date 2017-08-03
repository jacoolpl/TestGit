"use strict";
Vue.component('vue-svg', {
	template: `
		<div class="svg" ref="div"/>
	`,
	props: ['src'],
	mounted: function () {
		var svg = null;
		$.ajax({
			url: this.src,
			type: "GET",
			success: function (data) {
				svg = $("svg", data);
			},
			async: false
		});

		$(this.$refs.div).append(svg);
	}
});