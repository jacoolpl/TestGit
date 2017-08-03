"use strict";
Vue.component('vue-search', {
	template: `
		<div class="lgc-search">
			<span><i class="fa fa-search"></i></span>
			<input type="text" ref="inp" class='w100p' v-bind:value="value" v-on:input="$emit('input',$event.target.value)" v-bind:placeholder="label" />
		</div>
	`,
	props: {
		value: {
			type: String
		},
		mode: {
			type: String,
			default: "interval" //can be "interval" or "enter"
		},
		intervalMs: {
			type: Number,
			default: 200
		},
		label: {
			type: String,
			default: ""
		}
	},
	mounted: function () {
		var _this = this;
		if (_this.mode == "interval") {
			_this.oldval = $(_this.$refs.inp).val();
			_this.interval = window.setInterval(function () {
				if (_this.oldval != $(_this.$refs.inp).val()) {
					_this.oldval = $(_this.$refs.inp).val();
					_this.value = $(_this.$refs.inp).val();
					_this.$emit("input", _this.value);
					_this.$emit("search");
				}
			}, _this.intervalMs)
		}
		else if (_this.mode == "enter") {
			$(_this.$refs.inp).bind("keyup", function (event) {
				if (event.keyCode == 13) {
					_this.value = $(_this.$refs.inp).val();
					_this.$emit("input", _this.value);
					_this.$emit("search");
				}
			});
		}
		else
			lgc.error("vue-search, mode " + _this.mode + " not supported");

		$(_this.$refs.inp).focus();
	}
});