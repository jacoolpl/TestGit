"use strict";
Vue.component('vue-dateswitcher', {
	template: `
		<div ref="base" class="lgc-flx">
			<vue-fa-button fa="fa-angle-left" v-on:click="change(-1);" class="gap_r"></vue-fa-button>
			<div class="lgc-flx col pointer ripple" style="justify-content:center;align-items:center" v-on:click="choose();">
				<div v-bind:class="'lgc-form-input '+inputClass" v-bind:style="inputStyle">{{line1}}</div>
				<label class="pointer lgc-form-label" v-if="line2!=''">{{line2}}</label>
			</div>
			<vue-fa-button fa="fa-angle-right" v-on:click="change(1);" class="gap_l"></vue-fa-button>
		</div>`,

	props: {
		inputClass: { type: String },
		inputStyle: { type: String },
		mode: {
			type: String,
			default: "week" //possible modes: day, week, month, year 
		},
		line1: { type: String },
		value: {
			type: String,
			default: moment().format("DD.MM.YYYY")
		}
	},
	mounted: function () {
		this.correctDate();
	},
	updated: function () {
	},
	computed: {
		line1: function () {
			var range = this.getDateRange();

			switch (this.mode) {
				case "week":
					return range.from.format("DD.MM.") + " - " + range.to.format("DD.MM.");
				case "month":
					return range.from.format("MMMM");
				case "year":
					return range.from.format("YYYY");
			}
			
			return range.from.format("DD.MM.YYYY");
		},
		line2: function () {
			var range = this.getDateRange();
			switch (this.mode) {
				case "day":
					return range.from.format("dddd");
				case "week":
					if (range.from.format("WW") != range.to.format("WW"))
						return "KW " + range.from.format("WW") + " - " + range.to.format("WW");
					else
						return "KW " + range.from.format("WW");
				case "month":
					return range.from.format("YYYY");
			}
			
			return "";
		}
	},
	methods: {
		today: function () {
			this.setDate(moment());
		},
		choose: function () {
			//todo: toggle chooser
		},
		change: function (direction) {
			var momentDate = moment(this.value, "DD.MM.YYYY");

			switch (this.mode) {
				case "day":
					momentDate.add({ days: 1 * direction });
					break;
				case "week":
					momentDate.add({ days: 7 * direction });
					break;
				case "month":
					momentDate.add({ months: 1 * direction });
					break;
				case "year":
					momentDate.add({ years: 1 * direction });
					break;
			}
			this.value = momentDate.format("DD.MM.YYYY");
			this.$emit("input", this.value);
			this.$emit("change", this.value);
		},
		correctDate: function () {
			if (!this.value || this.value == null)
				this.value = moment().format("DD.MM.YYYY");

			var momentDate = moment(this.value, "DD.MM.YYYY");
			switch (this.mode) {
				case "week":
					momentDate.startOf("week");
					break;
				case "month":
					momentDate.startOf("month");
					break;
				case "year":
					momentDate.startOf("year");
					break;
			}
			this.value = momentDate.format("DD.MM.YYYY");
			this.$emit("input", this.value);
		},
		getDateRange: function () {
			var mDateFrom = moment(this.value, "DD.MM.YYYY");
			var mDateTo = moment(mDateFrom);
			switch (this.mode) {
				case "week":
					mDateTo.add({ days: 6 });
					break;
				case "month":
					mDateTo.add({ months: 1 }).add({ days: -1 });
					break;
				case "year":
					mDateTo.add({ years: 1 }).add({ days: -1 });
					break;
			}
			return {
				from: mDateFrom,
				to: mDateTo
			};
		}
	}
});