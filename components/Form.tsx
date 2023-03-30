import React from 'react';
import Link from 'next/link';
import * as FormPrimitive from '@radix-ui/react-form';

interface FormProps {
  category: string;
}

const Form = ({ category }: FormProps) => {
  return (
    <>
      <FormPrimitive.Root className='xs:flex xs:flex-col xs:w-96 xs:mt-12 xs:text-base-md'>
        <FormPrimitive.Field name='username'>
          <div className='xs:flex xs:flex-row xs:justify-between'>
            <FormPrimitive.Label>Username</FormPrimitive.Label>
            <FormPrimitive.Message
              className='xs:text-errorRed'
              match='valueMissing'
            >
              Username required
            </FormPrimitive.Message>
          </div>
          <FormPrimitive.Control asChild>
            <input
              className='xs:w-full xs:border-2 xs:border-base xs:mt-1 xs:p-3 xs:rounded-md'
              type='username'
              required
            />
          </FormPrimitive.Control>
        </FormPrimitive.Field>
        <FormPrimitive.Field className='xs:mt-4' name='password'>
          <div className='xs:flex xs:flex-row xs:justify-between'>
            <FormPrimitive.Label>Password</FormPrimitive.Label>
            <FormPrimitive.Message
              className='xs:text-errorRed'
              match='valueMissing'
            >
              Password required
            </FormPrimitive.Message>
          </div>
          <FormPrimitive.Control asChild>
            <input
              className='xs:w-full xs:border-2 xs:border-base xs:mt-1 xs:p-3 xs:rounded-md'
              type='password'
              required
            />
          </FormPrimitive.Control>
        </FormPrimitive.Field>
        <FormPrimitive.Submit asChild>
          <button className='xs:w-full xs:border-2 xs:border-transparent xs:bg-base xs:hover:bg-base-darkMd xs:text-white xs:mt-8 xs:py-3 xs:rounded-md'>
            {category === 'SIGNUP' ? 'Create account' : 'Continue'}
          </button>
        </FormPrimitive.Submit>
      </FormPrimitive.Root>
    </>
  );
};

export default Form;
