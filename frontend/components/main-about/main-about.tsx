import Image from "next/image";
import Link from "next/link";

import { Handjet } from "next/font/google";
import { useRouter } from "next/router";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export const MainAbout = () => {
    const router = useRouter();

    return (
        <main>
            <div className="min-h-[1216px] bg-[#1F1F1F] mt-20 max-sm:mt-[48px] bg-repeat bg-pill bg-[length:250px] max-sm:bg-[length:130px]">
                <div className="max-w-[1312px] max-sm:max-w-[382px] mx-auto px-4 flex flex-col items-center">
                    <Link href="/" className="self-start">
                        <p className="text-white text-[28px] leading-cssnormal font-normal tracking-[2.24px] pt-[60px] max-sm:text-[0.875rem] max-sm:pt-[17px]">
                            ← На головну
                        </p>
                    </Link>
                    <h1 className={`${handjet.className} max-sm:text-[2rem] text-[4rem] leading-cssnormal text-[#D9D9D9] tracking-[5.12px] pt-[60px] max-sm:pt-[20px] pl-[32px] max-sm:pl-5 font-medium self-start`}>
                        Про нас
                    </h1>
                    <div className="w-full bg-[rgba(0,_0,_0,_0.35)] max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:bg-transparent max-sm:p-0 rounded-[24px] px-[50px] pt-[28px] pb-[40px] mt-[22px]">
                        <section className="text-[1.625rem]/[2.25rem] max-sm:text-[1rem]/[1.125rem] max-lg:text-[1.4rem]/[1.75rem] max-sm:p-4 text-justify font-normal text-white max-sm:bg-[#343434] max-sm:rounded-[18px] max-sm:w-full">
                            <h3 className="font-bold">Ми — SuppHub.</h3>
                            <p className="mb-8 max-sm:mb-4">
                                Ми не просто інтернет-магазин вітамінів, ми твій компаньйон у світі дедлайнів, інтенсивного навчання та великих амбіцій.
                            </p>
                            <ol className="list-decimal list-inside mb-8 max-sm:mb-4 marker:font-bold">
                                <li><strong>Наша мета</strong> — допомогти тобі бути продуктивним, бадьорим і не вигоріти.</li>
                                <li><strong>Наша місія</strong> — розблокувати твій потенціал.</li>
                            </ol>
                            <p className="mb-8 max-sm:m-0">
                                Ми підбираємо амінокислоти, ноотропи, нутрицевтики та вітамінні комплекси, які реально працюють. Наша продуктова лінійка створена для покращення пам’яті, фокусу, енергії без «відкату» та підтримки імунітету.
                            </p>
                        </section>
                        <section className="flex justify-between mb-8 max-sm:m-0 max-sm:flex-col max-sm:gap-4">
                            <div className="text-[1.625rem]/[2.25rem] max-lg:text-[1.4rem]/[1.75rem] text-justify max-sm:text-[1rem]/[1.125rem] max-sm:w-full max-sm:p-4 max-sm:bg-[#494949] max-sm:rounded-[18px] max-sm:border-none font-normal text-white w-[50%] border-r-[1px] border-r-white pr-8">
                                <h4 className="font-bold">Що ми пропонуємо</h4>
                                <ul className="list-outside list-disc marker:text-[0.7em] pl-9 max-sm:pl-5 flex flex-col justify-between h-[calc(100%_-_36px)]">
                                    <li>Ноотропи для фокусу та пам’яті.</li>
                                    <li>Амінокислоти для відновлення та мотивації.</li>
                                    <li>Енергетичні добавки без «провалів» після дії.</li>
                                    <li>Магній - комплекси для кращого сну.</li>
                                    <li>Вітаміни для підтримки імунітету.</li>
                                </ul>
                            </div>
                            <div className="text-[1.625rem]/[2.25rem] max-lg:text-[1.4rem]/[1.75rem] font-normal text-justify text-white w-[50%] pl-8 max-sm:text-[1rem]/[1.125rem] max-sm:w-full max-sm:p-4 max-sm:bg-[#343434] max-sm:rounded-[18px]">
                                <h4 className="font-bold">Чому обирають SuppHub</h4>
                                <ul className="list-outside list-disc marker:text-[0.7em] pl-9 max-sm:pl-5 flex flex-col justify-between h-[calc(100%_-_36px)]">
                                    <li>Біодоступні форми та підтверджені компоненти.</li>
                                    <li>Науковий підхід без обіцянок «магії».</li>
                                    <li>Підходить для студентів, спортсменів і тих, хто поєднує кар’єру з активним життям.</li>
                                    <li>Швидка доставка та підтримка</li>
                                </ul>
                            </div>
                        </section>
                        <section className="max-sm:bg-[#494949] max-sm:rounded-[18px] max-sm:p-4">
                            <div className="text-[1.625rem]/[2.25rem] max-lg:text-[1.4rem]/[1.75rem] text-justify font-normal text-white mb-8 max-sm:mb-4 max-sm:text-[1rem]/[1.125rem]">
                                <h4 className="font-bold">SuppHub  для тих, хто:</h4>
                                <ul className="list-outside list-disc marker:text-[0.7em] pl-9 max-sm:pl-5">
                                    <li>готується до іспитів або важливого захисту;</li>
                                    <li>поєднує роботу з тренуваннями;</li>
                                    <li>хоче відчувати бадьорість та швидкість мислення цілодобово;</li>
                                    <li>цінує якість і науковий підхід до свого здоров’я.</li>
                                </ul>
                            </div>
                            <div className="text-[1.625rem]/[2.25rem] max-lg:text-[1.4rem]/[1.75rem] text-justify font-normal text-white mb-8 max-sm:mb-4 max-sm:text-[1rem]/[1.125rem]">
                                <h4 className="font-bold">Наш підхід</h4>
                                <p>
                                    Кожен продукт у каталозі - результат відбору по критеріях якості, безпеки та ефективності.<br />
                                    <strong>Кожна позиція - перевірена особисто нами</strong> на практиці. <br />
                                    Ми працюємо з перевіреними постачальниками й обираємо форми з високою біодоступністю.
                                </p>
                            </div>
                            <div className="text-[1.625rem]/[2.25rem] max-lg:text-[1.4rem]/[1.75rem] text-justify font-normal text-white mb-4 max-sm:m-0 max-sm:text-[1rem]/[1.125rem]">
                                <h4 className="font-bold">Готовий увімкнути режим суперсили?</h4>
                                <p>
                                    Почни з нашого бестселера або проконсультуйся з нами — підберемо добавку під твої цілі. <br />
                                    Купити якісні добавки в інтернет-магазині SuppHub — просто.                                    
                                </p>
                            </div>
                        </section>
                    </div>
                    <button 
                        className="w-[12.375rem] h-[2.9rem] bg-[#F90] rounded-[4px] text-center text-black text-[1.25rem] max-sm:text-[1.125rem] leading-cssnormal tracking-[1.6px] font-medium mt-[34px] max-sm:mt-[24px]"
                        onClick={() => router.push("/#catalog")}>
                        До каталогу
                    </button>
                    <div className="pt-8 pb-9 max-sm:w-[60px] max-sm:pt-5 max-sm:pb-6">
                        <Image src="/logo-img.png" alt="Логотип SuppHub" width={82} height={82} />
                    </div>
                </div>
            </div>
        </main>
    )
}