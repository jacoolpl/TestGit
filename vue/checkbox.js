"use strict";
Vue.component('vue-checkbox', {
	template: `
		<div class="lgc-flx" style="padding-top: 0.4rem;width:100%">
			<div class="lgc-checkbox-container" v-on>
				<label class="lgc-flx" style="align-items:center">
					<input ref="inp" type="checkbox" v-on:change="checkedChanged()" />
					<span class="lgc-checkbox"><span class="check"></span></span><span style="padding-left:0.5em" ref="lbl">{{label}}</span>
				</label>
			</div>
			<input type="hidden" ref="hid" v-bind:value="value"/>
		</div>
	`,
	
	props: {
		label: {
			type: String
		},
		value: {
			type: String
		}
	},
	mounted: function () {
		this.setChecked();
	},
	updated: function () {
		this.setChecked();
	},
	methods: {
		setChecked: function () {
			var check = $(this.$refs.inp);
			var hid = $(this.$refs.hid);
			var checked = $(hid).val() == -1;
			if (checked)
				$(check).attr("checked", "checked");
			else
				$(check).removeAttr("checked");
		},
		checkedChanged: function () {
			this.value = this.value == -1 ? 0 : -1;
			this.$emit('input', this.value); //send value back to datamodel
		}
	}
});