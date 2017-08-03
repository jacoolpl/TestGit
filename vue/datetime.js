"use strict";
Vue.component('vue-datetime', {
	template: `
		<div>
			<label ref="lbl" class="lgc-form-label">{{label}}</label>
			<input ref="inp" type="text" 
				v-bind:class="'lgc-form-input '+inputClass" 
				v-bind:style="inputStyle"				
				v-bind:placeholder="label" 
				v-bind:lgc-label="label" 
				v-bind:lgc-must="must" 
				v-bind:value="value" 
				v-on:input="setLabelVisibility();$emit('input',$event.target.value)"
				v-on:blur="setLabelVisibility();$emit('blur',$event.target.value)"
				v-on:focus="setLabelVisibility();$emit('focus',$event.target.value)" />
		</div>`,

	props: {
		label: { type: String },
		must: { type: String },
		value: { type: String },
		inputStyle: { type: String },
		inputClass: { type: String }
	},
	mounted: function () {
		this.setLabelVisibility();

		//add input mask
		var _this = this;
		var input = $(this.$refs.inp);
		$(input).inputmask("dd.mm.yyyy hh:mm", {
			placeholder: "TT.MM.YYYY HH:mm",
			yearrange: { minyear: 1900, maxyear: 2999 },
			onincomplete: function () {
				var val = $(input).val();
				if (val) {
					val = val.replace("MM", (new Date()).toString("MM"));
					val = val.replace("YYYY", (new Date()).toString("yyyy"));
					val = val.replace("H", "0").replace("H", "0");
					val = val.replace("m", "0").replace("m", "0");
					$(input).val(val).change();
				}
			}
		});
	},
	updated: function () {
		this.setLabelVisibility();
	},
	methods: {
		setLabelVisibility: function () {
			var label = $(this.$refs.lbl);
			var value = $(this.$refs.inp).val();
			if (value === "")
				label.addClass("hide");
			else
				label.removeClass("hide");
		}
	}
});