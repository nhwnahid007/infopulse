import { MdErrorOutline } from 'react-icons/md';

const TextArea = ({
  labelAttr,
  nameAttr,
  classAttr,
  placeholderAttr,
  requiredAttr,
  errorAttr,
  ...props
}) => {
  return (
    <label className="form-control">
      {labelAttr && (
        <div className="label !px-0">
          <span className="label-text">{labelAttr}</span>
        </div>
      )}
      <div className="relative">
        <textarea
          className={`block bg-slate-700 outline-none rounded-md placeholder:text-sm placeholder:text-[#989DBB] focus:!ring-0 focus:border px-4 py-3 ${classAttr} ${
            errorAttr ? 'border border-red-500' : ''
          }`}
          name={nameAttr}
          placeholder={placeholderAttr}
          required={requiredAttr}
          {...props}
        ></textarea>
      </div>
      {errorAttr && (
        <div className="label !px-0">
          <span className="label-text text-red-500">
            <MdErrorOutline className="inline me-2" />
            {errorAttr}
          </span>
        </div>
      )}
    </label>
  );
};

export default TextArea;
