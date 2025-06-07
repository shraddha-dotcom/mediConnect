import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItems = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div
            className={`p-4 lg:p-6 rounded-lg border border-solid transition-colors duration-300
      cursor-pointer mb-5 
      ${isOpen ? "border-primaryColor bg-primaryColor/10" : "border-gray-300 bg-white"}
      hover:border-primaryColor hover:bg-primaryColor/5`}
            onClick={toggle}
            aria-expanded={isOpen}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle()}
        >
            <div className="flex items-center justify-between gap-5">
                <h4 className="text-lg lg:text-xl font-semibold text-headingColor">
                    {item.question}
                </h4>
                <div
                    className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center 
            border transition-colors duration-300 
            ${isOpen ? "bg-primaryColor text-white border-primaryColor" : "border-gray-400 text-primaryColor"}
          `}
                >
                    {isOpen ? <AiOutlineMinus size={20} /> : <AiOutlinePlus size={20} />}
                </div>
            </div>
            {isOpen && (
                <div className="mt-4">
                    <p className="text-base lg:text-lg font-normal text-textColor leading-relaxed">
                        {item.content}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FaqItems;









