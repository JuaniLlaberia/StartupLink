export function GitLabLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='64'
      height='64'
      fillRule='evenodd'
      className={className} // <-- Allow external styles
      viewBox='0 0 64 64' // <-- Add viewBox for better scaling
    >
      <path d='M32 61.477L43.784 25.2H20.216z' fill='#e24329' />
      <path d='M32 61.477L20.216 25.2H3.7z' fill='#fc6d26' />
      <path
        d='M3.7 25.2L.12 36.23a2.44 2.44 0 0 0 .886 2.728L32 61.477z'
        fill='#fca326'
      />
      <path
        d='M3.7 25.2h16.515L13.118 3.366c-.365-1.124-1.955-1.124-2.32 0z'
        fill='#e24329'
      />
      <path d='M32 61.477L43.784 25.2H60.3z' fill='#fc6d26' />
      <path
        d='M60.3 25.2l3.58 11.02a2.44 2.44 0 0 1-.886 2.728L32 61.477z'
        fill='#fca326'
      />
      <path
        d='M60.3 25.2H43.784l7.098-21.844c.365-1.124 1.955-1.124 2.32 0z'
        fill='#e24329'
      />
    </svg>
  );
}
