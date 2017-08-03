"use strict";
Vue.component('vue-date', {
	template: `
		<div ref="base">
			<label ref="lbl" class="lgc-form-label">{{label}}</label>
			<input ref="inp" 
				type="text" 
				v-bind:class="'lgc-form-input '+inputClass" 
				v-bind:style="inputStyle"				
				v-bind:placeholder="label" 
				v-bind:lgc-label="label" 
				v-bind:lgc-must="must" 
				v-bind:value="value" 
				v-on:click="openDatePicker();"
				v-on:input="setLabelVisibility();$emit('input',$event.target.value)"
				v-on:blur="setLabelVisibility();$emit('blur',$event.target.value)"
				v-on:focus="setLabelVisibility();$emit('focus',$event.target.value)"/>
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
		$(input).inputmask("dd.mm.yyyy", {
			placeholder: "TT.MM.YYYY",
			yearrange: { minyear: 1900, maxyear: 2999 },
			onincomplete: function () {
				var val = $(input).val();
				if (val) {
					val = val.replace("MM", (new Date()).toString("MM"));
					val = val.replace("YYYY", (new Date()).toString("yyyy"));
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
		},
		openDatePicker: function () {
			var _this = this;
			var input = $(this.$refs.inp);
			var datepicker = $(input).datepicker({
				language: "de",
				todayButton: new Date(),
				showEvent: "",
				onSelect: function (formattedDate, date) {
					var m = moment(date);
					_this.value = m.format("DD.MM.YYYY HH:mm:ss");
					_this.$emit('input', _this.value); //send value back to datamodel
				}
			}).data("datepicker");

			try {
				var date = moment($(input).val(), "DD.MM.YYYY").toDate();
				datepicker.selectDate(date);
			}
			catch(e) {}

			datepicker.show();
		}
	}
});