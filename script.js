var glass, image;
var width, height;

window.onload = start;

function start() {
  requestPicture();
  window.onresize = resizeController;
  window.ondeviceorientation = deviceOrientationController;

  function requestPicture() {
    var input = document.createElement("input");
    input.id = "input";
    input.type = "file";
    input.accept = "image/*";
    input.capture = "camera";
    document.getElementById("glass").appendChild(input);
    input.addEventListener("change", (e) => imageController(e.target.files));
  }

  function imageController(files) {
    document.getElementById("input").parentNode.removeChild(document.getElementById("input"));

    var imgURL = URL.createObjectURL(files[0]),
      img = document.createElement('img');
    img.onload = function() {
      URL.revokeObjectURL(imgURL);
    };
    img.src = imgURL;
    img.id = "image";
    document.getElementById("glass").appendChild(img);
    img.onload = function() {
      glass = document.getElementById("glass");
      image = document.getElementById("image");
      resizeController();
      deviceOrientationController();
    }
  }

  function resizeController() {
    width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    if (image === null || image === undefined) return;
    glass.style.width = (image.width - (width * 0.1)) + "px";
    glass.style.height = (image.height - (height * 0.1)) + "px";
    move();
  }

  function deviceOrientationController() {
    var beta = Math.round(event.beta);
    var gamma = Math.round(event.gamma);
    document.getElementById("beta").innerHTML = beta;
    document.getElementById("gamma").innerHTML = gamma;
    if (image === null || image === undefined) return;
    var y = 0;
    // gamma [-90, 90]

    move((gamma / 1800) * width, y * height);



    // TODO: umrechnung von beta und gamma in pixel mit anschlißendem move. dann fertig
  }

  function move(x = 0, y = 0) {
    image.style.right = (width * 0.05) + x + "px";
    image.style.bottom = (height * 0.05) + y + "px";
    //delete
    document.getElementById("xvalue").innerHTML = x;
  }
  /*-----------*/
  document.getElementById("btn").onclick = () => {
    test += 0.01;
    var x = width * test;
    var y = 0;
    move(x, y);
  };
}
var test = 0;
