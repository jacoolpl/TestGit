"use strict";
Vue.component('vue-svg-button', {
	template: `
		<div v-on:click="$emit('click');">
			<button 
				class="img ripple" 
				v-bind:style="'height:'+height+'px;width:'+width+'px'"
				v-bind:id="selector" >
				<vue-svg v-bind:src="src"></vue-svg>
			</button>
		</div>
	`,
	props: {
		buttonSize: {
			type: Number,
			default: 32
		},
		buttonWidth: {
			type: Number,
			default: null
		},
		buttonHeight: {
			type: Number,
			default: null
		},
		selector: {
			type: String,
			default: lgc.id()
		},
		src: {
			type: String, 
			default: "LGCore/Svg/hdots.svg"
		}
	},
	computed: {
		width: function() {
			if (this.buttonWidth && this.buttonWidth != null)
				return this.buttonWidth;
			return this.buttonSize;
		},
		height: function () {
			if (this.buttonHeight && this.buttonHeight != null)
				return this.buttonHeight;
			return this.buttonSize;
		}
	}
});