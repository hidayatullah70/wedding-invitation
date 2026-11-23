const VARIANT_CLASSES = {
  primary:
    'bg-rose text-white hover:bg-rose-dark active:bg-rose-dark disabled:bg-blush disabled:text-ink/50',
  secondary:
    'border border-champagne bg-white text-ink hover:border-rose hover:text-rose-dark active:bg-blush-soft disabled:opacity-50',
  ghost:
    'text-ink hover:bg-blush-soft hover:text-rose-dark active:bg-blush/30 disabled:opacity-50',
};

const SIZE_CLASSES = {
  sm: 'min-h-10 px-4 py-2 text-xs sm:text-sm',
  md: 'min-h-11 px-6 py-2.5 text-sm',
  lg: 'min-h-12 px-8 py-3 text-sm sm:text-base',
};

export function Button({
  as = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  children,
  ...props
}) {
  const baseClass =
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose';
  const classes = `${baseClass} ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary} ${
    SIZE_CLASSES[size] || SIZE_CLASSES.md
  } ${className}`;

  if (as === 'a') {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
