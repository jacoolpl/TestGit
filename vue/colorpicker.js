"use strict";
Vue.component('vue-colorpicker', {
	template: `
		<div>
			<label ref="lbl" class="lgc-form-label">{{label}}</label>
			<input ref="inp" 
				type="text" 
				v-bind:lgc-label="label" 
				v-bind:lgc-must="must" 
				v-bind:value="value" 
				v-on:input="setLabelVisibility();$emit('input',$event.target.value)"
				v-on:blur="$emit('blur',$event.target.value)"
				v-on:focus="$emit('focus',$event.target.value)"/>
		</div>`,

	props: {
		label: { type: String },
		must: { type: String },
		value: { type: String },
	},
	computed: {
		labelOrPlaceholder: function () {
			return this.label || this.placeholder;
		}
	},
	mounted: function () {
		if (!this.label && this.placeholder)
			$(this.$refs.lbl).css("display", "none");
		this.setLabelVisibility();

		var app = this;
		var $colorInput = $(this.$refs.inp);
		$colorInput.minicolors({
			change: function (value, opacity) {
				app.value = value;
				app.$emit("input",value);
			}
		});
	},
	updated: function () {
		this.setLabelVisibility();
		var app = this;
		var $colorInput = $(this.$refs.inp);
		$colorInput.minicolors("value", this.value);
	},
	methods: {
		getInput: function () {
			return $(this.$refs.inp);
		},
		getValue: function () {
			return this.getInput().val();
		},
		setValue: function (val) {
			this.value = val;
			this.getInput().val(val);
		},
		focus: function () {
			this.getInput().focus();
		},
		setLabelVisibility: function () {
			var label = $(this.$refs.lbl);
			var value = $(this.$refs.inp).val();
			if (value === "")
				label.addClass("hide");
			else
				label.removeClass("hide");
		},
		update: function () {
			alert(this.value);
		}
	}
});