const GeneralCard = ({ title, children, className, button }) => {
  return (
    <div className="rounded-[10px] shadow-custom border border-stroke bg-white shadow-default dark:border-[#24303f] dark:bg-[#24303f]">
      <div className="border-b border-[#f9f9f9] py-2.5 px-4 dark:border-[#24303f] flex items-center justify-between">
        <h4 className="text-md font-semibold text-black dark:text-white">
          {title}
        </h4>
        {button}
      </div>
      <div className={className}>{children}</div>
    </div>
  )
}

export default GeneralCard
