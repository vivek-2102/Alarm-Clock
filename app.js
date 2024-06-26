let url = "http://worldtimeapi.org/api/timezone/Asia/";

let inp = document.querySelector("#inp");
let aud = new Audio("music.mp3");
let btn2 = document.querySelector("#search");

let city = inp.value;
btn2.addEventListener("click", async () => {
  city = inp.value;
  await getTime(city);
});
async function getTime(city) {
  try {
    let res = await axios.get(url + city);
    return res.data.datetime;
  } catch (err) {
    console.log(err);
  }
}

function addElement() {
  let body = document.querySelector("body");
  let inp = document.querySelector(".inp");
  let div = document.createElement("div");
  let h4 = document.createElement("h4");
  let bt = document.createElement("button");

  bt.classList.add("resize");
  bt.classList.add("stop");
  h4.classList.add("getData");

  div.classList.add("btn-container");
  bt.innerText = "Stop";
  h4.innerText = inp.value;
  body.appendChild(div);
  div.appendChild(h4);
  div.appendChild(bt);
}

let body = document.querySelector("body");
let btn = document.querySelector("#add");
btn.addEventListener("click", () => {
  addElement();
  let stopbtns = document.querySelectorAll(".stop");
  let stopbtnsArray = Array.from(stopbtns); //Ye isliye bnana pd rha hai kunki first element delete nhi ho rha tha.

  for (let stopbtn of stopbtnsArray) {
    stopbtn.addEventListener("click", () => {
      stopbtn.parentNode.remove(); //very important line hai
      aud.pause();
    });
  }
});

async function ringAlarm(hrs, min) {
  await addElement;
  let h4s = document.querySelectorAll("h4");
  for (h4 of h4s) {
    let x = h4.innerText.substr(0, 2);
    let y = h4.innerText.substr(3, 5);
    if (x == hrs && y == min) {
      aud.play();
    } else {
      aud.pause();
    }
  }
}

async function updateTime() {
  let h2 = document.querySelector("h2");

  let time = await getTime(city);
  let hrs = time.slice(11, 13);
  let min = time.slice(14, 16);
  let sec = time.slice(17, 19);

  h2.innerText = `Current Time ${hrs}:${min}:${sec}`;
  ringAlarm(hrs, min);
}

function addLeadingZero(number) {
  return number < 10 ? `0${number}` : number;
}

setInterval(updateTime, 1000);
