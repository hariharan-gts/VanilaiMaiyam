const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`
const search=document.querySelector("#search");
const form=document.querySelector("form");
const weather=document.querySelector("#weather")
const type=document.querySelector("#type")
const getWeather = async(type,city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url= type=="city"?`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`:
    `https://api.openweathermap.org/data/2.5/weather?zip=${city},in&appid=${API_KEY}&units=metric`
    const res=await fetch(url);
    const data=await res.json();
    return showWeather(data)
}

window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((pos)=>{
           // console.log(pos);
            long=pos.coords.longitude
            lati=pos.coords.latitude

            const api = "6d055e39ee237af35ca066f35474e9df";
  
            // API URL
            const base =
      `http://api.openweathermap.org/data/2.5/weather?lat=${lati}&` +
      `lon=${long}&appid=6d055e39ee237af35ca066f35474e9df&units=metric`;

          fetch(base)
          .then((res)=>{
            return res.json()
          })
          .then((data)=>{
         //   console.log(data);
           showWeather(data)

          })
        })

    }
})
const showWeather=(data)=>{
  if(data.cod=="404"){
    weather.innerHTML='<h2>City Not Found</h2>'
    return;
  }

  weather.innerHTML=`
  <div>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
</div>
<div>
  <h1>${data.name}</h1>
  <h2>${data.main.temp} ℃</h2>
  <h2> ${data.weather[0].main} </h2>
</div>
  `
}

form.addEventListener(
    "submit",
    function(e){
        getWeather(type.value,search.value);
        e.preventDefault();
    }
)