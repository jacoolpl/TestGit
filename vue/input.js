"use strict";
Vue.component('vue-input', {
	template: `
		<div>
			<label ref="lbl" class="lgc-form-label">{{label}}</label>
			<input ref="inp" 
				type="text" 
				v-bind:class="'lgc-form-input '+inputClass" 
				v-bind:style="inputStyle"				
				v-bind:placeholder="labelOrPlaceholder" 
				v-bind:lgc-label="label" 
				v-bind:lgc-must="must" 
				v-bind:value="value" 
				v-on:input="setLabelVisibility();$emit('input',$event.target.value)"
				v-on:blur="$emit('blur',$event.target.value)"
				v-on:focus="$emit('focus',$event.target.value)"/>
		</div>`,

	props: {
		label: { type: String },
		placeholder: { type: String },
		must: { type: String },
		value: { type: String },
		inputStyle: { type: String },
		inputClass: { type: String }
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
	},
	updated: function () {
		this.setLabelVisibility();
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
		}
	}
});