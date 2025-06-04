'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { createCategoryAction } from '../../../../../actions/categoryActions';
import TextArea from '../../../../../components/TextArea';
import FileInput from '../../../../../components/FileInput';
import SubmitButton from '../../../../../components/SubmitButton';
import Input from '../../../../../components/Input';

const CreateCategory = () => {
  const formRef = useRef(null);
  const successRef = useRef(null);
  const failedRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  return (
    <div className="grid place-items-center min-h-screen">
      <form
        ref={formRef}
        action={async (formData) => {
          successRef.current.textContent = '';
          failedRef.current.textContent = '';

          const data = await createCategoryAction(formData);
          if (data?.success) {
            formRef.current?.reset();
            setSelectedFile(null);
            successRef.current.textContent = 'Created!';
            setTimeout(() => {
              router.push('/admin-controls/categories');
            }, 1000);
          } else {
            failedRef.current.textContent = data?.error;
          }
        }}
        className="w-[90%] sm:w-[580px] shadow-xl p-8 rounded-md flex flex-col gap-3 bg-base-100"
      >
        <h2 className="text-white font-bold text-2xl mb-4 self-center">
          Create Category
        </h2>

        <Input
          typeAttr={'text'}
          nameAttr={'name'}
          placeholderAttr={'Category Name'}
          requiredAttr={true}
          classAttr={'w-full'}
        />
        <TextArea
          nameAttr={'description'}
          placeholderAttr={'Description'}
          requiredAttr={true}
          classAttr={'w-full resize-none'}
        />

        <FileInput
          nameAttr={'thumbnailImage'}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
        <div className="self-center mt-4">
          <SubmitButton />
        </div>
        <p
          ref={successRef}
          className="text-green-600 text-center font-bold text-lg"
        ></p>
        <p
          ref={failedRef}
          className="text-red-600 text-center font-bold text-lg"
        ></p>
      </form>
    </div>
  );
};

export default CreateCategory;
