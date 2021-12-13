import "./input_box.style.css";
export const InputBox = (props) => (
  <div>
    <p>Enter your number of box</p>
    <input type="number" autocomplete="off" id="enterInput" className="text" />
  </div>
);
