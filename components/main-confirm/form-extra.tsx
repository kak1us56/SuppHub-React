export function FormExtra() {
    return (
        <div className="flex flex-col">
            <h2 className="leading-cssnormal text-white tracking-[2.24px] text-[2rem] font-semibold">
                3. Додаткові дані
            </h2>
            <div className="flex flex-col pt-[35px] gap-[10px]">
                <p className="text-[1.25rem]/[20px] pl-[9px] tracking-[1.4px] font-medium text-white">
                    Коментарій
                </p>
                <textarea name="comment"
                    className="w-[26.4375rem] h-[6.0625rem] rounded-[5px] bg-[#494949] pl-[11px] pt-2 text-[1.25rem]/[20px]
                        tracking-[1.4px] text-white outline-none resize-y">

                </textarea>
            </div>
            <div className="pt-[43px] pl-[23px]">
                <input type="checkbox" id="checkbox"
                    className="hidden confirm__checkbox" />
                <label htmlFor="checkbox" className="confirm__label-callme text-white">
                    <span>
                        Не дзвонити для <br />
                        підтвердження замовлення
                    </span>
                </label>
            </div>
        </div>
    )
}