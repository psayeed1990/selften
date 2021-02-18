import moment from "moment";

export function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function checkValidEmail(email) {
  if (!email) {
    return false;
  }

  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export function isoToUtcDate(date) {
  if (!date) {
    return "";
  }

  date = moment(date);
  return date.utc().format("YYYY-MM-DD");
}

export function isoToUtcDateTime(date) {
  if (!date) {
    return "";
  }

  date = new Date(date);
  return date.toLocaleString();
}


export function getFormatDate(date) {

  let month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if(date){
    return `${new Date(date).getDate()} 
    ${month_names[new Date(date).getMonth()]}
    ${new Date(date).getFullYear()}
  `
  }else {
    return ''
  }

}

export function getFormatDateJobPost(date) {

  let month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${new Date(date).getDate()} 
          ${month_names[new Date(date).getMonth()]}
          ${new Date(date).getFullYear()}
        `
}

export function getDayName(date) {

  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var d = new Date(date);
  var dayName = days[d.getDay()];
  return dayName;
}


export function getEightyYear() {
  const current = new Date();
  let number = current.getFullYear();
  var year = [{ id: number, name: number }];

  [...Array(80)].map(el => {
    number = number - 1;
    year.push({ id: number, name: number });

  })

  return year;
}


export function getHourMinuteSeconds(date) {
  return `${date.getHours()}:${date.getMinutes()}`
}


export function showIamge(image) {
  if (!image) {
    return require('../../src/assets/home/image-not-found.jpg');
  } else {
    if ((image.split(':')[0] === 'http') || (image.split(':')[0] === 'https')) {
      return image;
    } else {
      return `http://stage.flogapp.com${image}`;
    }
  }
}



export function isImage(file) {
  var ext = file.split('.');
  ext = ext[ext.length - 1].toLowerCase();
  // var arrayExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif' , 'raw' , 'indd'];
  var arrayExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'gif' , 'raw' , 'indd' , 'al' , 'eps' , 'pdf' ,'tiff' , 'psd' , 'jfif' , 'webp' ];
  if (arrayExtensions.lastIndexOf(ext) == -1) {
   return false
  }else {
    return true
  }
}


export function capitalizeFirstLetter(s) {
    return s[0].toUpperCase() + s.slice(1);
}