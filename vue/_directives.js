"use strict";
Vue.directive("hide-beneath", {
	inserted: function (el, binding) {
		var px = binding.value;
		var f = () => {
			if (window.innerWidth <= px)
				$(el).addClass("visibility_none");
			else
				$(el).removeClass("visibility_none");
		}
		f();
		$(window).on("resize", f);
		//window.onresize = f;
	}
});

Vue.directive("hide-above", {
	inserted: function (el, binding) {
		var px = binding.value;
		var f = () => {
			if (window.innerWidth >= px)
				$(el).addClass("visibility_none");
			else
				$(el).removeClass("visibility_none");
		}
		f();
		$(window).on("resize", f);
	}
});