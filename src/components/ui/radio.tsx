import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Input } from './input';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioProps<T extends FieldValues> {
  options: RadioOption[];
  fieldName: Path<T>;
  register: UseFormRegister<T>;
}

const Radio = <T extends FieldValues>({
  options,
  register,
  fieldName,
}: RadioProps<T>) => {
  return (
    <ul className='flex flex-wrap gap-3 justify-center mb-2 w-full max-w-[650px] px-2'>
      {options.map(option => (
        <li key={option.value}>
          <Input
            id={option.value}
            type='radio'
            value={option.value}
            className='hidden peer'
            {...register(fieldName, { required: 'Must choose one option' })}
          />
          <label
            htmlFor={option.value}
            className='flex items-center justify-center w-full py-1.5 px-5 rounded-lg border border-border bg-background hover:bg-gray-50 hover:border-gray-300 text-muted-foreground peer-checked:border-primary peer-checked:text-primary peer-checked:bg-muted/60 transition-all duration-200 ease-in-out shadow-sm hover:shadow cursor-pointer'
          >
            <div>
              <h3>{option.label}</h3>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Radio;
