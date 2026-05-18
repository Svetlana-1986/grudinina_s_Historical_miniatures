import { useFormik } from 'formik';
import { Segment } from '../../components/Segment';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { withZodSchema } from 'formik-validator-zod';
import { z } from 'zod';
import { trpc } from '../../lib/trpc';

export const NewCardPage = () => {
  // создание карточки на backend
  const createCard = trpc.createCard.useMutation();
  const formik = useFormik({
    initialValues: {
      title: '',
      historicalPeriod: '',
      authorNick: '',
      authorName: '',
      description: '',
      text: '',
    },

    validate: withZodSchema(
      z.object({
        title: z.string().min(1, 'Поле не заполнено'),

        historicalPeriod: z.string().min(1, 'Поле не заполнено'),

        authorNick: z
          .string()
          .min(1, 'Поле не заполнено')
          .regex(
            /^[a-z0-9-]+$/,
            'Nick автора может содержать только строчные латинские буквы, цифры и дефис',
          ),

        authorName: z
          .string()
          .min(1, 'Поле не заполнено')
          .refine(
            (value) =>
              /^([A-ZА-ЯЁ][a-zа-яё]+)(\s[A-ZА-ЯЁ][a-zа-яё]+)*$/u.test(value),
            {
              message: 'Имя и фамилия должны начинаться с заглавной буквы',
            },
          ),

        description: z
          .string()
          .min(1, 'Поле не заполнено')
          .max(5000, 'Поле должно содержать не больше 5000 символов'),
      }),
    ),

    onSubmit: async (values) => {
      await createCard.mutateAsync(values);
    },
  });

  return (
    <Segment title="Создать карточку">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="title" label="Название" formik={formik} />

        <Input name="historicalPeriod" label="Период" formik={formik} />

        <Input name="authorNick" label="Nick автора" formik={formik} />

        <Input name="authorName" label="Имя автора" formik={formik} />

        <TextArea
          name="description"
          label="Описание миниатюры"
          formik={formik}
        />

        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>
            Некоторые поля заполнены некорректно
          </div>
        )}

        <button type="submit">Создать карточку</button>
      </form>
    </Segment>
  );
};
