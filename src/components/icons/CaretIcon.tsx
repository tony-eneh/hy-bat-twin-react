export function CaretIcon({ direction = 'up' }: { direction?: 'up' | 'down' }) {
  return (
    <div
      className={`h-2 w-2 border-2 border-t-current border-r-current border-b-transparent border-l-transparent ${
        direction === 'up'
          ? '-rotate-45 translate-y-[.125rem]'
          : 'rotate-[135deg] -translate-y-[.125rem]'
      }`}
    ></div>
  );
}
