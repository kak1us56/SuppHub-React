import { FormContacts } from "./form-contacts";
import { FormExtra } from "./form-extra";
import { FormPlace } from "./form-place";

export function ConfirmForm() {
    return (
        <div className="ml-[21px] w-[31.125rem] float-left">
            <form className="flex flex-col gap-[46px]">
                <FormContacts />
                <FormPlace />
                <FormExtra />
            </form>
        </div>
    )
}