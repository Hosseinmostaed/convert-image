import "./button.style.scss";

export default function BUTTON2(params) {
  return (
    <div class="container">
      <button class="button" onClick={params.onClick}>
        {params.text}
      </button>
    </div>
  );
}
