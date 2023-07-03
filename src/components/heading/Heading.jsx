
export default function Heading({ h3, h4, children }) {
  // mx-auto border-b w-11/12 flex flex-col md:gap-4 md:px-4 md:h-3/25 md:flex-row md:items-center lg:h-1/10
  return (
    <div className="w-11/12 h-3/20 px-4 mx-auto flex items-center justify-between border-b md:h-3/25 lg:h-1/10">
      <div className="card__heading">
        <h3 className="font-semibold text-xl">
            {h3}
        </h3>
      </div>
      { children }
    </div>
  )
}
