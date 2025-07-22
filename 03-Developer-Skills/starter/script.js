// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// const measureKelvin = function () {
//   const measurement = {
//     type: "temp",
//     unit: "celsius",
//     value: Number(prompt("Degrees celsius:")),
//   };

//   console.log(measurement);

//   // console.warn(measurement.value);
//   // console.error(measurement.value);

//   return measurement.value + 273; // New way
// };

function printForecast(arr) {
  let str = "";
  for (let x in arr) {
    str += `${arr[x]}°C in ${Number(x) + 1} days... `;
  }
  return str;
}

console.log(
  printForecast(
    prompt("Enter temperatures separated by commas:").split(",").map(Number)
  )
);
