import { forwardRef, Ref } from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  step?: number;
  error?: string; // Adicione esta linha
  ref?: Ref<HTMLInputElement>; // Adicione esta linha
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>((
  { label, name, type = 'text', placeholder, step, error },
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
        placeholder={placeholder}
        step={step}
        className={`duration-100 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white ${error ? 'border-red-500' : 'border-gray-500'}`}
        ref={ref}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* Exibe mensagem de erro */}
    </div>
  );
});