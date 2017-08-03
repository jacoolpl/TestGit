"use strict";
Vue.component('vue-radio', {
	template: `
		<div class="pure-radiobutton lgc-flx" v-on:click="clicked();">
			<input ref="inp" type="radio" :name="name" :value="val"  v-on:change="checkedChanged();"  />
			<label ref="lbl" class="lgc-form-label">{{label}}</label>
		</div>
	`,

	props: {
		name: { type: String },
		label: { type: String },
		must: { type: String },
		val: { type: String },
		value: { type: String }
	},
	mounted: function () {
		if (this.val == this.value) $(this.$refs.inp).attr("checked", "checked"); 
		else $(this.$refs.inp).removeAttr("checked");
	},
	updated: function () {
		if (this.val == this.value) $(this.$refs.inp).attr("checked", "checked");
		else $(this.$refs.inp).removeAttr("checked");
	},
	methods: {
		removeGlobalChecked: function () {
			var radiogroup = $(this.$refs.inp).closest("*[data-radiogroup='"+this.name+"']");
			if (radiogroup.length == 1) {
				$("input[type='radio']", radiogroup).removeAttr("checked");
			}
			else
				alert("NO RADIOGROUP DEFINED");
		},
		setChecked: function () {
			this.removeGlobalChecked();

		},
		clicked: function () {
			this.removeGlobalChecked();
			this.value = $(this.$refs.inp).val();
			$(this.$refs.inp).attr("checked", "checked"); 
			this.$emit('input', this.value); //send value back to datamodel
		},
		checkedChanged: function () {
			this.removeGlobalChecked();
			this.value = $(this.$refs.inp).val();
			$(this.$refs.inp).attr("checked", "checked"); 
			this.$emit('input', this.value); //send value back to datamodel
		}
	}
});