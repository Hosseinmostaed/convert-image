import "./button.style.scss";

export default function BUTTON(params) {
  return (
    <div class="container">
      <a id="download" download="triangle.png">
        <button
          class="button"
          id="button2"
          type="button"
          onClick={params.onClick}
        >
          {params.text}
        </button>
      </a>
    </div>
  );
}
