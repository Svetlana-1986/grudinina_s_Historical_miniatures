import { zSignUpTrpcInput } from '@miniaturenick/backend/signUp/input';

import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';

import { useState } from 'react';

import { z } from 'zod';

import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';

import { trpc } from '../../lib/trpc';

const signUpFormSchema = zSignUpTrpcInput
  .extend({
    passwordAgain: z
      .string()
      .min(8, 'Пароль должен содержать минимум 8 символов'),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.passwordAgain) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Пароли должны совпадать',
        path: ['passwordAgain'],
      });
    }
  });

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const SignUpPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const signUp = trpc.signUp.useMutation();

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      nick: '',
      displayName: '',
      password: '',
      passwordAgain: '',
    },

    validate: withZodSchema(signUpFormSchema),

    onSubmit: async (values, helpers) => {
      try {
        setSubmittingError(null);

        setSuccessMessageVisible(false);

        await signUp.mutateAsync({
          nick: values.nick,
          displayName: values.displayName,
          password: values.password,
        });

        helpers.resetForm();

        setSuccessMessageVisible(true);

        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error) {
        if (error instanceof Error) {
          setSubmittingError(error.message);
        } else {
          setSubmittingError('Неизвестная ошибка');
        }
      }
    },
  });

  return (
    <Segment title="Регистрация">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Логин:" name="nick" formik={formik} />

          <Input label="Имя пользователя:" name="displayName" formik={formik} />

          <Input
            label="Пароль:"
            name="password"
            type="password"
            formik={formik}
          />

          <Input
            label="Повторите пароль:"
            name="passwordAgain"
            type="password"
            formik={formik}
          />

          {!formik.isValid && formik.submitCount > 0 && (
            <Alert type="warning">Некоторые поля заполнены неверно</Alert>
          )}

          {submittingError && <Alert type="error">{submittingError}</Alert>}

          {successMessageVisible && (
            <Alert type="success">Регистрация успешно завершена</Alert>
          )}

          <Button type="submit" loading={formik.isSubmitting}>
            Зарегистрироваться
          </Button>
        </FormItems>
      </form>
    </Segment>
  );
};
