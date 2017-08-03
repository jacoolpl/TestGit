"use strict";
Vue.component('vue-time', {
	template: `
		<div>
			<label ref="lbl" class="lgc-form-label">{{label}}</label>
			<input ref="inp"
				type="text" 
				v-bind:class="'lgc-form-input '+inputClass" 
				v-bind:style="inputStyle"				
				v-bind:placeholder="label" 
				v-bind:lgc-label="label" 
				v-bind:lgc-must="must" 
				v-bind:value="value" 
				v-on:input="setLabelVisibility();$emit('input',$event.target.value);"
				v-on:blur="setLabelVisibility();$emit('blur');"
				v-on:focus="setLabelVisibility();$emit('focus');" />
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
		$(input).inputmask("hh:mm", {
			placeholder: "HH:mm",
			onincomplete: function () {
				var val = $(input).val();
				if (val) {
					val = val.replace("H", "0").replace("H", "0");
					val = val.replace("m", "0").replace("m", "0");
					$(input).val(val).change();
					_this.$emit('input', val); //send value back to datamodel
				}
			},
			oncomplete: function () {
				var val = $(input).val();
				$(input).val(val).change();
				alert("oncomplete " + val);
				_this.$emit('input', val);
			}
		});

		$(input).timepicker({
			step: 15, timeFormat: "H:i"
		});

		$(input).on("changeTime", function () {
			var val = $(input).val();
			_this.$emit('input', val);
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