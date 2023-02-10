const Wrapper = ({ children }) => {
    return (
        <div className="w-full h-[700px] bg-bg mx-auto mt-6 rounded-md border-[1px] border-zinc-600 overflow-y-scroll">
            {children}
        </div>
    )
}

export default Wrapper;
