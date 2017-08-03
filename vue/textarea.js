"use strict";
Vue.component('vue-textarea', {
	template: `
		<div>
			<label ref="lbl" class="lgc-form-label">{{label}}</label>
			<textarea ref="inp" 
				type="text" 
				v-bind:class="'lgc-form-input '+inputClass" 
				v-bind:style="inputStyle"				
				v-bind:placeholder="label" 
				v-bind:lgc-label="label" 
				v-bind:lgc-must="must" 
				v-bind:value="value" 
				v-on:input="setLabelVisibility();$emit('input',$event.target.value)"></textarea>
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