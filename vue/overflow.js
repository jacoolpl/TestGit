"use strict";
Vue.component('vue-overflow', {
	template: `
		<div>
			<button 
				class="img ripple" 
				v-bind:style="'height:'+buttonSize+'px;width:'+buttonSize+'px'"
				v-bind:id="selector" >
				<vue-svg src="LGCore/Svg/hdots.svg"></vue-svg>
			</button>
		</div>
	`,
	props: {
		buttonSize: {
			type: Number,
			default: 32
		},
		items: {
			type: Object
		},
		selector: {
			type: String,
			default: lgc.id()
		}
	},
	mounted: function () {
		var app = this.$parent;
		var _this = this;

		if (this.items !== undefined) {
			for (var key in this.items) {
				var item = this.items[key];
				if (item.hideAbove) {
					item.visible = function (key) {
						return window.innerWidth < _this.items[key].hideAbove;
					}
				}
				else if (item.hideBeneath) {
					item.visible = function (key) {
						return window.innerWidth > _this.items[key].hideBeneath;
					}
				}
			}
		}

		$.contextMenu({
			selector: "#" + this.selector,
			trigger: "left",
			items: this.items,
			callback: function (key, options) {
				var item = _this.items[key];
				if (item.click)
					item.click(app, key, item);
			}
		});
	},
	methods: {
	}
});