

const Contact = () => {
    return (
        <section>
            <div className='px-4 mx-auto max-w-screen-md'>
                <h2 className='heading text-center '>
                    Contact Us
                </h2>
                <p className='text_para mb-8 lg:mb-16 font-light text-center'
                >Got a technical issue? Let us know.
                </p>
                <form action="#" className='space-y-8'>
                    <div className=''>
                        <label htmlFor='email' className='form_label'>
                            Your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder='example@gmail.com'
                            className='form_input mt-1'
                        />

                    </div>

                    <div className=''>
                        <label htmlFor='subject' className='form_label'>
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            placeholder='Let us know how we can help you'
                            className='form_input mt-1'
                        />

                    </div>

                    <div className='sm:col-span-2'>
                        <label htmlFor='message' className='form_label'>
                            Your Message
                        </label>
                        <textarea
                            rows="6"
                            type="text"
                            id="messgae"
                            placeholder='Leave a comment...'
                            className='form_input mt-1'
                        />

                    </div>
                    <button type='submit' className="btn rounded sm:w-fit">Submit</button>

                </form>
            </div>

        </section>
    )
}

export default Contact
