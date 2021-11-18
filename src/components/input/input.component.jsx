import "./input.style.scss";

export default function INPUT(params) {
  return (
    <div class="container">
      <input type="file" id="file" class="file" onChange={params.onChange} />
      <label for="file" class="button">
        Select file
      </label>
    </div>
  );
}
