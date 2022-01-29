export default function Cell({ value, columnIndex, play }: any) {
  let color = "white";
  if (value === 1) {
    color = "red";
  } else if (value === 2) {
    color = "yellow";
  }

  return (
    <td>
      <div
        className={`cell`}
        onClick={() => {
          play(columnIndex);
        }}
      >
        <div className={`${color} flex justify-center items-center`}>
          <div
            className={`${
              color !== "white"
                ? "bg-slate-900 bg-opacity-10 rounded-full w-8 h-8"
                : ""
            }`}
          ></div>
        </div>
      </div>
    </td>
  );
}
