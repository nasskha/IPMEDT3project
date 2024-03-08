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
    let newGltfModelCounter = 0;

    let cpu = document.getElementById("cpu");
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

            // const newGltfModel = document.createElement("a-plane");
            const newGltfModel = document.createElement("a-gltf-model");
            // const gltfId = "newGltfModel" + newGltfModelCounter++;
            // newGltfModel.setAttribute("id", gltfId);
            console.log(newGltfModel);

            console.log(newGltfModel.id);

            if (this.getAttribute("id") == "moederboard") {
              console.log("hallo 1234");
              newGltfModel.setAttribute("src", "assets/moederboard.gltf");
              newGltfModel.setAttribute("id", "moederboard");

              newGltfModel.setAttribute(
                "class",
                "clickable oppakken  plekPlaatsen"
              );
              newGltfModel.setAttribute("position", "2 0 -2");
              newGltfModel.setAttribute("scale", "0.5 0.5 0.5");
              console.log(newGltfModel.getAttribute("id"));
            } else if (this.getAttribute("id") == "cpu") {
              newGltfModel.setAttribute("src", "assets/cpu.gltf");
              newGltfModel.setAttribute("id", "cpu");
              newGltfModel.setAttribute(
                "class",
                "clickable oppakken  plekPlaatsen "
              );
              newGltfModel.setAttribute("position", "2 0 -2");
              newGltfModel.setAttribute("scale", "0.5 0.5 0.5");
            } else if (this.getAttribute("id") == "ram") {
              newGltfModel.setAttribute("src", "assets/ram.gltf");
              newGltfModel.setAttribute("id", "ram");
              newGltfModel.setAttribute(
                "class",
                "clickable oppakken  plekPlaatsen "
              );
              newGltfModel.setAttribute("position", "2 0 -2");
              newGltfModel.setAttribute("scale", "0.5 0.5 0.5");
            } else if (this.getAttribute("id") == "ventilator1") {
              newGltfModel.setAttribute("src", "assets/ventilator.gltf");
              newGltfModel.setAttribute("id", "ventilator1");
              newGltfModel.setAttribute(
                "class",
                "clickable oppakken  plekPlaatsen "
              );
              newGltfModel.setAttribute("position", "2 0 -2");
              newGltfModel.setAttribute("scale", "0.5 0.5 0.5");
            } else if (this.getAttribute("id") == "ventilator2") {
              newGltfModel.setAttribute("src", "assets/ventilator2.gltf");
              newGltfModel.setAttribute("id", "ventilator2");
              newGltfModel.setAttribute(
                "class",
                "clickable oppakken  plekPlaatsen "
              );
              newGltfModel.setAttribute("position", "2 0 -2");
              newGltfModel.setAttribute("scale", "0.5 0.5 0.5");
            }

            camera.appendChild(newGltfModel);
            vasthouden = "newGltfModel";
            console.log("HAODJSOIDHIOD", newGltfModel.getAttribute("id"));

            // console.log("gltf id:", gltfId);
            console.log("er wordt een plane vastgehouden", newGltfModel);

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
    // plaatsen van een plane
    for (let i = 0; i < objectPlaatsen.length; i++) {
      objectPlaatsen[i].addEventListener("click", function (evt) {
        console.log("neerleg plek is geklikt", i);
        //hierergens een if statement?? als ik een plane oppak en wil plaatsen moet het kloppen
        //hetgeen wat je vast hebt moet hier naar null gezet worden en - vasthouden
        if (vasthouden !== null) {
          console.log("er is een plane geplaatst");

          if (this.getAttribute("class") == "neerleggen") {
            // this is waar je naar kijkt (nu grijs vlakje)
            const ditHebIkVast =
              document.getElementsByClassName("plekPlaatsen")[0];
            const modelId = ditHebIkVast.id;
            console.log(ditHebIkVast);
            let message = "";
            console.log("ik zit in de switch");
            let newGltfModel = document.createElement("a-gltf-model");
            // const targetPosition = this.getAttribute("position");

            switch (modelId) {
              case "moederboard":
                message = "dit is de moederboard plek";
                newGltfModel.setAttribute("id", "moederboard");
                newGltfModel.setAttribute("class", "oppakken moederboard");
                newGltfModel.setAttribute("src", "assets/moederboard.gltf");
                break;
              case "ram":
                message = "dit is de ram plek";
                newGltfModel.setAttribute("class", "oppakken ram");
                newGltfModel.setAttribute("id", "ram");
                newGltfModel.setAttribute("src", "assets/ram.gltf");
                // newGltfModel.setAttribute("position", targetPosition);
                break;
              case "cpu":
                message = "dit is de cpu plek";
                newGltfModel.setAttribute("class", "oppakken cpu");
                newGltfModel.setAttribute("id", "cpu");
                newGltfModel.setAttribute("src", "assets/cpu.gltf");
                break;
              case "ventilator1":
                console.log("dit is ventilator 1");
                message = "dit is de ventilator plek";
                newGltfModel.setAttribute("class", "oppakken ventilator1");
                newGltfModel.setAttribute("id", "ventilator1");
                newGltfModel.setAttribute("src", "assets/ventilator.gltf");
                break;
              case "ventilator2":
                message = "dit is de ventilator2 plek";
                newGltfModel.setAttribute("class", "oppakken ventilator2");
                newGltfModel.setAttribute("id", "ventilator2");
                newGltfModel.setAttribute("src", "assets/ventilator2.gltf");
                break;
              default:
                break;
            }

            if (message) {
              console.log(message);
              newGltfModel.setAttribute("position", {
                x: this.getAttribute("position").x,
                y: "1",
                z: this.getAttribute("position").z,
              });
            }

            // hieronder zit de feedback code die niet werkt.
            // if (
            //   (this == CpuPlaats && newGltfModel.getAttribute("id") == "cpu") ||
            //   (this == ramPlaats && newGltfModel.getAttribute("id") == "ram")
            // ) {
            //   light.setAttribute("light", "type:ambient; color: green");
            //   setInterval(turnOffLight, 1500);
            //   console.log("Clicked element ID in :", this.getAttribute("id"));
            //   console.log("ik zit in groen");
            // } else if (
            //   (this == ramPlaats && newGltfModel.getAttribute("id") == "cpu") ||
            //   (this == CpuPlaats && newGltfModel.getAttribute("id") == "ram")
            // ) {
            //   light.setAttribute("light", "type:ambient; color:red");
            //   console.log(
            //     "clicked element id in rood:",
            //     this.getAttribute("id")
            //   );
            //   console.log("clicked plane", newGltfModel.getAttribute("id"));
            //   setInterval(turnOffLight, 1500);
            //   console.log("ik zit in rood");
            // }

            scene.appendChild(newGltfModel);

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
          " 4 " +
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

AFRAME.registerComponent("cursor-listener2", {
  init: function () {
    var closeButton = document.getElementById("closeButton");
    var self = this;

    closeButton.addEventListener("click", function () {
      self.closeEntity();
    });
  },

  closeEntity: function () {
    var uitlegplane = document.getElementById("openClose");
    uitlegplane.setAttribute("visible", "false");
  },
});
