import './Button.css'

/**
 * Button — componente de botón reutilizable.
 * @param {string}   variant   — 'primary' | 'outline' | 'ghost' | 'light'
 * @param {string}   size      — 'sm' | 'md' | 'lg'
 * @param {boolean}  fullWidth — ocupa 100% del contenedor padre
 */
export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    onClick,
    href,
    target,
    rel,
    type = 'button',
    className = '',
    ...rest
}) {
    const classes = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth ? 'btn--full' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ')

    if (href) {
        return (
            <a href={href} target={target} rel={rel} className={classes} {...rest}>
                {children}
            </a>
        )
    }

    return (
        <button type={type} className={classes} onClick={onClick} {...rest}>
            {children}
        </button>
    )
}
