const Wrapper = ({ children }) => {
    return (
        <div className="w-3/4 min-h-[500px] bg-bg mx-auto mt-24 rounded-md border-[1px] border-zinc-600">
            {children}
        </div>
    )
}

export default Wrapper;
