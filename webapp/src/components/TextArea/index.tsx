import type { FormikProps } from 'formik';
import cn from 'classnames';

import baseCss from '../Field/field.module.scss';
import css from './index.module.scss';

type Props<T> = {
  name: keyof T;
  label: string;
  formik: FormikProps<T>;
  size?: 'sm' | 'md' | 'lg' | 'full';
};

export const TextArea = <T extends object>({
  name,
  label,
  formik,
  size = 'lg',
}: Props<T>) => {
  const value = formik.values[name] as string;

  const error = formik.errors[name] as string | undefined;

  const touched = formik.touched[name];

  const invalid = !!touched && !!error;

  const disabled = formik.isSubmitting;

  return (
    <div
      className={cn(baseCss.field, {
        [baseCss.disabled]: disabled,
      })}
    >
      <label className={baseCss.label} htmlFor={String(name)}>
        {label}
      </label>

      <textarea
        className={cn(baseCss.input, baseCss[size], css.textarea, {
          [baseCss.invalid]: invalid,
        })}
        onChange={(e) => {
          void formik.setFieldValue(String(name), e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(String(name));
        }}
        value={value}
        name={String(name)}
        id={String(name)}
        disabled={disabled}
      />

      {invalid && <div className={baseCss.error}>{error}</div>}
    </div>
  );
};
