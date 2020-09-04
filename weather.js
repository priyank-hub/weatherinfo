
var req = new XMLHttpRequest();
var req2 = new XMLHttpRequest();
var lat, lon, flag = 0, flag2 = 0, t, ampm, ampms;
const c = document.createElement('div');

var city = document.getElementById('city');
city.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("myBTN").click();
    }
});

function myFunction() {
    c.classList.add('scrollbox');
    req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+city.value+'&appid=c6b2b46d0102c0d87b1dd58195933f3a');
    req.onload = function() {
        var data = JSON.parse(this.response);
        // console.log(data);
        lat = data.coord.lat;
        lon = data.coord.lon;

        const maindiv = document.getElementById('root');
        

        const containers = document.createElement('div');
        const h5 = document.createElement('h3');
        const h2 = document.createElement('h1');
        const img = document.createElement('img');
        const subdiv = document.createElement('div');
        const sunr = document.createElement('div');
        const suns = document.createElement('div');
        const wind = document.createElement('div');
        const visibility = document.createElement('div');
        
        req2.open('GET', 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=metric&appid=c6b2b46d0102c0d87b1dd58195933f3a')
        req2.onload = function() {
            var data3 = JSON.parse(this.response);
            console.log(data3);
            console.log(data3.current);
            containers.setAttribute('class', 'containers');
            h2.setAttribute('style', 'margin: 0');
            h5.classList.add('details');
            h2.innerText = data.name + ", " + data.sys.country;
            h5.innerText = "\nTemp: " + (data3.current.temp).toFixed(0) + " °C" + "\nFeels Like: " + (data3.current.feels_like).toFixed(0) + " °C" + "\nDescription: " + data3.current.weather[0].description;;
            
            subdiv.setAttribute('class', 'subcontainer'); 
            const h1 = document.createElement('h1');
            h1.innerText = 'Hourly';
            h1.setAttribute('style', 'color: white; text-align: center; font-family: montserrat; font-size: 1.5rem');
            subdiv.appendChild(h1);
            const line = document.createElement('hr');
            line.setAttribute('style', 'margin-top: 0; margin-bottom: 0; background-color: white; margin-left: 8vw; margin-right: 8vw');
            subdiv.appendChild(line);

            var hours = data3.hourly;
            hourly(hours, data3, subdiv);
            containers.onclick = function () {
                if(flag == 0){
                    subdiv.setAttribute('class', 'displaysubcontainer');
                    flag = 1;
                    
                }
                else if(flag == 1){
                    flag = 0;
                    subdiv.setAttribute('class', 'subcontainer');
                }
            }

            var id = data3.current.weather[0].id;
            var se = data3.current.weather[0].icon;
            img.src = "https://openweathermap.org/img/wn/" + se + "@4x.png";
        
            if(id >= 200 && id <233){  //thunderstorm
                containers.setAttribute('style', 'background-color: #586c80');
                subdiv.setAttribute('style', "background-color: #586c80");
            }

            else if(id >= 300 && id < 322){ //drizzle
                containers.setAttribute('style', 'background-image: linear-gradient(to left, #235e99, #84b6e8)');
                subdiv.setAttribute('style', "background-image: linear-gradient(to left, #235e99, #84b6e8)");
            }

            else if(id >= 500 && id < 532){  //rain
                if(id >=500 && id < 505){ //normal rain

                    var d = new Date();
                    if((d + data3.timezone_offset)/1000 > data3.current.sunrise && (d + data3.timezone_offset)/1000 > data3.current.sunset){
                        containers.setAttribute('style', 'background-image: linear-gradient(to left, #011121, #022d59)');
                        subdiv.setAttribute('style', "background-image: linear-gradient(to left, #011121, #022d59)");
                    }
                    else{
                        containers.setAttribute('style', 'background-image: linear-gradient(to left, #3990ad, #5aa6bf)');
                        subdiv.setAttribute('style', 'background-image: linear-gradient(to left, #3990ad, #5aa6bf)');
                    }
                }
                else if(id == 511){ //freezing rain
                    containers.setAttribute('style', 'background-image: linear-gradient(to left, #aac7d1, #86acb8)');
                    subdiv.setAttribute('style', 'background-image: linear-gradient(to left, #aac7d1, #86acb8)');
                }
                else{ //extreme rain
                    containers.setAttribute('style', 'background-image: linear-gradient(to left, #173d4a, #33687a)');
                    subdiv.setAttribute('style', 'background-image: linear-gradient(to left, #173d4a, #33687a)');
                }
            }
            else if(id >= 600 && id <623){ //snow
                containers.setAttribute('style', 'background-image: linear-gradient(to left, #aac7d1, #86acb8)');
                subdiv.setAttribute('style', 'background-image: linear-gradient(to left, #aac7d1, #86acb8)');
            }
            else if(id >= 700 && id <782){ //haze, atmosphere, fog, sand, windy
                containers.setAttribute('style', 'background-image: linear-gradient(to left, #234f5e, #478296)');
                subdiv.setAttribute('style', 'background-image: linear-gradient(to left, #234f5e, #478296)');
            }
            else if(id == 800){ //clear sky
                var d = new Date().getTime();
                if(se == "01n"){
                    containers.setAttribute('style', 'background-image: linear-gradient(to left, #011121, #022d59)');
                    subdiv.setAttribute('style', "background-image: linear-gradient(to left, #011121, #022d59)");
                }
                else{
                    containers.setAttribute('style', 'background-image: linear-gradient(to left, #25619e, #0b61b8)');
                    subdiv.setAttribute('style', "background-image: linear-gradient(to left, #25619e, #0b61b8)");
                }
            }
            else if (id == 801){ //cloudy
                var d = new Date().getTime();
                if(se == "02n"){
                    containers.setAttribute('style', 'background-image: linear-gradient(to left, #011121, #022d59)');
                    subdiv.setAttribute('style', "background-image: linear-gradient(to left, #011121, #022d59)");
                }
                else{
                    containers.setAttribute('style', 'background-image: linear-gradient(to left, #128cb5, #4cb7db)');
                    subdiv.setAttribute('style', 'background-image: linear-gradient(to left, #128cb5, #4cb7db)');
                }
            }
            else if (id == 802){
                containers.setAttribute('style', 'background-image: linear-gradient(to left, #226a82, #05789e)');
                subdiv.setAttribute('style', 'background-image: linear-gradient(to left, #226a82, #05789e)');
            }
            else if (id == 803 || id == 804){
                containers.setAttribute('style', 'background-image: linear-gradient(to left, #042530, #055069)');
                subdiv.setAttribute('style', 'background-image: linear-gradient(to left, #042530, #055069)');
            }

            sunr.setAttribute('style', 'height: 14vh; width: 7vw; position: relative; left: 8vw; top: 7vh; margin-right: 2vw');
            suns.setAttribute('style', 'height: 14vh; width: 7vw; position: relative; left: 8vw; top: 7vh; margin-right: 2vw');
            wind.setAttribute('style', 'height: 14vh; width: 10vw; position: relative; left: 8vw; top: 7vh; margin-right: 2vw');
            visibility.setAttribute('style', 'height: 14vh; width: 7vw; position: relative; left: 8vw; top: 7vh; margin-right: 2vw');
            const pa = document.createElement('p');
            const dtsunr = document.createElement('p');
            const pas = document.createElement('p');
            const dtsuns = document.createElement('p');
            const pass = document.createElement('p');
            const dtwind = document.createElement('p');
            const passs = document.createElement('p');
            const dtvis = document.createElement('p');
            var utc = data3.current.sunrise + data3.timezone_offset;
            var dates = new Date(utc * 1000);
            var ti;
            if(dates.getUTCHours() >= 12){
                if(dates.getUTCHours() == 12){
                    ti = (dates.getUTCHours());
                    ampm = ' PM';
                }
                else{
                    ti = (dates.getUTCHours() - 12);
                    ampm = ' PM';
                }
            }
            else{
                ti = dates.getUTCHours();
                ampm = ' AM';
            }

            var utcs = data3.current.sunset + data3.timezone_offset;
            var datess = new Date(utcs * 1000);
            var tis;
            if(datess.getUTCHours() >= 12){
                if(datess.getUTCHours() == 12){
                    tis = (datess.getUTCHours());
                    ampms = ' PM';
                }
                else{
                    tis = (datess.getUTCHours() - 12);
                    ampms = ' PM';
                }
            }
            else{
                tis = datess.getUTCHours();
                ampms = ' AM';
            }

            pa.innerText = "SUNRISE";
            if(dates.getMinutes() == 0){
                dtsunr.innerText = ti + ampm;
            }
            else{
                dtsunr.innerText = ti + ":" + dates.getUTCMinutes() + ampm;
            }
            pas.innerText = "SUNSET";
            dtsuns.innerText = tis + ":" + datess.getUTCMinutes() + ampms;
            pass.innerText = "WIND";
            dtwind.innerText = (data3.current.wind_speed * 3.6).toFixed(2) + " km/hr";
            passs.innerText = "VISIBILITY";
            dtvis.innerText = (data3.current.visibility/1000) + " km";
            pa.setAttribute('style', 'font-size: 1rem; color: 484d52; margin-bottom: 0; text-align: center');
            dtsunr.setAttribute('style', 'font-size: 1.5rem; text-align: center; font-weight: 200');
            pas.setAttribute('style', 'font-size: 1rem; color: 484d52; text-align: center; margin-bottom: 0');
            dtsuns.setAttribute('style', 'font-size: 1.5rem; text-align: center; font-weight: 200');
            pass.setAttribute('style', 'font-size: 1rem; color: 484d52; text-align: center; margin-bottom: 0');
            dtwind.setAttribute('style', 'font-size: 1.5rem; font-weight: 200; text-align: center');
            passs.setAttribute('style', 'font-size: 1rem; color: 484d52; text-align: center; margin-bottom: 0');
            dtvis.setAttribute('style', 'font-size: 1.5rem; font-weight: 200; text-align: center');
            sunr.appendChild(pa);
            sunr.appendChild(dtsunr);
            suns.appendChild(pas);
            suns.appendChild(dtsuns);
            wind.appendChild(pass);
            wind.appendChild(dtwind);
            visibility.appendChild(passs);
            visibility.appendChild(dtvis);
            
            containers.appendChild(img);
            containers.appendChild(h2);
            containers.appendChild(h5);
            containers.appendChild(sunr);
            containers.appendChild(suns);
            containers.appendChild(wind);
            containers.appendChild(visibility);
            containers.classList.add('grow');

            if(req.status >=200 && req.status < 410){
                c.appendChild(containers);
                c.appendChild(subdiv);
                maindiv.appendChild(c);
            }
            else{
                console.log("Error retreving!!!");
            }
        }
        req2.send();
    }
    city.value = '';
    req.send();
}

function clearFunction() {
    const containers = document.getElementsByClassName('containers');
    if(containers.length == 1){
        c.classList.remove('scrollbox');
    }
    try{
        containers[containers.length-1].setAttribute('class', 'clear');
    }
    catch(error){
        alert("List empty, add some cities!!");
    }
}

function hourly(hours, data3, subdiv) {
    const con = document.createElement('div');
    con.classList.add('container');
    const row = document.createElement('div');
    row.classList.add('row');
    row.setAttribute('id', 'rows');

    console.log(data3.hourly[0]);
    for(var i=0; i<12; i++){
        var utc = hours[i].dt + data3.timezone_offset;
        var date = new Date(utc * 1000);
        
        const colsm = document.createElement('div');
        colsm.classList.add('col-sm');
        const p = document.createElement('p');
        var pic = document.createElement('img');
        const d = document.createElement('p');

        pic = iconselector(data3, i);

        if(date.getUTCHours() >= 12){
            if(date.getUTCHours() == 12){
                t = (date.getUTCHours()) + ' PM';
            }
            else{
                t = (date.getUTCHours() - 12) + ' PM';
            }
        }
        else{
            t = date.getUTCHours() + ' AM';
        }
        p.innerText = t;
        p.setAttribute('style', 'margin-bottom: 0; font-size: 1rem');
        d.innerText = (data3.hourly[i].temp).toFixed(0) + " °C";
        colsm.appendChild(p);
        colsm.appendChild(pic);
        colsm.appendChild(d);
        colsm.classList.add('inline');
        row.appendChild(colsm);
    }
    row.classList.add('scrollmenu');
    con.appendChild(row);
    subdiv.appendChild(con);
}

function imagepicker(data3, i){
    var img = document.createElement('img');
    var se = data3.hourly[i].weather[0].icon;
    img.src = "https://openweathermap.org/img/wn/" + se + ".png";
    return img;
}

function iconselector(data3, i){
    var img = document.createElement('img');
    var se = data3.hourly[i].weather[0].icon;
    img.src = "https://openweathermap.org/img/wn/" + se + ".png";
    return img;
}