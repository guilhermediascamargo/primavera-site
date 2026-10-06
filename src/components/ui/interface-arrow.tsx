type Direction =
  | "right"
  | "left"
  | "up"
  | "down"
  | "up-right"
  | "down-right"
  | "up-left"
  | "down-left"
  | "clockwise";

const angles = {
  right: 0,
  left: 180,
  up: -90,
  down: 90,
  "up-right": -45,
  "down-right": 45,
  "up-left": -135,
  "down-left": 135,
} as const;

/** Ícone decorativo vetorial; o nome acessível pertence ao link/controle. */
export default function InterfaceArrow({
  direction = "up-right",
}: {
  direction?: Direction;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{
        display: "inline-block",
        verticalAlign: "-0.125em",
        flexShrink: 0,
      }}
    >
      {direction === "clockwise" ? (
        <path d="M20 11a8 8 0 1 0-2.3 6.1M20 4v7h-7" />
      ) : (
        <path
          d="M4 12h16M14 6l6 6-6 6"
          transform={`rotate(${angles[direction]} 12 12)`}
        />
      )}
    </svg>
  );
}
