import "./input_box.style.css";
export const InputBox = (props) => (
  <div>
    <p>Enter your number of box</p>
    {/* <input type="number" autocomplete="off" id="enterInput" className="text" /> */}
    <select name="2" id="plan">
      <option value="2">2</option>
      <option value="5">5</option>
      <option value="10" selected>
        10
      </option>
      <option value="20">20</option>
    </select>
  </div>
);
