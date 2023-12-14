import { Formik, FormikValues, FormikHelpers } from "formik";
import { ZodType } from "zod";
import React, { ReactNode } from "react";

import { Registration } from "./types";

// Formik is more flexible than useFormik because children can use useFormikContext
// TODO: props from `register` are not typed

interface FormProps<FormValues, Schema> {
  initialValues: FormValues;
  schema: Schema;
  onSubmit: (
    values: FormValues,
    options: FormikHelpers<FormValues>
  ) => void | Promise<any>;
  children: (register: (name: string) => Registration) => ReactNode;
}

export function Form<FormValues extends FormikValues, Schema extends ZodType>({
  initialValues,
  schema,
  onSubmit,
  children,
}: FormProps<FormValues, Schema>) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount={true}
      validate={(values) => {
        const zodValidation = schema.safeParse(values);

        if (zodValidation.success) return {};

        const errMessages: Record<string, string> = {};

        for (let issue of zodValidation.error.issues) {
          errMessages[issue.path[0]] = issue.message;
        }

        return errMessages;
      }}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit}>
            {children((name) => ({
              props: formik.getFieldProps(name),
              meta: formik.getFieldMeta(name),
              helpers: formik.getFieldHelpers(name),
            }))}
          </form>
        );
      }}
    </Formik>
  );
}
