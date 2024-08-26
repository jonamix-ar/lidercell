const SimpleCard = ({ title, children, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-5 flex items-center justify-between border-l-4 border-blue-600">
      <div className="flex flex-col">
        <span className="mb-0 font-sans font-semibold leading-normal uppercase text-slate-700 dark:text-white dark:opacity-60 text-sm">
          {title}
        </span>
        <span className={`text-2xl font-bold text-gray-800`}>{children}</span>
      </div>
      <div className="items-center inline-block w-12 h-12 text-center rounded-circle ">
        {icon}
      </div>
    </div>
  )
}

export default SimpleCard
