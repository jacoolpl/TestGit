"use strict";
Vue.component('vue-catalog', {
	template: `
		<div>
			<label ref="lbl" class="lgc-form-label">{{label}}</label>
			<input ref="inp" 
				type="text" 
				v-bind:class="'lgc-form-input lgc-dropdownarrow pointer w100p '+inputClass" 
				v-bind:style="inputStyle"				
				v-bind:placeholder="labelOrPlaceholder" 
				v-bind:lgc-label="label" 
				v-bind:lgc-must="must" 
				v-bind:value="text()"
				v-on:input="setLabelVisibility();$emit('input',$event.target.value)"
				v-on:click="openCatalog"
				/>
		</div>`,
	props: {
		label: { type: String },
		placeholder: { type: String },
		must: { type: String },
		value: { type: Object },

		inputStyle: { type: String },
		inputClass: { type: String },

		dataId: { type: String },
		catalog: { type: String },
		catalogUrl: { type: String },
		idProperty: { type: String },
		titleProperty: { type: String, default: "Title" },
		filter: { type: String }
	},
	computed: {
		labelOrPlaceholder: function () {
			return this.label || this.placeholder;
		}
	},
	mounted: function () {
		this.setLabelVisibility();
		//get title and idproperty from config?
		if (this.catalog) {
			var config = lgc.getFile("config.json");
			var catalogConfig = config.catalogs.find(cat => cat.id == this.catalog);
			var listOptions = catalogConfig.list;
			if (listOptions) {
				if (listOptions.titleProperty && this.titleProperty == "Title")
					this.titleProperty = listOptions.titleProperty
				if (listOptions.idProperty && this.idProperty == "Id")
					this.idProperty = listOptions.idProperty;
			}
		}
	},
	updated: function () {
		this.setLabelVisibility();
	},
	methods: {
		setLabelVisibility: function () {
			let label = $(this.$refs.lbl);
			let value = $(this.$refs.inp).val();
			if (value === "")
				label.addClass("hide");
			else
				label.removeClass("hide");
		},
		text: function () {
			if (this.value)
				return this.value[this.titleProperty];
		},
		openCatalog: function () {
			var _this = this;

			var listOptions = {};

			if (this.titleProperty)
				listOptions.titleProperty = this.titleProperty;

			if (this.idProperty)
				listOptions.idProperty = this.idProperty;

			listOptions.filter = {};
			if (this.filter) {
				var filterFunc = new Function(this.filter);
				var filterEvaluated = filterFunc();
				listOptions.filter = $.extend(listOptions.filter, filterEvaluated);
			}

			if (this.catalog) {
				lgcNav.openCatalog({
					catalog: this.catalog,
					list: listOptions,
					selected: function (retData, params) {
						_this.catalogSelected(retData, params);
					}
				});
			}
			else {
				new lgc.catalog({
					url: this.catalogUrl,
					list: listOptions,
					placeholder: this.label,
					selected: function (retData, params) {
						_this.catalogSelected(retData, params);
					}
				});
			}
		},
		catalogSelected: function (retData, params) {
			var _this = this;
			this.value = retData;
			this.$emit('input', this.value); //needed for parent to change value
			this.$emit('selected');
		}
	}
});