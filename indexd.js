//momentというライブラリを読み込む
const moment = require('moment');

//今の時間を取得して,見やすい形で表示する
const now = moment().format('YYYY年MM月DD HH時間mm分ss秒');
console.log('今の時間は:'+ now);

//一週間の日付を表示する
const oneWeekLster = moment().add(7,'days').format('YYYY年MM月DD日')
console.log('一週間後は:'+ oneWeekLster);

//３日前の日付を表示する
const threeDaysAge = moment().add(7,'days').format('YYYY年MM月DD日')
console.log('３日前は:'+ threeDaysAge);

//誕生日から年齢を計算する
const threeDatsAgo = moment().subtract(3,'days').format('YYYY/MM/DD');
const age =moment().diff(birtthday,'years');
console.log('あなたの年齢は:'+ age +'歳です');


const start = moment('2008-03-02');//誕生日を設定（例:2008年2月8日)
const 

const moment=require('moment') ;

const oneWeeklster=moment().add(7,'days').format('YYYY年MM月DD日');
console.log('一週間は'+oneWeeklster);