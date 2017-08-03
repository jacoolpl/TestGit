"use strict";
Vue.component('vue-multiselect', {
	template: `
		<div v-bind:class="'lgc-multiselect'">
			<div ref="box" v-bind:style="inputStyle" v-bind:class="'lgc-form-input lgc-dropdownarrow pointer w100p '+inputClass" v-bind>{{text}}</div>
			<div ref="popup" v-bind:style="'display:none;position:absolute;z-index:999;padding:1em;'+popupStyle" class="lgc-popup">
				<vue-search v-if="search" v-on:search="loadData" v-model="searchString" v-bind:label="searchPlaceholder"></vue-search>
				<div class="lgc-flx" style="overflow-y:scroll;height:100%;flex-grow:1">
					<ul v-bind:style="'list-style-type:none;padding:0;column-count:'+columns">
						<li v-for="(item,index) in data">
							<label v-bind:for="'opt'+iid+item[idProperty]">
								<input type="checkbox" v-bind:id="'opt'+iid+item[idProperty]" v-model="item.checked" v-bind:data-val="item[idProperty]" v-on:change="pushChecked" />
								{{item[labelProperty]}}
							</label>
						</li>
					</ul>
				</div>
				<div class="lgc-flx">
					<button class="lgc-btn-card primary ripple" v-on:click="markAll">Alle markieren</button>
					<vue-space></vue-space>
					<button class="lgc-btn-card ripple" v-on:click="markNone">Alle entfernen</button>
					<vue-grow></vue-grow>
					<button class="lgc-btn primary_inv ripple" v-on:click="save">OK</button>
				</div>
			</div>
		</div>
		`,

	props: {
		iid: { type: String, default: lgc.id() },
		inputClass: { type: String, default: "" },
		inputStyle: { type: String, default: "" },
		searchString: { type: String, default: "" },
		labelProperty: { type: String, default: "Title" },
		idProperty: { type: String, default: "Id" },
		columns: { type: Number, default: 1 },
		search: { type: Boolean, default: true },
		placeholder: { type: String, default: "Nothing selected" },
		popupStyle: { type: String, default: "" },
		popupWidth: { type: String },
		url: { type: String },
		data: { type: Array, default: [] },
		_checked: { type: Array, default: [] },
		filter: { type: String }
	},
	computed: {
		text: function () {
			var app = this;
			var itext = "";
			app._checked.forEach(item => itext += item[app.labelProperty] + ", ");
			if (itext != "") itext = itext.substr(0, itext.length - 2);
			else itext = undefined;
			
			return itext || this.placeholder;
		},
		searchPlaceholder: function () {
			var app = this;
			if (app.placeholder == "Nothing selected")
				return "";
			return app.placeholder;
		}
	},
	mounted: function () {
		var app = this;
		this.loadData();
		this.setEvents();
	},
	updated: function () {
		this.setEvents();
	},
	methods: {
		loadData: function () {
			var app = this;
			//let $select = $(app.$refs.sel);

			var filter = { search: app.searchString };

			if (app.filter) {
				var filterFunc = new Function(app.filter);
				var filterEvaluated = filterFunc();
				filter = $.extend(filter, filterEvaluated);
			}

			lgc.get(app.url, {
				filter: filter,
				ok: function (data) {
					app.data = app.mergeChecked(data);

					//app.$nextTick(function () {
					//	//$select.multiselect("reload");
					//});
				}
			});
		},
		setEvents: function () {
			var app = this;
			var $box = $(app.$refs.box);
			var $popup = $(app.$refs.popup);

			$popup.unbind("click").click(function (e) {
				e.stopPropagation();
			});

			$box.unbind("click").click(function (e) {
				e.stopPropagation();
				app.showPopup();
				setTimeout(function () {
					$("body").one("click",function () { app.hidePopup(); })
				}, 200);
			});
		},
		pushChecked: function () {
			var app = this;
			app._checked = [];
			app.data.forEach(item => { if (item.checked) app._checked.push(item); });
		},
		mergeChecked: function (data) {
			var ret = data;
			var app = this;
			app._checked.forEach(c => {
				var f = ret.find(item => item[app.idProperty] == c[app.idProperty]);
				if (f) f.checked = true;
			});
			return ret;
		},
		
		showPopup: function () {
			var app = this;
			var $box = $(app.$refs.box);
			var $popup = $(app.$refs.popup);
			

			let top = $box.position().top + $box.outerHeight();
			let left = $box.position().left;
			let maxHeight = $(window).outerHeight() / 1.5;
			let width = parseInt(app.popupWidth || $box.outerWidth(),10);
			let right = left + width;
			
			if (right > $(window).outerWidth() - 30)
				left -= right - ($(window).outerWidth()-30);

			$popup.css({ top: top + "px", left: left + "px", width: width + "px", maxHeight: maxHeight + "px" });

			if ($popup.is(":visible"))
				this.$emit('changed');

			$popup.fadeToggle(100);
			
		},
		hidePopup: function () {
			var app = this;
			this.$emit('changed');

			var $popup = $(app.$refs.popup);
			$popup.fadeOut(100);
		},

		getChecked: function () {
			return this._checked;
		},

		setChecked: function (data) {
			var app = this;
			app._checked = [];
			data.forEach(p => {
				app.data.forEach(item => {
					item.checked = item[app.idProperty] == p[app.idProperty];
					if (item.checked)
						app._checked.push(item);
				});
			});
			
		},

		save: function () {
			this.hidePopup();
		},

		markNone: function () {
			var app = this;
			app._checked = [];
			app.data.forEach(item => { item.checked = false; });
		},

		markAll: function () {
			var app = this;
			app.data.forEach(item => { item.checked = true; app._checked.push(item); });
		},
	}
});