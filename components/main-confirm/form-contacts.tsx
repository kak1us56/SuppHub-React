export function FormContacts() {
    return (
        <div className="flex flex-col">
            <h2 className="leading-cssnormal text-white tracking-[2.24px] text-[2rem] font-semibold">
                1. Контактні дані
            </h2>
            <div className="flex flex-col gap-[18px] pt-8">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-[10px]">
                        <label htmlFor="inputName"
                            className="text-[1.25rem]/[20px] pl-[9px] tracking-[1.4px] font-medium text-white">
                            Ім’я*
                        </label>
                        <input type="text"
                            id="inputName" 
                            className="w-[12.5rem] h-[2.75rem] rounded-[5px] bg-[#494949] pl-[11px] text-white
                                text-[1.25rem]/[20px] tracking-[1.4px] border-0 outline-none font-medium" />
                    </div>
                    <div className="flex flex-col gap-[10px] w-[17.1875rem]">
                        <label htmlFor="inputVorname"
                            className="text-[1.25rem]/[20px] pl-[9px] tracking-[1.4px] font-medium text-white">
                            Прізвище*
                        </label>
                        <input type="text"
                            id="inputVorname" 
                            className="w-[17.1875rem] h-[2.75rem] rounded-[5px] bg-[#494949] pl-[11px] text-white
                                text-[1.25rem]/[20px] tracking-[1.4px] border-0 outline-none font-medium" />
                    </div>
                </div>
                <div className="flex flex-col gap-[10px]">
                    <label htmlFor="inputTel"
                        className="text-[1.25rem]/[20px] pl-[9px] tracking-[1.4px] font-medium text-white">
                        Номер телефону*
                    </label>
                    <input type="tel"
                        id="inputTel" 
                        className="w-[31.125rem] h-[2.75rem] rounded-[5px] bg-[#494949] pl-[11px] text-white
                            text-[1.25rem]/[20px] tracking-[1.4px] border-0 outline-none font-medium" />
                </div>
            </div>
        </div>
    )
}