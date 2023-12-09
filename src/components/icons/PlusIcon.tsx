interface Props {
  size?: 'lg' | 'md';
}

const sizes = {
  lg: '48',
  md: '24',
};

export function PlusIcon({ size = 'md' }: Props) {
  return (
    <svg
      width={sizes[size]}
      height={sizes[size]}
      viewBox={`0 0 24 24`}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM10 6C10 5.44772 10.4477 5 11 5H13C13.5523 5 14 5.44772 14 6V9.50002H17.4995C18.0518 9.50002 18.4995 9.94773 18.4995 10.5V12.5C18.4995 13.0523 18.0518 13.5 17.4995 13.5H14V17C14 17.5523 13.5523 18 13 18H11C10.4477 18 10 17.5523 10 17V13.5H6.49951C5.94723 13.5 5.49951 13.0523 5.49951 12.5V10.5C5.49951 9.94773 5.94723 9.50002 6.49951 9.50002H10V6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default PlusIcon;
