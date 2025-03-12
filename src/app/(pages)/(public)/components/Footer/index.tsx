// Indica que este é um componente do lado do servidor no Next.js (App Router)
"use server";

export default async function Footer() {
    const divColumnsClassName = "flex flex-col gap-1 text-[17px] sm:text-md";
    const h1ClassName = "font-bold"
    const h2ClassName = ""

    return (
      <footer className="text-white w-full h-auto bg-[#141414] flex flex-col items-center justify-between p-5">
        <div className="w-full flex flex-row items-start justify-between sm:justify-evenly px-5 text-white mb-4">
            <div className={divColumnsClassName}>
                <h1 className={h1ClassName}>
                    Services
                </h1>
                <h2 className={h2ClassName}>
                    Home
                </h2>
                <h2 className={h2ClassName}>
                    Check Flights
                </h2>
            </div>
            <div className={divColumnsClassName}>
                <h1 className={h1ClassName}>
                    Contact
                </h1>
                <h2 className={h2ClassName}>
                    Email: email@email
                </h2>
                <h2 className={h2ClassName}>
                    Phone: 4599999999
                </h2>
            </div>
            <div className={divColumnsClassName}>
                <h1 className={h1ClassName}>
                    Discover
                </h1>
                <h2 className={h2ClassName}>
                    About Us
                </h2>
                <h2 className={h2ClassName}>
                    What Drives Us
                </h2>
            </div>
            <div className={divColumnsClassName}>
                <h1 className={h1ClassName}>
                    Support
                </h1>
                <h2 className={h2ClassName}>
                    Terms of Services
                </h2>
                <h2 className={h2ClassName}>
                    Privacy Policy
                </h2>
            </div>
        </div>
        <div className="">
            © 2025 Houston SmarTravel
        </div>
      </footer>
    );
}
