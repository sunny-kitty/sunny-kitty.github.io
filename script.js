var wrapper, glass, image;
var imageLoaded = false;

window.onload = start;

function start() {
  initializeDomVariables();
  addEventListener();

  function initializeDomVariables() {
    wrapper = document.getElementById("wrapper");
    glass = document.getElementById("glass");
  }

  function addEventListener() {
      window.ondeviceorientation = onDeviceMovement;
  }

  requestPicture();
}

function requestPicture() {
  var input = document.createElement("input");
  input.id = "input";
  input.type = "file";
  input.accept = "image/*";
  input.capture = "camera";
  document.getElementById("glass").appendChild(input);
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
  document.getElementById("glass").appendChild(img);
  imageLoaded = true;
  image = document.getElementById("image");
  image.style.width = "100vw";
  image.style.height = "auto";

  img.onload = function() {
    setSize(wrapper, image.height, image.width);
    setSize(glass, image.height, image.width);

    function setSize(dom, height, width) {
      dom.style.height = height.toString() + "px";
      dom.style.width = width.toString() + "px";
    }
  }
}

function move(a, b, g) {
  image.style.top = b.toString() + "px";
  image.style.left = g.toString() + "px";
}

function onDeviceMovement(event) {
  var a = Math.round(event.alpha);
  var b = Math.round(event.beta);
  var g = Math.round(event.gamma);
  document.getElementById("alpha").innerHTML = a;
  document.getElementById("beta").innerHTML = b;
  document.getElementById("gamma").innerHTML = g;
  if (imageLoaded)
    move(a, b, g);
}
