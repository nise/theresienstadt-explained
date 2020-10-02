<template>
  <div class="container">
    <h1>FakeVideo</h1>

    <div class="page">
      Video-Aufnahmen gelten bislang als wichtige Beweise, um Sachverhalte zu klären. Das könnte bald vorbei sein, denn die Manipulation von Bewegtbildern ist technisch quasi für jeden möglich. Öffentlichkeit und vor allem Medienmacher müssen künftig also noch viel genauer hinschauen, welche Videos echt sind und welche manipuliert.
      Unterschied zwischen den Visual Effects in Kinofilmen und den hier presentierten Techniken ist der betriebene Aufwand und die dazu notwendige Expertise.
      Techniken aus der Fotomanipulation lassen sich auf Video übertragen.
      Will deepfakes do deep damage? https://cacm.acm.org/magazines/2020/1/241708-will-deepfakes-do-deep-damage/fulltext
      <h2>Bim</h2>
      <ul class="page-list">
        <li>dd</li>
      </ul>

      <h2>Beispiele</h2>

      <h3>Personen aus dem Videobild entfernen</h3>Mayes hat einen Algorithmus auf Basis des Machine-Learning-Frameworks Tensorflow aus dem Hause Google entwickelt, der in der Lage ist, Personen aus dem Live-Bild einer Webcam zu entfernen. Dazu lernt die KI in Echtzeit. Die einzige Voraussetzung ist, dass sich die zu entfernende Person bewegt und die Umgebung ansonsten statisch ist. Komplexe Hintergründe verschlechtern zwar das Ergebnis ein wenig, stellen aber kein gravierendes Hindernis dar.
      Tatsächlich kümmert sich der Algorithmus aber gar nicht um die Person, sondern um den Hintergrund und rechnet alles heraus, was nicht Hintergrund ist.
      siehe https://github.com/jasonmayes/Real-Time-Person-Removal
      <section id="demos" class="invisible">
        <h2>Demo: Webcam live removal</h2>
        <p>Try this out using your webcam. Stand a few feet away from your webcam and start walking around... Watch as you slowly disappear in the bottom preview.</p>

        <div id="liveView" class="webcam">
          <button id="webcamButton">Enable Webcam</button>
          <video id="webcam" autoplay></video>
        </div>
      </section>

      <h3>Gesichter austauschen (face swapping)</h3>(z. B. „voice swapping“) und die als „body-puppetry“ bekannte Übertragung von Körperbewegungen auf andere Personen in Videomaterial
      FakeVideo aus einem einzigen Bild erstellen: https://www.cnet.com/news/samsung-ai-deepfake-can-fabricate-a-video-of-you-from-a-single-photo-mona-lisa-cheapfake-dumbfake/
      Anleitung: https://1e9.community/t/wie-ich-in-nur-zwei-wochen-gelernt-habe-eigene-deepfakes-zu-produzieren/3494
      Änderung einelner Bildelemente: https://www.tagesschau.de/faktenfinder/hintergrund/deep-fakes-101.html
    </div>

    <h3>Mimik eines Videos auf eine Foto animieren</h3>
https://cacm.acm.org/magazines/2020/3/243031-editing-self-image/abstract
    Deep Video Portraits
    https://gvv.mpi-inf.mpg.de/projects/DeepVideoPortraits/
    Averbuch-Elore et al. (2017)
    Convert Audio to speech video: Suwajanakorn et al. (2017)
    Microsoft Azure: Stimme des Theresienstadt-Sprechers als Trainingsdaten nutzen, um selbst Text zu vertonen.
  </div>
</template>


<style>
video {
  clear: both;
  display: block;
}

section {
  opacity: 1;
  transition: opacity 500ms ease-in-out;
}

header,
footer {
  clear: both;
}

button {
  z-index: 1000;
  position: relative;
}

.removed {
  display: none;
}

.invisible {
  opacity: 0.2;
}

.note {
  font-style: italic;
  font-size: 130%;
}

.webcam {
  position: relative;
}

.webcam,
.classifyOnClick {
  position: relative;
  float: left;
  width: 48%;
  margin: 2% 1%;
  cursor: pointer;
}

.webcam p,
.classifyOnClick p {
  position: absolute;
  padding: 5px;
  background-color: rgba(255, 111, 0, 0.85);
  color: #fff;
  border: 1px dashed rgba(255, 255, 255, 0.7);
  z-index: 2;
  font-size: 12px;
}

.highlighter {
  background: rgba(0, 255, 0, 0.25);
  border: 1px dashed #fff;
  z-index: 1;
  position: absolute;
}

.classifyOnClick {
  z-index: 0;
  position: relative;
}

.classifyOnClick canvas,
.webcam canvas.overlay {
  opacity: 1;

  top: 0;
  left: 0;
  z-index: 2;
}

#liveView {
  transform-origin: top left;
  transform: scale(1);
}
</style>

<script>
export default {
  data: () => ({}),
  mounted() {
    const tensorflow = document.createElement("script");
    tensorflow.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"
    );
    tensorflow.async = true;
    document.head.appendChild(tensorflow);

    /*const personRemoval = document.createElement("script");
    personRemoval.setAttribute(
      "src",
      "../js/Real-Time-Person-Removal/script.js"
    );
    personRemoval.async = true;
     document.head.appendChild(personRemoval);
*/
    //this.do();
  },
  methods: {
    do: function() {
      // xxx_ Wait until bodypix will be loaded from tensor flow.

      /* eslint-disable no-plusplus */
      const video = document.getElementById("webcam");
      const liveView = document.getElementById("liveView");
      const demosSection = document.getElementById("demos");
      const DEBUG = false;

      // An object to configure parameters to set for the bodypix model.
      // See github docs for explanations.
      const bodyPixProperties = {
        architecture: "MobileNetV1",
        outputStride: 16,
        multiplier: 0.75,
        quantBytes: 4
      };

      // An object to configure parameters for detection. I have raised
      // the segmentation threshold to 90% confidence to reduce the
      // number of false positives.
      const segmentationProperties = {
        flipHorizontal: false,
        internalResolution: "high",
        segmentationThreshold: 0.9,
        scoreThreshold: 0.2
      };

      // Render returned segmentation data to a given canvas context.
      function processSegmentation(canvas, segmentation) {
        const ctx = canvas.getContext("2d");
        //console.log(segmentation);
        // Get data from our overlay canvas which is attempting to estimate background.
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Get data from the live webcam view which has all data.
        let liveData = videoRenderCanvasCtx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        let dataL = liveData.data;

        let minX = 100000;
        let minY = 100000;
        let maxX = 0;
        let maxY = 0;

        let foundBody = false;

        // Go through pixels and figure out bounding box of body pixels.
        for (let x = 0; x < canvas.width; x++) {
          for (let y = 0; y < canvas.height; y++) {
            const n = y * canvas.width + x;
            // Human pixel found. Update bounds.
            if (segmentation.data[n] !== 0) {
              if (x < minX) {
                minX = x;
              }

              if (y < minY) {
                minY = y;
              }

              if (x > maxX) {
                maxX = x;
              }

              if (y > maxY) {
                maxY = y;
              }
              foundBody = true;
            }
          }
        }

        // Calculate dimensions of bounding box.
        var width = maxX - minX;
        var height = maxY - minY;

        // Define scale factor to use to allow for false negatives around this region.
        var scale = 1.3;

        //  Define scaled dimensions.
        var newWidth = width * scale;
        var newHeight = height * scale;

        // Caculate the offset to place new bounding box so scaled from center of current bounding box.
        var offsetX = (newWidth - width) / 2;
        var offsetY = (newHeight - height) / 2;

        var newXMin = minX - offsetX;
        var newYMin = minY - offsetY;

        // Now loop through update backgound understanding with new data
        // if not inside a bounding box.
        for (let x = 0; x < canvas.width; x++) {
          for (let y = 0; y < canvas.height; y++) {
            // If outside bounding box and we found a body, update background.
            if (
              (foundBody && (x < newXMin || x > newXMin + newWidth)) ||
              y < newYMin ||
              y > newYMin + newHeight
            ) {
              // Convert xy co-ords to array offset.
              let n = y * canvas.width + x;

              data[n * 4] = dataL[n * 4];
              data[n * 4 + 1] = dataL[n * 4 + 1];
              data[n * 4 + 2] = dataL[n * 4 + 2];
              data[n * 4 + 3] = 255;
            } else if (!foundBody) {
              // No body found at all, update all pixels.
              let n = y * canvas.width + x;
              data[n * 4] = dataL[n * 4];
              data[n * 4 + 1] = dataL[n * 4 + 1];
              data[n * 4 + 2] = dataL[n * 4 + 2];
              data[n * 4 + 3] = 255;
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);

        if (DEBUG) {
          ctx.strokeStyle = "#00FF00";
          ctx.beginPath();
          ctx.rect(newXMin, newYMin, newWidth, newHeight);
          ctx.stroke();
        }
      }

      // Let's load the model with our parameters defined above.
      // Before we can use bodypix class we must wait for it to finish
      // loading. Machine Learning models can be large and take a moment to
      // get everything needed to run.
      let modelHasLoaded = false;
      let model;

      model = bodyPix.load(bodyPixProperties).then(function(loadedModel) {
        model = loadedModel;
        modelHasLoaded = true;
        // Show demo section now model is ready to use.
        demosSection.classList.remove("invisible");
      });

      /********************************************************************
// Continuously grab image from webcam stream and classify it.
********************************************************************/

      var previousSegmentationComplete = true;

      // Check if webcam access is supported.
      function hasGetUserMedia() {
        return !!(
          navigator.mediaDevices && navigator.mediaDevices.getUserMedia
        );
      }

      // This function will repeatidly call itself when the browser is ready to process
      // the next frame from webcam.
      function predictWebcam() {
        if (previousSegmentationComplete) {
          // Copy the video frame from webcam to a tempory canvas in memory only (not in the DOM).
          videoRenderCanvasCtx.drawImage(video, 0, 0);
          previousSegmentationComplete = false;
          // Now classify the canvas image we have available.
          model
            .segmentPerson(videoRenderCanvas, segmentationProperties)
            .then(function(segmentation) {
              processSegmentation(webcamCanvas, segmentation);
              previousSegmentationComplete = true;
            });
        }

        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(predictWebcam);
      }

      // Enable the live webcam view and start classification.
      function enableCam(event) {
        if (!modelHasLoaded) {
          return;
        }

        // Hide the button.
        event.target.classList.add("removed");

        // getUsermedia parameters.
        const constraints = {
          video: true
        };

        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
          video.addEventListener("loadedmetadata", function() {
            // Update widths and heights once video is successfully played otherwise
            // it will have width and height of zero initially causing classification
            // to fail.
            webcamCanvas.width = video.videoWidth;
            webcamCanvas.height = video.videoHeight;
            videoRenderCanvas.width = video.videoWidth;
            videoRenderCanvas.height = video.videoHeight;
            bodyPixCanvas.width = video.videoWidth;
            bodyPixCanvas.height = video.videoHeight;
            let webcamCanvasCtx = webcamCanvas.getContext("2d");
            webcamCanvasCtx.drawImage(video, 0, 0);
          });

          video.srcObject = stream;

          video.addEventListener("loadeddata", predictWebcam);
        });
      }

      // We will create a tempory canvas to render to store frames from
      // the web cam stream for classification.
      var videoRenderCanvas = document.createElement("canvas");
      var videoRenderCanvasCtx = videoRenderCanvas.getContext("2d");

      // Lets create a canvas to render our findings to the DOM.
      var webcamCanvas = document.createElement("canvas");
      webcamCanvas.setAttribute("class", "overlay");
      liveView.appendChild(webcamCanvas);

      // Create a canvas to render ML findings from to manipulate.
      var bodyPixCanvas = document.createElement("canvas");
      bodyPixCanvas.setAttribute("class", "overlay");
      var bodyPixCanvasCtx = bodyPixCanvas.getContext("2d");
      bodyPixCanvasCtx.fillStyle = "#FF0000";

      liveView.appendChild(bodyPixCanvas);

      // If webcam supported, add event listener to button for when user
      // wants to activate it.
      if (hasGetUserMedia()) {
        const enableWebcamButton = document.getElementById("webcamButton");
        enableWebcamButton.addEventListener("click", enableCam);
      } else {
        console.warn("getUserMedia() is not supported by your browser");
      }
    }
  }
};
</script>
