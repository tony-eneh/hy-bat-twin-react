export function TriangleIcon({
  classes,
  expanded,
}: {
  classes?: string;
  expanded?: boolean;
}) {
  return (
    <div
      className={`h-0 w-0 border-l-[6px] border-y-[6px] border-y-transparent border-l-highlight transition-transform ${classes} ${
        expanded ? 'rotate-90' : 'rotate-0'
      }`}
    ></div>
  );
}
