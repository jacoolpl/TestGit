"use strict";
Vue.component('vue-list', {
	template: `
		<div class="lgc-scrollshadow lgc-o lgc-flx w100p h100p col" style="overflow:auto" v-infinite-scroll="loadInternal" infinite-scroll-disabled="busy">
			<slot></slot>
			<div v-if="showLoading" class="gap text_inactive" ><i class="fa fa-circle-o-notch fa-spin fa-lg fa-fw text_inactive"></i></div>
		</div>
	`,
	props: {
		from: { type: Number, default: 0 },
		range: { type: Number, default: 100 },
		showLoading: {
			type: Boolean,
			default: false
		},
		busy: { type: Boolean, default: false }
	},
	mounted: function () {
		this.first = true;
		this.busy = false;
	},
	methods: {
		reset: function () {
			this.first = true;
			this.from = 0;
			this.loadInternal();
		},
		loadInternal: function (retry) {
			var app = this;
			app.showLoading = true;
			app.busy = true;

			if (!app.first && !retry)
				app.from += parseInt(app.range,10);

			try {
				app.$emit('loaddata', {
					from: app.from,
					range: app.range,
					done: function (itemsLoadedCount) {
						app.showLoading = false;

						//if itemsLoaded is smaller than range => all items are loaded. set busy to true, so that loadInternal won't be called again
						app.busy = itemsLoadedCount < app.range;
					}
				});

				app.first = false;

			}
			catch (e) {
				if (app.first) {
					app.first = false;
					setTimeout(function () {
						app.loadInternal(true);
					}, 200);
				}
			}
		}
	}
});