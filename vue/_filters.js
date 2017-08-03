"use strict";
/**
	Vue.js Global Filters
*/

//Date and Time
Vue.filter("formatDate", value => { if (value) return moment(value, "DD.MM.YYYY HH:mm:ss").format("DD.MM.YYYY"); });
Vue.filter("formatTime", value => { if (value) return moment(value, "DD.MM.YYYY HH:mm:ss").format("HH:mm"); });
Vue.filter("formatTimeSec", value => { if (value) return moment(value, "DD.MM.YYYY HH:mm:ss").format("HH:mm"); });

//Numbers
Vue.filter("formatCurrency", value => { if (value) return lgc.floatToCurrency(value); });
Vue.filter("formatN1", value => { if (value) return lgc.floatToCommaString(value, 1); });
Vue.filter("formatN2", value => { if (value) return lgc.floatToCommaString(value, 2); });
Vue.filter("formatN3", value => { if (value) return lgc.floatToCommaString(value, 3); });