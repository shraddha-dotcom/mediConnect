import formateDate from "./formateDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {


    return (
        <div>
            <div>
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
                    About of
                    <span className="text-irisBlueColor font-bold text-[24px] leading-9 ml-2">
                        {name}
                    </span>
                </h3>
                <p className="text_para mt-2">{about}</p>
            </div>

            {/* Qualification Section */}
            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
                    Education
                </h3>
                <ul className="pt-4 md:p-5">
                    {qualifications?.length > 0 ? (
                        qualifications.map((item, index) => (
                            <li
                                key={index}
                                className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
                            >
                                <div>
                                    <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                                        {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                                    </span>
                                    <p className="text-[16px] leading-6 font-medium text-textCOlor">
                                        {item.degree}
                                    </p>
                                </div>
                                <p className="text-[14px] leading-5 font-medium text-textCOlor">
                                    {item.university}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No qualifications listed.</p>
                    )}
                </ul>
            </div>

            {/* Experience Section */}
            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
                    Experience
                </h3>
                <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                    {experiences?.length > 0 ? (
                        experiences.map((item, index) => (
                            <li key={index} className="p-4 rounded bg-[#fff9ea]">
                                <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                                    {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                                </span>
                                <p className="text-[16px] leading-6 font-medium text-textCOlor">
                                    {item.position}
                                </p>
                                <p className="text-[14px] leading-5 font-medium text-textCOlor">
                                    {item.hospital}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No experiences listed.</p>
                    )}
                </ul>
            </div>
        </div >

    );
};

export default DoctorAbout;






























