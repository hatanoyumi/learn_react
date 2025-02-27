// function FilterButton() {
//   return (
//     <button type="button" className="btn toggle-btn" aria-pressed="true">
//       <span className="visually-hidden">Show </span>
//       <span>all </span>
//       <span className="visually-hidden"> tasks</span>
//     </button>
//   );
// }
function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}>
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
