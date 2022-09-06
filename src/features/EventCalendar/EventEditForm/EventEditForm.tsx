import { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './EventEditForm.module.scss';
import { EventEditData } from './types';

interface EventEditFormProps {
  initialValues: EventEditData;
  onCancel: () => void;
  onSubmit: (values: EventEditData) => void;
}

const validationSchema = yup.object({
  title: yup.string().required('Must not be empty!!!'),
  description: yup.string().required('Must not be empty!!!'),
  date: yup.string().required('Must be date!!!'),
  time: yup.string().required('Must be time!!!'),
});

export const EventEditForm: FC<EventEditFormProps> = ({
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const formik = useFormik<EventEditData>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete={'off'}
      className={styles.wrap}
    >
      <div className={styles.title}>
        <label className={styles.titleLabel}>Title</label>
        <input
          className={styles.titleInput}
          type="text"
          placeholder={'please input title'}
          {...formik.getFieldProps('title')}
        />
        {Boolean(formik.touched.title) && Boolean(formik.errors.title) ? (
          <div className={styles.error}>{formik.errors.title}</div>
        ) : null}
      </div>

      <div className={styles.description}>
        <label className={styles.descriptionLabel}>description</label>
        <textarea
          rows={10}
          className={styles.descriptionTextArea}
          placeholder={'please input description'}
          {...formik.getFieldProps('description')}
        />
        {Boolean(formik.touched.description) &&
        Boolean(formik.errors.description) ? (
          <div className={styles.error}>{formik.errors.description}</div>
        ) : null}
      </div>

      <div className={styles.dateTimeBlock}>
        <div className={styles.dateTimeBlockDate}>
          <label>Date</label>
          <input
            type="date"
            className={styles.dateTimeBlockDateInput}
            {...formik.getFieldProps('date')}
          />
          {Boolean(formik.touched.date) && Boolean(formik.errors.date) ? (
            <div className={styles.error}>{formik.errors.date}</div>
          ) : null}
        </div>
        <div className={styles.dateTimeBlockTime}>
          <label className={styles.dateTimeBlockTimeLabel}>Time</label>
          <input
            type="time"
            className={styles.dateTimeBlockTimeInput}
            {...formik.getFieldProps('time')}
          />
          {Boolean(formik.touched.time) && Boolean(formik.errors.time) ? (
            <div className={styles.error}>{formik.errors.time}</div>
          ) : null}
        </div>
      </div>

      <div className={styles.buttonList}>
        <button className={styles.buttonListButton} type={'submit'}>
          save
        </button>
        <button
          className={styles.buttonListButton}
          type={'button'}
          onClick={onCancel}
        >
          cancel
        </button>
      </div>
    </form>
  );
};
