export function FormPlace() {
    return (
        <div className="flex flex-col">
            <h2 className="leading-cssnormal tracking-[2.24px] text-[2rem] text-white font-semibold">
                2. Дані для доставки
            </h2>
            <div className="flex flex-col pt-7 gap-[21px]">
                <div className="flex justify-between items-center">
                    <p className="text-[1.25rem]/[20px] tracking-[1.4px] text-white pl-[9px] font-medium">
                        Область*
                    </p>
                    <select name="region"
                        className="rounded-[5px] bg-[#494949] w-[17.1875rem] h-[2.75rem] border-0 text-white
                            text-[1.25rem]/[20px] tracking-[1.4px] pl-[11px] outline-none cursor-pointer">

                    </select>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[1.25rem]/[20px] tracking-[1.4px] text-white pl-[9px] font-medium">
                        Місто*
                    </p>
                    <select name="town"
                        className="rounded-[5px] bg-[#494949] w-[17.1875rem] h-[2.75rem] border-0 text-white
                            text-[1.25rem]/[20px] tracking-[1.4px] pl-[11px] outline-none cursor-pointer">

                    </select>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[1.25rem]/[20px] tracking-[1.4px] text-white pl-[9px] font-medium">
                        Відділення НП*
                    </p>
                    <select name="post"
                        className="rounded-[5px] bg-[#494949] w-[17.1875rem] h-[2.75rem] border-0 text-white
                            text-[1.25rem]/[20px] tracking-[1.4px] pl-[11px] outline-none cursor-pointer">

                    </select>
                </div>
            </div>
            <p className="text-[1rem] leading-cssnormal pt-[23px] pl-[11px] text-white font-normal">
                Доставка відбувається виключно Новою Поштою <br />
                та накладеним платежем!
            </p>
        </div>
    )
}