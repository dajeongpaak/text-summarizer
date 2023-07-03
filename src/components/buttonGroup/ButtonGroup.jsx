
export default function ButtonGroup({ children, styles }) {
  return (
    <div className={`w-11/12 h-3/20 mx-auto border-t md:h-3/25 flex ${styles}`}>
        {children}
    </div>
  )
}
