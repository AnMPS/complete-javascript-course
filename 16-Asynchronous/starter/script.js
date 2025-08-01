'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgDiv = document.querySelector('.images');
// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal
// https://countries-api-836d.onrender.com/countries/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// const getCountryAndNeighbor = function (country) {
//   const request = new XMLHttpRequest(); //old way of doing things
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();
//   //async part now, when it loads, use cb function
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);
//     //getNeighbors
//     const neighbour = data.borders;
//     if (!neighbour) return;
//     const request2 = new XMLHttpRequest(); //old way of doing things
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour[0]}`);
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data = JSON.parse(this.responseText);
//       renderCountry(data, neighbour);
//     });
//   });
// };

// getCountryAndNeighbor('portugal');

// Es 6 AND ESCAPING CALLBACK HELL

// const request = new XMLHttpRequest(); //old way of doing things
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

//fetch().then(worked, didNotWork)

//new form
const request = fetch(`https://restcountries.com/v2/name/portugal`); //creates a promise, placeholder for future result
//instead of nesting callbacks we can nest promises to escape callback hell

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       return response.json(); //this is a new promise
//     })
//     .then(function (data) {
//       renderCountry(data[0]);
//     });
// };

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

//refactor
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(
//       response => {
//         console.log(response);
//         if (!response.ok) throw new Error('Country not found');
//         return response.json();
//       },
//       err => alert(err)
//     ) //one way to do it, using a handler on site
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`); //this entire method will now return a new promise.
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => renderError(err)) //catch!
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found');
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => renderError(err)) //catch!
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value 
(lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert 
coordinates to a meaningful location, like a city and country name. Use this API to do 
reverse geocoding: 
https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: 
https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. 
Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, 
that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that 
you recieved about the provided location. Then, using this data, log a messsage like this to the 
console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this 
error with code 403. This is an error with the request. Remember, fetch() 
does NOT reject the promise in this case. So create an error to reject the promise yourself, 
with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute 
from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture 
(you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

function getCoordsJson(lat, lng) {
  return fetch(
    `https:api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  ).then(response => {
    if (!response.ok) throw new Error(`Country not found ${response.status}`);
    return response.json();
  });
}
const whereAmI = function (lat, lng) {
  getCoordsJson(lat, lng)
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      getCountryData(data.countryName);
    })
    .catch(error => console.error(error));
};

// whereAmI('-33.933', '18.474');

const lotteryPromise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve('You WIN');
  } else {
    reject('You lose');
  }
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    //this will never reject
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log(`I waited for 2 seconds`);
    return wait(1);
  })
  .then(() => console.log(`I waited for an extra second`));

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. 
Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img')) 
and sets the .src attribute to the provided image path. 
When the image is done loading, append it to the DOM element with the 'images' class, 
and resolve the promise. The fulfilled value should be the image element itself. 
In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function 
we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), 
and load a second image (HINT: Use the image element returned by the createImage promise to 
hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. 
Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

// const createImage = function (imgPath, i) {
//   return new Promise((resolve, reject) => {
//     if (!imgPath) reject('No path');
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.id = 'img-${i}';
//     img.addEventListener('load', function () {
//       imgDiv.append(img);
//       console.log('image loaded');
//       resolve(img);
//     });
//     img.addEventListener('error', e => reject(new Error('Img not found')));
//   });
// };

// createImage('./img/img-1.jpg', 1)
//   .then(img => wait(2))
//   .then(() => {})
//   .then(() => {
//     createImage('./img/img-2.jpg', 2)
//       .then(img => wait(2))
//       .then(() => {});
//   });

//async await

const whereAmIAsync = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
  }
};

whereAmIAsync('portugal');

const testAsync = async function () {
  await wait(5);
  return 'meme';
};

testAsync().then(res => console.log(res));

(async function () {
  const x = await testAsync();
  console.log(x);
})();

const get3Countries = async function (c1, c2, c3) {
  try {
    //this will run one after the other
    // const [data1]= await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2]= await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3]= await getJSON(`https://restcountries.com/v2/name/${c3}`);

    //returns a promise that calls all promises
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital)); //maps out each capital and prints
  } catch (err) {
    throw err;
  }
};

get3Countries('portugal', 'canada', 'usa');

//promise.race([promises]) returns the first promise that settles.
// await Promise.race([wait(5),wait(2),wait(3)]) returns result of wait(2)
// it also returns a promise if it rejects. useful for timeouts.

//Promise.allSettled, returns all promises even if they rejected.

//Promise.any returns first fulfilled promise, ignores rejected promises.
