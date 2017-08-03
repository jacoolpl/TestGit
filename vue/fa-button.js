"use strict";
Vue.component('vue-fa-button', {
	//use div instead of button, fontawesome <i> tags won't work inside <button> tags
	template: `
		<div v-on:click="$emit('click');">
			<div v-bind:class="'fa-button button ripple'"
				v-bind:style="'height:'+buttonSize+'px;width:'+buttonSize+'px;line-height:'+buttonSize+'px'"
				v-bind:id="selector" >
				<i v-bind:class="'fa fa-lg '+fa"></i>
			</div>
		</div>
	`,
	props: {
		buttonSize: {
			type: Number,
			default: 32
		},
		selector: {
			type: String,
			default: lgc.id()
		},
		fa: {
			type: String, 
			default: "fa-cog"
		}
	}
});