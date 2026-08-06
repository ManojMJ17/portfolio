'use client';

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { contact, contactLink } from '@/data';

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
        toast.success(contact.toast.successTitle, {
          description: contact.toast.successDescription,
          duration: 1000,
        });

        form.current?.reset();
      },
      (error) => {
        toast.error(contact.toast.error);
        console.error(error.text);
      },
    );
  };

  return (
    <section
      id='contact'
      aria-label={contactLink.name}
      className='mt-[20%] lg:-mt-[20%] xl:-mt-[12%]'
    >
      <div className='w-full flex justify-center'>
        <div
          className='p-8 w-[90%] max-w-[1200px] mx-auto
bg-gradient-to-b from-stone-900 from- via-stone-800 via- to-stone-700 to-
rounded-lg flex flex-col gap-10 md:p-10 xl:p-16'
        >
          <div className='xl:mx-[18%]'>
            <h1 className='uppercase text-background font-mmedium font-semibold text-[14vw] text-center leading-none md:text-[10vw] md:px-20 md:text-center xl:text-[8vw] xl:tracking-tight '>
              {contact.heading}
            </h1>
          </div>

          <div className='w-full max-w-[650px] mx-auto'>
            <div className='px-4 py-10 md:p-10 xl:p-16 rounded-xl flex flex-col gap-5 bg-white/4 xl:gap-10'>
              <div>
                <h2 className='text-background text-[8vw] font-mmedium text-center md:text-[4vw] xl:text-[2vw]'>
                  {contact.subheading}
                </h2>
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
                      placeholder={contact.formPlaceholders.name}
                      className='p-4 xl:px-6 font-consola tracking-wide text-white bg-white/6 text-lg w-full rounded-2xl xl:text-[2rem] placeholder:text-xs placeholder:tracking-tight md:placeholder:text-lg md:placeholder:tracking-wide'
                      required
                    />
                  </div>
                  <div className='relative'>
                    <input
                      type='email'
                      name='email'
                      placeholder={contact.formPlaceholders.email}
                      className='p-4 xl:px-6 h-16 font-consola tracking-wide text-white bg-white/6 text-lg w-full rounded-2xl xl:text-[2rem] placeholder:text-xs placeholder:tracking-tight md:placeholder:text-lg md:placeholder:tracking-wide'
                      required
                    />
                  </div>
                  <div className='relative'>
                    <textarea
                      name='message'
                      placeholder={contact.formPlaceholders.message}
                      className='p-4 xl:px-6 h-32 font-consola tracking-wide text-white bg-white/6 text-lg w-full rounded-2xl resize-none xl:h-44 xl:text-[2rem] placeholder:text-xs placeholder:tracking-tight md:placeholder:text-lg md:placeholder:tracking-wide'
                      required
                    ></textarea>
                  </div>
                  <div className='relative'>
                    <button
                      type='submit'
                      className='p-4 font-regular font-semibold bg-white text-black border-1 w-full rounded-2xl xl:text-[1.5rem] cursor-pointer'
                    >
                      {contact.submitLabel}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
