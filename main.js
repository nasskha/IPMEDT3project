AFRAME.registerComponent("toggle-menu", {
  dependencies: ["raycaster"],

  schema: {
    type: "selector",
  },

  play: function () {
    var button = this.el;
    var scene = this.el.sceneEl;
    var cursor = scene.querySelector("[raycaster]");
    var popUp = this.data;
    var popUps = scene.querySelectorAll(".menu");
    var popUpItems = popUp.querySelectorAll(".clickable");

    if (!popUp.object3D.visible) {
      for (var i = 0; i < popUpItems.length; i++) {
        popUpItems[i].classList.remove("clickable");
        popUpItems[i].classList.add("clickable-disabled");
      }
      cursor.components.raycaster.refreshObjects();
    }

    function clickHandler(e) {
      if (!!popUp.object3D.visible) return;

      for (var i = 0; i < popUps.length; i++) {
        if (popUps[i] === popUp) continue;

        var items = popUps[i].querySelectorAll(".clickable");

        popUps[i].object3D.visible = false;

        for (var j = 0; j < items.length; j++) {
          items[j].classList.remove("clickable");
          items[j].classList.add("clickable-disabled");
        }
      }
      //menu laten zien
      popUp.object3D.visible = true;

      for (var i = 0; i < popUpItems.length; i++) {
        popUpItems[i].classList.remove("clickable-disabled");
        popUpItems[i].classList.add("clickable");
      }
      //refreshen van raycaster componenten
      cursor.components.raycaster.refreshObjects();
    }
    //eventlistener toevoegen aan de button
    button.addEventListener("click", clickHandler);
  },
});

AFRAME.registerComponent("app", {
  init: function () {
    const light = document.getElementById("js--light");

    function turnOffLight() {
      light.setAttribute("light", "type: ambient; color: #BBB");
    }

    const camera = document.getElementById("camera-cirkel");
    const objectPlaatsen = document.getElementsByClassName("neerleggen");

    let scene = document.getElementById("js-scene");
    let oppakbaar = document.getElementsByClassName("oppakken");
    let vasthouden = null;
    let planeCounter = 0;

    let CPU = document.getElementById("CPU");
    let CpuPlaats = document.getElementById("CPUplaats");
    let ramGeheugen = document.getElementById("RAM");
    let ramPlaats = document.getElementById("RAMplaats");

    let foto = document.getElementsByClassName("Foto1");
    //oppakken van plane en een plane aanmaken op je scherm
    function addListeners() {
      oppakbaar = document.getElementsByClassName("oppakken");
      foto = document.getElementsByClassName("Foto1");
      for (let i = 0; i < oppakbaar.length; i++) {
        oppakbaar[i].addEventListener("click", function (evt) {
          console.log("aanroep");
          // de
          if (vasthouden == null) {
            console.log("zit erin");

            const newPlane = document.createElement("a-plane");
            const planeId = "plane" + planeCounter++;
            if (this.getAttribute("id") == "CPU") {
              console.log("hallo 1234");
              newPlane.setAttribute("src", "images/CPU.jpg");
              newPlane.setAttribute("width", 2);
              newPlane.setAttribute("height", 2);
              newPlane.setAttribute("id", planeId);
              newPlane.setAttribute(
                "class",
                "clickable oppakken neerleggen plekPlaatsen CPU"
              );
              newPlane.setAttribute("position", "1 1 -2");
              newPlane.setAttribute("scale", "0.5 0.5 0.5");
            } else if (this.getAttribute("id") == "SSD") {
              newPlane.setAttribute("src", "images/SSD.jpg");
              newPlane.setAttribute("width", 2);
              newPlane.setAttribute("height", 2);
              newPlane.setAttribute("id", planeId);
              newPlane.setAttribute(
                "class",
                "clickable oppakken neerleggen plekPlaatsen RAM"
              );
              newPlane.setAttribute("position", "1 1 -2");
              newPlane.setAttribute("scale", "0.5 0.5 0.5");
            } else if (this.getAttribute("id") == "RAM") {
              newPlane.setAttribute("src", "images/RAM.jpg");
              newPlane.setAttribute("width", 3);
              newPlane.setAttribute("height", 1);
              newPlane.setAttribute("id", planeId);
              newPlane.setAttribute(
                "class",
                "clickable oppakken neerleggen plekPlaatsen"
              );
              newPlane.setAttribute("position", "1 1 -2");
              newPlane.setAttribute("scale", "0.5 0.5 0.5");
            } else if (this.getAttribute("id") == "VENTILATOR") {
              newPlane.setAttribute("src", "images/ventilator.jpeg");
              newPlane.setAttribute("width", 2);
              newPlane.setAttribute("height", 2);
              newPlane.setAttribute("id", planeId);
              newPlane.setAttribute(
                "class",
                "clickable oppakken neerleggen plekPlaatsen"
              );
              newPlane.setAttribute("position", "1 1 -2");
              newPlane.setAttribute("scale", "0.5 0.5 0.5");
            } else if (this.getAttribute("id") == "GRAPHIC") {
              newPlane.setAttribute("src", "images/grapphiccard.png");
              newPlane.setAttribute("width", 2);
              newPlane.setAttribute("height", 2);
              newPlane.setAttribute("id", planeId);
              newPlane.setAttribute(
                "class",
                "clickable oppakken neerleggen plekPlaatsen"
              );
              newPlane.setAttribute("position", "1 1 -2");
              newPlane.setAttribute("scale", "0.5 0.5 0.5");
            }

            camera.appendChild(newPlane);
            vasthouden = "plane";

            console.log("plane id:", planeId);
            console.log("er wordt een plane vastgehouden", newPlane);

            if (this === CPU) {
              console.log("geklikt op de CPU");
            } else if (this === CpuPlaats) {
              console.log("geklikt op CPUplaats");
            } else if (this === ramGeheugen) {
              console.log("geklikt op RAM");
            } else if (this === ramPlaats) {
              console.log("clicked op ramplaats");
            }

            this.parentNode.removeChild(this);
            addListeners();
          }
        });
      }
    }

    addListeners();
    //plaatsen van een plane
    for (let i = 0; i < objectPlaatsen.length; i++) {
      objectPlaatsen[i].addEventListener("click", function (evt) {
        console.log("neerleg plek is geklikt", i);
        //hierergens een if statement?? als ik een plane oppak en wil plaatsen moet het kloppen
        //hetgeen wat je vast hebt moet hier naar null gezet worden en - vasthouden
        if (vasthouden == "plane") {
          console.log("er is een plane geplaatst");

          if (this.getAttribute("plane") != "neerleggen") {
            // light.setAttribute("light", "type:ambient; color: red");
            // setInterval(turnOffLight, 3000);
            const plane = document.createElement("a-plane");
            console.log("ik zit er net buiten");
            console.log("wat is this", this);
            console.log("plane is", plane);
            //if object is ram dan aanmaken ram en cpu hetzelfde
            //newplane id oppakken == ram
            //aanmaken van planes en die plaatsen
            console.log("Clicked element ID:", this.getAttribute("id"));

            if (this.getAttribute("class") == "neerleggen") {
              console.log("dit is de cpu plek");
              plane.setAttribute("id", "CPU");
              plane.setAttribute("class", "oppakken CPU");
              plane.setAttribute("src", "images/CPU.jpg");
              plane.setAttribute("width", 2);
              plane.setAttribute("height", 2);
              plane.setAttribute("position", {
                x: this.getAttribute("position").x,
                y: "0.7",
                z: this.getAttribute("position").z,
              });
              console.log("Ben ik hier geweest?");
            }
            if (this.getAttribute("class") == "neerleggen") {
              console.log("dit is de ram plek");
              plane.setAttribute("class", "oppakken RAM");
              plane.setAttribute("id", "RAM");
              plane.setAttribute("src", "images/RAM.jpg");
              plane.setAttribute("width", 3);
              plane.setAttribute("height", 1);
              plane.setAttribute("position", {
                x: this.getAttribute("position").x,
                y: "0.7",
                z: this.getAttribute("position").z,
              });
            }
            if (this.getAttribute("class") == "neerleggen") {
              console.log("dit is de ssd plek");
              plane.setAttribute("class", "oppakken ssd");
              plane.setAttribute("id", "SSD");
              plane.setAttribute("src", "images/SSD.jpg");
              plane.setAttribute("width", 2);
              plane.setAttribute("height", 2);
              plane.setAttribute("position", {
                x: this.getAttribute("position").x,
                y: "0.7",
                z: this.getAttribute("position").z,
              });
            }
            if (this.getAttribute("class") == "neerleggen") {
              console.log("dit is de ventilator plek");
              plane.setAttribute("class", "oppakken ventilator");
              plane.setAttribute("id", "VENTILATOR");
              plane.setAttribute("src", "images/ventilator.jpeg");
              plane.setAttribute("width", 2);
              plane.setAttribute("height", 2);
              plane.setAttribute("position", {
                x: this.getAttribute("position").x,
                y: "0.7",
                z: this.getAttribute("position").z,
              });
            }
            if (this.getAttribute("class") == "neerleggen") {
              console.log("dit is de graphic plek");
              plane.setAttribute("class", "oppakken graphic");
              plane.setAttribute("id", "GRAPHIC");
              plane.setAttribute("src", "images/grapphiccard.png");
              plane.setAttribute("width", 2);
              plane.setAttribute("height", 2);
              plane.setAttribute("position", {
                x: this.getAttribute("position").x,
                y: "0.7",
                z: this.getAttribute("position").z,
              });
            }

            if (
              (this == CpuPlaats && plane.getAttribute("id") == "CPU") ||
              (this == ramPlaats && plane.getAttribute("id") == "RAM")
            ) {
              light.setAttribute("light", "type:ambient; color: green");
              setInterval(turnOffLight, 1500);
              console.log("Clicked element ID in :", this.getAttribute("id"));
              console.log("ik zit in groen");
            } else if (
              (this == ramPlaats && plane.getAttribute("id") == "CPU") ||
              (this == CpuPlaats && plane.getAttribute("id") == "RAM")
            ) {
              light.setAttribute("light", "type:ambient; color:red");
              console.log(
                "clicked element id in rood:",
                this.getAttribute("id")
              );
              console.log("clicked plane", plane.getAttribute("id"));
              setInterval(turnOffLight, 1500);
              console.log("ik zit in rood");
            }

            scene.appendChild(plane);

            let klikbaarElement =
              document.getElementsByClassName("plekPlaatsen");
            while (klikbaarElement.length > 0) {
              klikbaarElement[0].parentNode.removeChild(klikbaarElement[0]);
            }
          }
          addListeners();

          vasthouden = null;
        }
      });
    }

    //teleporteren
    const hover = document.getElementsByClassName("js--hoveren");

    for (let i = 0; i < hover.length; i++) {
      hover[i].addEventListener("click", function (evt) {
        let att = document.createAttribute("animation");
        att.value =
          "property: position; easing: linear; dur:4500; to:" +
          this.getAttribute("position").x +
          " 3 " +
          +this.getAttribute("position").z;
        camera.setAttribute("animation", att.value);
      });
    }
  },
});
//starpagina button doorgaan naar volgende pagina
AFRAME.registerComponent("cursor-listener", {
  init: function () {
    var el = this.el;
    el.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  },
});
//teruggaan naar vorige pagina
AFRAME.registerComponent("cursor-listener1", {
  init: function () {
    var el = this.el;
    el.addEventListener("click", function () {
      window.location.href = "frontpage.html";
    });
  },
});

//uitlegslides
