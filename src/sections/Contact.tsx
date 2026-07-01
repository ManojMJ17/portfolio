'use client';

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('Missing EmailJS environment variables');
    }

    emailjs.sendForm(serviceId, templateId, form.current!, publicKey).then(
      () => {
        toast.success('Thanks for reaching out.', {
          description: "I'll get back to you as soon as possible.",
          duration: 1000,
        });

        form.current?.reset();
      },
      (error) => {
        toast.error('Something went wrong, try again!');
        console.error(error.text);
      },
    );
  };

  return (
    <div id='contact' className='mt-[20%] lg:-mt-[20%] xl:-mt-[12%]'>
      <div className='w-full flex justify-center'>
        <div
          className='p-8 w-[90%]
bg-gradient-to-b from-stone-900 from- via-stone-800 via- to-stone-700 to-
rounded-lg flex flex-col gap-10 md:p-10 xl:p-16'
        >
          <div className='xl:mx-[18%]'>
            <h1 className='uppercase text-background font-mmedium font-semibold text-[14vw] text-center leading-none md:text-[10vw] md:px-20 md:text-center xl:text-[8vw] xl:tracking-tight '>
              Let &amp; s make it happen
            </h1>
          </div>

          <div className='md:px-4 lg:px-30 xl:mx-[20%]'>
            <div className='px-4 py-10 md:p-10 xl:p-16 rounded-xl flex flex-col gap-5 bg-white/4 xl:gap-10'>
              <div>
                <h3 className='text-background text-[8vw] font-mmedium text-center md:text-[4vw] xl:text-[2vw]'>
                  Say Hello
                </h3>
              </div>

              <div className='relative px-2 '>
                <form
                  ref={form}
                  onSubmit={sendEmail}
                  className='flex flex-col gap-8 xl:gap-12'
                >
                  <div className='relative'>
                    <input
                      type='text'
                      name='name'
                      typeof='password'
                      placeholder='Drop a name'
                      className='p-4 xl:px-6 font-consola tracking-wide text-white bg-white/6 text-lg w-full rounded-2xl xl:text-[2rem]'
                      required
                    />
                  </div>
                  <div className='relative'>
                    <textarea
                      name='email'
                      typeof='email'
                      placeholder='Wanna hear back? Add your email'
                      className='p-4 xl:px-6 h-32 xl:h-40 font-consola tracking-wide text-white bg-white/6 text-lg w-full rounded-2xl resize-none md:h-16 xl:text-[2rem]'
                      required
                    />
                  </div>
                  <div className='relative'>
                    <textarea
                      name='message'
                      placeholder='Say hello or drop a note...'
                      className='p-4 xl:px-6 h-32 font-consola tracking-wide text-white bg-white/6 text-lg w-full rounded-2xl resize-none xl:h-44 xl:text-[2rem]'
                      required
                    ></textarea>
                  </div>
                  <div className='relative'>
                    <button
                      type='submit'
                      className='p-4 font-regular font-semibold bg-white text-black border-1 w-full rounded-2xl xl:text-[1.5rem] cursor-pointer'
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
