import "./App.scss";
import BUTTON from "./components/button/button.componennt";
import BUTTON2 from "./components/button2/button.componennt2";
import INPUT from "./components/input/input.component";
import { InputBox } from "./components/input_box/input_box.component";
import { useRef } from "react";
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

// toast-configuration method,
// it is compulsory method.
var x = "";
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
      // debugger;
      download.setAttribute("href", image);
    }
    window.location.reload(false);
  };

  //create randome number
  const randomNumber = (number) => {
    // debugger;
    var numbers = [];
    var newNumber;
    for (let i = 0; i < 20; i++) {
      newNumber = Math.floor(Math.random() * number);
      //check dublicate
      if (numbers.indexOf(newNumber) === -1 && newNumber % 4 === 0) {
        numbers[i] = newNumber;
      } else {
        i = i - 1;
      }
    }
    return numbers;
  };

  //check color with 2 color
  const checkColor = (colors, lists, newcolor) => {
    // debugger;

    for (let c = 0; c < colors.length; c += 4) {
      let lowColor;
      switch (lists.length) {
        case 2:
          lowColor = choseGroup(
            [colors[c], colors[c + 1], colors[c + 2]],
            [newcolor[0], newcolor[1]]
          );
          break;
        case 5:
          lowColor = choseGroup(
            [colors[c], colors[c + 1], colors[c + 2]],
            [newcolor[0], newcolor[1], newcolor[2], newcolor[3], newcolor[4]]
          );
          break;
        case 10:
          lowColor = choseGroup(
            [colors[c], colors[c + 1], colors[c + 2]],
            [
              newcolor[0],
              newcolor[1],
              newcolor[2],
              newcolor[3],
              newcolor[4],
              newcolor[5],
              newcolor[6],
              newcolor[7],
              newcolor[8],
              newcolor[9],
            ]
          );
          break;
        case 20:
          lowColor = choseGroup(
            [colors[c], colors[c + 1], colors[c + 2]],
            [
              newcolor[0],
              newcolor[1],
              newcolor[2],
              newcolor[3],
              newcolor[4],
              newcolor[5],
              newcolor[6],
              newcolor[7],
              newcolor[8],
              newcolor[9],
              newcolor[10],
              newcolor[11],
              newcolor[12],
              newcolor[13],
              newcolor[14],
              newcolor[15],
              newcolor[16],
              newcolor[17],
              newcolor[18],
              newcolor[19],
            ]
          );
          break;
        default:
          break;
      }
      let index = newcolor.indexOf(lowColor);
      lists[index].push(colors[c]);
      lists[index].push(colors[c + 1]);
      lists[index].push(colors[c + 2]);
      lists[index].push(colors[c + 3]);
    }
    // debugger;
    return lists;
  };

  //calculate average color in group
  const calculateAverageColor = (colors) => {
    // debugger;
    let R = 0,
      G = 0,
      B = 0,
      count = 0,
      newColor = [];
    for (let i = 0; i < colors.length; i += 4) {
      R = colors[i] + R;
      G = colors[i + 1] + G;
      B = colors[i + 2] + B;
    }
    count = colors.length / 4;
    R = R / count;
    G = G / count;
    B = B / count;
    newColor[0] = R.toFixed();
    newColor[1] = G.toFixed();
    newColor[2] = B.toFixed();
    newColor[3] = 255;
    return newColor;
  };
  Array.min = function (array) {
    return Math.min.apply(Math, array);
  };
  //chose the best group
  const choseGroup = (color, colors) => {
    // debugger;
    let all = [],
      x0,
      y0,
      z0;
    for (let i = 0; i < colors.length; i++) {
      x0 = (color[0] - colors[i][0]) * (color[0] - colors[i][0]);
      y0 = (color[1] - colors[i][1]) * (color[1] - colors[i][1]);
      z0 = (color[2] - colors[i][2]) * (color[2] - colors[i][2]);
      all[i] = Math.sqrt(x0 + y0 + z0);
    }
    let minimum = Array.min(all);
    let index = all.indexOf(minimum);
    return colors[index];
  };

  const createBlackAndWhite = () => {
    debugger;
    if (x === "X") {
      window.location.reload(false);
    }
    x = "X";
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

          // get random numbers
          var randomNum = randomNumber(imgData.data.length);

          //for two color
          //check all color with 2 color
          let list2 = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
          ];
          let color2 = [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
          ];

          // debugger;
          for (let i = 0; i < randomNum.length; i++) {
            color2[i][0] = imgData.data[randomNum[i]];
            color2[i][1] = imgData.data[randomNum[i] + 1];
            color2[i][2] = imgData.data[randomNum[i] + 2];
            color2[i][3] = 255;
          }

          let e = document.getElementById("plan");
          let strUser = e.value;
          switch (strUser) {
            case "2":
              list2 = checkColor(imgData.data, [list2[0], list2[1]], color2);
              break;
            case "5":
              list2 = checkColor(
                imgData.data,
                [list2[0], list2[1], list2[2], list2[3], list2[4]],
                color2
              );
              break;
            case "10":
              list2 = checkColor(
                imgData.data,
                [
                  list2[0],
                  list2[1],
                  list2[2],
                  list2[3],
                  list2[4],
                  list2[5],
                  list2[6],
                  list2[7],
                  list2[8],
                  list2[9],
                ],
                color2
              );
              break;

            case "20":
              list2 = checkColor(
                imgData.data,
                [
                  list2[0],
                  list2[1],
                  list2[2],
                  list2[3],
                  list2[4],
                  list2[5],
                  list2[6],
                  list2[7],
                  list2[8],
                  list2[9],
                  list2[10],
                  list2[11],
                  list2[12],
                  list2[13],
                  list2[14],
                  list2[15],
                  list2[16],
                  list2[17],
                  list2[18],
                  list2[19],
                ],
                color2
              );
              break;

            default:
              break;
          }

          let end = 0;
          while (end < 20) {
            for (let index = 0; index < strUser; index++) {
              color2[index] = calculateAverageColor(list2[index]);
            }

            debugger;
            list2 = [
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
              [],
            ];

            switch (strUser) {
              case "2":
                list2 = checkColor(imgData.data, [list2[0], list2[1]], color2);
                break;
              case "5":
                list2 = checkColor(
                  imgData.data,
                  [list2[0], list2[1], list2[2], list2[3], list2[4]],
                  color2
                );
                break;
              case "10":
                list2 = checkColor(
                  imgData.data,
                  [
                    list2[0],
                    list2[1],
                    list2[2],
                    list2[3],
                    list2[4],
                    list2[5],
                    list2[6],
                    list2[7],
                    list2[8],
                    list2[9],
                  ],
                  color2
                );
                break;

              case "20":
                list2 = checkColor(
                  imgData.data,
                  [
                    list2[0],
                    list2[1],
                    list2[2],
                    list2[3],
                    list2[4],
                    list2[5],
                    list2[6],
                    list2[7],
                    list2[8],
                    list2[9],
                    list2[10],
                    list2[11],
                    list2[12],
                    list2[13],
                    list2[14],
                    list2[15],
                    list2[16],
                    list2[17],
                    list2[18],
                    list2[19],
                  ],
                  color2
                );
                break;

              default:
                break;
            }

            end++;
          }
          let newColor;
          // debugger;
          for (let i = 0; i < imgData.data.length; i += 4) {
            // find low color
            switch (strUser) {
              case "2":
                newColor = choseGroup(
                  [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]],
                  [color2[0], color2[1]]
                );
                break;
              case "5":
                newColor = choseGroup(
                  [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]],
                  [color2[0], color2[1], color2[2], color2[3], color2[4]]
                );
                break;
              case "10":
                newColor = choseGroup(
                  [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]],
                  [
                    color2[0],
                    color2[1],
                    color2[2],
                    color2[3],
                    color2[4],
                    color2[5],
                    color2[6],
                    color2[7],
                    color2[8],
                    color2[9],
                  ]
                );
                break;

              case "20":
                newColor = choseGroup(
                  [imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]],
                  [
                    color2[0],
                    color2[1],
                    color2[2],
                    color2[3],
                    color2[4],
                    color2[5],
                    color2[6],
                    color2[7],
                    color2[8],
                    color2[9],
                    color2[10],
                    color2[11],
                    color2[12],
                    color2[13],
                    color2[14],
                    color2[15],
                    color2[16],
                    color2[17],
                    color2[18],
                    color2[19],
                  ]
                );
                break;

              default:
                break;
            }

            imgData.data[i] = newColor[0];
            imgData.data[i + 1] = newColor[1];
            imgData.data[i + 2] = newColor[2];
            imgData.data[i + 3] = newColor[3];
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
        <InputBox />
        <BUTTON2 text="Create new image" onClick={createBlackAndWhite} />
        <BUTTON text="Download image" onClick={downloadImage} />
        <INPUT onChange={handleChange} />
      </div>
    </div>
  );
}

export default App;
