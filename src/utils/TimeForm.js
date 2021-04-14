import Vue from 'vue'

Vue.filter('TimeFormat', function (value) {
  if (!value) return ''
  let mins = parseInt(value / 1000 / 60);
  let seconds = parseInt((value / 1000) % 60);
  seconds = seconds > 10 ? seconds : "0" + seconds;
  mins = mins > 10 ? mins : "0" + mins;
  return `${mins}:${seconds}`;
})

Vue.filter('playCounts', function (value) {
  if (!value) return ''
  return (value =
    parseInt(value / 10000) > 0 ? parseInt(value / 10000) + "万" : value);
})
Vue.filter('YearFormat',function (value) {
  if (!value) return ''
  const dt = new Date(value);

  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");

  
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} `;
})

