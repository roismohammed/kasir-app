export function PageTitle({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div>
      <p className="text-[20px] geist font-bold">{title}</p>
      {subtitle && <p className="text-gray-500 text-sm ">{subtitle}</p>}
    </div>
  )
}
