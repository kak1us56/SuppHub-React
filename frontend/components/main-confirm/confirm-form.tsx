import { FormContacts } from "./form-contacts";
import { FormExtra } from "./form-extra";
import { FormPlace } from "./form-place";

type ConfirmFormProps = {
    apply_promo: (event: any) => Promise<void>;
}

export const ConfirmForm = ({ apply_promo }: ConfirmFormProps) => {
    return (
        <div className="ml-[21px] w-[31.125rem] float-left max-md:float-none max-md:ml-0 max-md:w-full">
            <form className="flex flex-col gap-[46px] max-md:gap-[16px]">
                <FormContacts />
                <FormPlace />
                <FormExtra apply_promo={apply_promo} />
            </form>
        </div>
    )
}