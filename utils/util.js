const formatTime = (date) => {
  // var date= new Date("2019-5-21 20:30:00".replace(/-/g,'/'));
  // var date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${[year, month, day].map(formatNumber).join("/")} ${[
    hour,
    minute,
    second,
  ]
    .map(formatNumber)
    .join(":")}`;
};

const formatDate = (date) => {
  var date = new Date(date);
  // date = date.toString()
  // console.log(typeof( date));
  let year = date.getFullYear();
  console.log(year);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let temp;
  month = month.toString();
  day = day.toString();
  temp = year + "年" + month + "月" + day + "日";
  return temp;
};
const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

module.exports = {
  formatTime,
  formatDate,
};
