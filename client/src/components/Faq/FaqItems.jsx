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









// import { useState } from "react";
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// const FaqItems = ({ item }) => {

//     const [isOpen, setIsOpen] = useState(false);

//     const toggle = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <div className='p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2]
//         mb-5 cursor-pointer'>
//             <div className='flex items-center justify-between gap-5' onClick={toggle}>
//                 <h4 className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor'>
//                     {item.question}
//                 </h4>
//                 <div className={`${isOpen && "bg-primaryColor text-white border-none"
//                     } w-7 h-7 lg:w-8 lg:h-8 border border-solid
//                 border-[#141F21] rounded flex items-center justify-center`}
//                 >
//                     {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}

//                 </div>


//             </div>
//             {isOpen && (
//                 <div className="mt-4">
//                     <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textCOlor">
//                         {item.content}
//                     </p>
//                 </div>
//             )}

//         </div>
//     )
// }

// export default FaqItems
