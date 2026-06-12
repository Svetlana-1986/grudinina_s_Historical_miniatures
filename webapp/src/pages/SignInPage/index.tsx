import { zSignInTrpcInput } from '@miniaturenick/backend/signIn/input';

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

import { useNavigate } from 'react-router-dom';
import { getProfileRoutePage } from '../../lib/routes';

const signInFormSchema = zSignInTrpcInput;

type SignInFormValues = z.infer<typeof signInFormSchema>;

export const SignInPage = () => {
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const signIn = trpc.signIn.useMutation();
  const navigate = useNavigate();

  const utils = trpc.useUtils();

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      nick: '',
      password: '',
    },

    validate: withZodSchema(signInFormSchema),

    onSubmit: async (values, helpers) => {
      try {
        setSubmittingError(null);

        await signIn.mutateAsync({
          nick: values.nick,
          password: values.password,
        });

        await utils.me.invalidate();

        helpers.resetForm();

        navigate(getProfileRoutePage());
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
    <Segment title="Вход">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Логин:" name="nick" formik={formik} />

          <Input
            label="Пароль:"
            name="password"
            type="password"
            formik={formik}
          />

          {!formik.isValid && formik.submitCount > 0 && (
            <Alert type="warning">Некоторые поля заполнены неверно</Alert>
          )}

          {submittingError && <Alert type="error">{submittingError}</Alert>}

          <Button type="submit" loading={formik.isSubmitting}>
            Войти
          </Button>
        </FormItems>
      </form>
    </Segment>
  );
};
