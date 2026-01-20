import Image from "next/image";
import Link from "next/link";

import { Handjet } from "next/font/google";
const handjet: any = Handjet({
  subsets: ["latin", "cyrillic"],
});

export const MainAbout = () => {
    return (
        <main>
            <div className="min-h-[1216px] bg-[#1F1F1F] mt-20 max-md:mt-[48px] bg-repeat bg-pill bg-[length:250px] max-md:bg-[length:130px]">
                <div className="max-w-[1312px] max-md:max-w-[352px] mx-auto px-4 flex flex-col items-center">
                    <h1 className={`${handjet.className} text-[4rem] leading-cssnormal text-[#D9D9D9] tracking-[5.12px] pt-[53px] pl-[32px] font-medium self-start`}>
                        Про нас
                    </h1>
                    <div className="w-full bg-[rgba(0,_0,_0,_0.35)] rounded-[24px] px-[50px] pt-[28px] pb-[40px] mt-[22px]">
                        <section className="text-[1.625rem]/[2.25rem] font-normal text-white">
                            <h3 className="font-bold">Ми — SuppHub.</h3>
                            <p className="mb-8">
                                Ми не просто інтернет-магазин вітамінів, ми твій компаньйон у світі дедлайнів, інтенсивного навчання та великих амбіцій.
                            </p>
                            <ol className="list-decimal list-inside mb-8">
                                <li>Наша мета — допомогти тобі бути продуктивним, бадьорим і не вигоріти.</li>
                                <li>Наша місія — розблокувати твій потенціал.</li>
                            </ol>
                            <p className="mb-6">
                                Ми підбираємо амінокислоти, ноотропи, нутрицевтики та вітамінні комплекси, які реально працюють. Наша продуктова лінійка створена для покращення пам’яті, фокусу, енергії без «відкату» та підтримки імунітету.
                            </p>
                        </section>
                        <section className="flex justify-between mb-8">
                            <div className="text-[1.625rem]/[2.25rem] font-normal text-white w-[50%] border-r-[1px] border-r-white pr-4">
                                <h4 className="font-bold">Що ми пропонуємо</h4>
                                <ul className="list-inside list-disc marker:text-[0.7em] pl-4 flex flex-col justify-between h-[calc(100%_-_36px)]">
                                    <li>Ноотропи для фокусу та пам’яті.</li>
                                    <li>Амінокислоти для відновлення та мотивації.</li>
                                    <li>Енергетичні добавки без «провалів» після дії.</li>
                                    <li>Магній -комплекси для кращого сну.</li>
                                    <li>Вітаміни для підтримки імунітету.</li>
                                </ul>
                            </div>
                            <div className="text-[1.625rem]/[2.25rem] font-normal text-white w-[50%] pl-8">
                                <h4 className="font-bold">Чому обирають SuppHub</h4>
                                <ul className="list-inside list-disc marker:text-[0.7em] pl-4 flex flex-col justify-between h-[calc(100%_-_36px)]">
                                    <li>Біодоступні форми та підтверджені компоненти.</li>
                                    <li>Науковий підхід без обіцянок «магії».</li>
                                    <li>Підходить для студентів, спортсменів і тих, хто поєднує кар’єру з активним життям.</li>
                                    <li>Магній -комплекси для кращого сну.</li>
                                    <li>Швидка доставка та підтримка</li>
                                </ul>
                            </div>
                        </section>
                        <section>
                            <div className="text-[1.625rem]/[2.25rem] font-normal text-white mb-8">
                                <h4 className="font-bold">SuppHub  для тих, хто:</h4>
                                <ul className="list-inside list-disc marker:text-[0.7em] pl-4">
                                    <li>готується до іспитів або важливого захисту;</li>
                                    <li>поєднує роботу з тренуваннями;</li>
                                    <li>хоче відчувати бадьорість та швидкість мислення цілодобово;</li>
                                    <li>цінує якість і науковий підхід до свого здоров’я.</li>
                                </ul>
                            </div>
                            <div className="text-[1.625rem]/[2.25rem] font-normal text-white mb-8">
                                <h4 className="font-bold">Наш підхід</h4>
                                <p>
                                    Кожен продукт у каталозі - результат відбору по критеріях якості, безпеки та ефективності.<br />
                                    <strong>Кожна позиція - перевірена особисто нами</strong> на практиці. <br />
                                    Ми працюємо з перевіреними постачальниками й обираємо форми з високою біодоступністю.
                                </p>
                            </div>
                            <div className="text-[1.625rem]/[2.25rem] font-normal text-white mb-8">
                                <h4 className="font-bold">Готовий увімкнути режим суперсили?</h4>
                                <p>
                                    Почни з нашого бестселера або проконсультуйся з нами — підберемо добавку під твої цілі. <br />
                                    Купити якісні добавки в інтернет-магазині SuppHub — просто.                                    
                                </p>
                            </div>
                        </section>
                    </div>
                    <Link href={"/"}>
                        <button className="w-[15.375rem] h-[3.25rem] bg-[#F90] rounded-[4px] text-center text-black text-[20px] leading-cssnormal tracking-[1.6px] font-medium mt-[34px]">
                            До каталогу
                        </button>                    
                    </Link>
                    <div className="pt-8 pb-9">
                        <Image src="/logo-img.png" alt="Логотип" width={82} height={82} />
                    </div>
                </div>
            </div>
        </main>
    )
}