var util = require('util')
var nodeimu  = require('./index.js');
var IMU = new nodeimu.IMU();

var num = 0;
var numStop = 100;

console.time("async");

var print_vector3 = function(name, data) {
  var sx = data.x >= 0 ? ' ' : '';
  var sy = data.y >= 0 ? ' ' : '';
  var sz = data.z >= 0 ? ' ' : '';
  return util.format('%s: %s%s %s%s %s%s ', name, sx, data.x.toFixed(4), sy, data.y.toFixed(4), sz, data.z.toFixed(4));
}

var tic = new Date();
var callb = function (e, data) {
  var toc = new Date();

  if (e) {
    console.log(e);
    return;
  }

  var str = data.timestamp.toISOString() + " ";
  str += print_vector3("Accel", data.accel)
  // str += print_vector3("Gyro", data.gyro)
  // str += print_vector3("Compass", data.compass)
  // str += print_vector3("Fusion", data.fusionPose)

  var str2 = "";
  if (data.temperature && data.pressure && data.humidity) {
    var str2 = util.format('%s %s %s', data.temperature.toFixed(4), data.pressure.toFixed(4), data.humidity.toFixed(4));
  }
  console.log(str + str2);

  num++;
  if (num == numStop) {
    console.timeEnd("async");
  } else {
    setTimeout(function() { tic = new Date(); IMU.getValue(callb); } , 50 - (toc - tic)); 
  }
}

IMU.getValue(callb);
