export const Tab = ({ children }) => {
    return (
        <div className="w-full p-[12px] border-b-[1px] border-zinc-400 flex">{children}</div>
    )
}

export const TabItem = ({ selected = false, children, ...rest }) => {
    const color = selected ? "text-active" : "text-inactive"
    return (
        <div {...rest} className={`${color} p-[8px] mx-4 font-medium cursor-pointer`}>
            {children}
            {selected &&
                (<div className="w-[85%] h-[2px] mt-[4px] mx-auto bg-active rounded-md"></div>)
            }
        </div>
    )
}
