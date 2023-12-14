import { FieldInputProps, FieldMetaProps, FieldHelperProps } from "formik";

export interface Registration {
  props: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
  helpers: FieldHelperProps<any>;
}
