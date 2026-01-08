import { FormContacts } from "./form-contacts";
import { FormExtra } from "./form-extra";
import { FormPlace } from "./form-place";

type ConfirmFormProps = {
    apply_promo: (event: any) => Promise<void>;
}

export const ConfirmForm = ({ apply_promo }: ConfirmFormProps) => {
    return (
        <div className="ml-[21px] w-[31.125rem] float-left">
            <form className="flex flex-col gap-[46px]">
                <FormContacts />
                <FormPlace />
                <FormExtra apply_promo={apply_promo} />
            </form>
        </div>
    )
}