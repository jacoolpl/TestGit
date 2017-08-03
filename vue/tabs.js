"use strict";
Vue.component('vue-tabs', {
	template: `
		<div v-bind:class="'lgc-tabs '+direction+' depth'+depth">
			<vue-tab 
				v-for='(tab,id) in tabs' 
				v-on:click="click(id,tab)"
				v-bind:name='tab.name'
				v-bind:selected='tab.selected'
			>
			</vue-tab>
		</div>
	`,
	props: {
		direction: { type: String, default: "x" }, /*or y*/
		depth: { type: Number, default: 1 },
		tabs: { type: Object },
		selected: { type: String }
	},
	created: function () {
		var app = this;
		$.each(app.tabs, (id, tab) => { if (tab.selected === undefined) Vue.set(tab, 'selected', false); });

		//select tab from selected attribute
		if (app.selected) 
			$.each(app.tabs, (id, tab) => { tab.selected = id == app.selected; });

		//check if a tab is selected
		var found = false;
		$.each(app.tabs, (id, tab) => { if (tab.selected) found = true; })

		//if no tab is selected, selected the first one
		if (!found) 
			$.each(app.tabs, (id, tab) => { tab.selected = true; return false; });
	},
	mounted: function () {
	},
	methods: {
		click: function (clickedId, clickedTab) {
			for (var id in this.tabs) 
				this.tabs[id].selected = id == clickedId;
		}
	}
});


Vue.component('vue-tab', {
	template: `
		<div v-bind:class="'ripple '+ (selected ? 'selected ' : '') " v-on:click="$emit('click',this);">{{name}}</div>
	`,
	props: {
		name: { type: String, default: "tab" },
		selected: { type: Boolean, default: false }
	}
});


//check: if top level tabbar is now visible, hide shadow from the quickbar
var _tabd1viewstate = "none";
window.setInterval(function () {

	if (_tabd1viewstate == "none" && $(".lgc-tabs.depth1:visible").length > 0) {
		_tabd1viewstate = "visible";
		$("#quickbar").addClass("hideshadow");
	}
	else if (_tabd1viewstate == "visible" && $(".lgc-tabs.depth1:visible").length == 0) {
		_tabd1viewstate = "none";
		$("#quickbar").removeClass("hideshadow");
	}

}, 100);