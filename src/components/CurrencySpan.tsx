const CurrencySpan = ({
  quantity = 0,
  className,
  ...rest
}: {
  quantity?: number | string
  className?: string
}) => {
  return (
    <span {...rest} className={className}>
      {new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
      }).format(parseFloat(`${quantity || 0}`))}{' '}
    </span>
  )
}

export default CurrencySpan
