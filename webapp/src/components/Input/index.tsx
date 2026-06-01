import type { FormikProps } from 'formik';
import cn from 'classnames';

import css from '../Field/field.module.scss';

type Props<T extends Record<string, unknown>> = {
  name: keyof T;
  label: string;
  formik: FormikProps<T>;
  type?: 'text' | 'password';
  size?: 'sm' | 'md' | 'lg' | 'full';
};

export const Input = <T extends Record<string, unknown>>({
  name,
  label,
  formik,
  type = 'text',
  size = 'md',
}: Props<T>) => {
  const value = formik.values[name] as string;

  const error = formik.errors[name] as string | undefined;

  const touched = formik.touched[name];

  const invalid = !!touched && !!error;

  const disabled = formik.isSubmitting;

  return (
    <div
      className={cn(css.field, {
        [css.disabled]: disabled,
      })}
    >
      <label className={css.label} htmlFor={String(name)}>
        {label}
      </label>

      <input
        className={cn(css.input, css[size], {
          [css.invalid]: invalid,
        })}
        type={type}
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

      {invalid && <div className={css.error}>{error}</div>}
    </div>
  );
};
