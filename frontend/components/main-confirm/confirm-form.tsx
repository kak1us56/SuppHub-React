import { FormContacts } from "./form-contacts";
import { FormExtra } from "./form-extra";
import { FormPlace } from "./form-place";

type ConfirmFormProps = {
    apply_promo: (event: any, setResponse: (res: any) => void) => Promise<void>;
}

export const ConfirmForm = ({ apply_promo }: ConfirmFormProps) => {
    return (
        <div className="ml-[21px] w-[31.125rem] max-sm:ml-0 max-sm:w-full">
            <form className="flex flex-col gap-[46px] max-sm:gap-[16px]">
                <FormContacts />
                <FormPlace />
                <FormExtra apply_promo={apply_promo} />
            </form>
        </div>
    )
}