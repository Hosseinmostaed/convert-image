import "./App.scss";
import BUTTON from "./components/button/button.componennt";
import BUTTON2 from "./components/button2/button.componennt2";
import INPUT from "./components/input/input.component";
import { useRef } from "react";
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,
// it is compulsory method.
toast.configure();

function App() {
  const imgRef = useRef();
  const ctxRef = useRef();

  const clear = () => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
  };

  const handleChange = (e) => {
    debugger;
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file !== undefined) {
      const data = reader.readAsArrayBuffer(file);

      reader.onloadend = (evt) => {
        const bytes = new Uint8Array(evt.target.result);
        const blob = new Blob([bytes.buffer]);

        reader.onloadend = (e) => {
          imgRef.current.style.display = "block";
          ctxRef.current.style.display = "none";
          clear();
          imgRef.current.src = e.target.result;
        };
        reader.readAsDataURL(blob);
      };
    }
  };

  const downloadImage = () => {
    debugger;
    var download = document.getElementById("download");
    var image = document
      .getElementById("myCanvas")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    if (
      document.getElementById("myCanvas").style.display === "" ||
      document.getElementById("myCanvas").style.display === "none"
    ) {
      toast("Please add your image and click on 'Create gray image'");
      download.removeAttribute("href");
    } else {
      debugger;
      download.setAttribute("href", image);
    }
  };
  const createBlackAndWhite = () => {
    debugger;
    if (imgRef.current) {
      const img = imgRef.current;
      const canvas = ctxRef.current;

      if (img.width !== 0) {
        canvas.width = img.width;
        canvas.height = img.height;

        if (canvas.width > 0 && canvas.height > 0) {
          const ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          for (let i = 0; i < imgData.data.length; i += 4) {
            let count =
              imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
            let color = 0;
            if (count > 510) color = 255;
            else if (count > 255) color = 127.5;

            imgData.data[i] = color;
            imgData.data[i + 1] = color;
            imgData.data[i + 2] = color;
            imgData.data[i + 3] = 255;
          }

          ctx.putImageData(imgData, 0, 0);
          ctxRef.current.style.display = "block";
          img.style.display = "none";
          img.src = "";
        }
      }
    }
  };

  return (
    <div className="row">
      <div className="column">
        <img src="" ref={imgRef} alt="" />
        <canvas id="myCanvas" ref={ctxRef} />
      </div>
      <div className="column">
        <BUTTON2 text="Create gray image" onClick={createBlackAndWhite} />
        <BUTTON text="Download image" onClick={downloadImage} />
        <INPUT onChange={handleChange} />
      </div>
    </div>
  );
}

export default App;
