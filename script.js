var imageLoaded = false;

window.onload = start;

function start() {
  requestPicture();
  window.addEventListener("deviceorientation", handle, true);
}

function requestPicture() {
  var input = document.createElement("input");
  input.id = "input";
  input.type = "file";
  input.accept = "image/*";
  input.capture = "camera";
  document.getElementById("main").appendChild(input);
  input.addEventListener("change", (e) => displayPicture(e.target.files));
}

function displayPicture(files) {
  var input = document.getElementById("input");
  input.parentNode.removeChild(input);
  var imgURL = URL.createObjectURL(files[0]),
    img = document.createElement('img');
  img.onload = function() {
    URL.revokeObjectURL(imgURL);
  };
  img.src = imgURL;
  img.id = "image";
  document.getElementById("main").appendChild(img);
  imageLoaded = true;
}

function handle(event) {
  var alpha = Math.round(event.alpha);
  var beta = Math.round(event.beta);
  var gamma = Math.round(event.gamma);
  document.getElementById("alpha").innerHTML = alpha;
  document.getElementById("beta").innerHTML = beta;
  document.getElementById("gamma").innerHTML = gamma;
  if (imageLoaded) {
    
  }
}
