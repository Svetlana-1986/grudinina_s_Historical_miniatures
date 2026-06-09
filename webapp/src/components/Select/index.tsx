import cn from 'classnames';

import fieldCss from '../Field/field.module.scss';
import css from './index.module.scss';

type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  label: string;
  name: string;
  value: T;
  options: Option<T>[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
};

export const Select = <T extends string>({
  label,
  name,
  value,
  options,
  onChange,
}: Props<T>) => {
  return (
    <div className={fieldCss.field}>
      <label className={fieldCss.label}>{label}</label>

      <select
        className={cn(fieldCss.input, fieldCss.md, css.select)}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
