import { forwardRef, Ref } from 'react';

interface InputFieldProps {
  label?: string;
  name: string;
  defaultValue?: string | number;
  type?: string;
  placeholder?: string;
  step?: number;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Adicione esta linha
  ref?: Ref<HTMLInputElement>;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((
  { label, name, type = 'text', placeholder, step, error, defaultValue, onChange }, // Inclua o onChange aqui
  ref
) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="font-bold text-left block mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        step={step}
        className={`duration-100 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white ${error ? 'border-red-500' : 'border-gray-500'}`}
        ref={ref}
        onChange={onChange} // Passe o onChange para o input
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});
