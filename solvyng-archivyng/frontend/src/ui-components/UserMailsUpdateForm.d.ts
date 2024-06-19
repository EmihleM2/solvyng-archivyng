/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserMailsUpdateFormInputValues = {
    user_email?: string;
    mail_subject?: string;
    mail_message?: string;
};
export declare type UserMailsUpdateFormValidationValues = {
    user_email?: ValidationFunction<string>;
    mail_subject?: ValidationFunction<string>;
    mail_message?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserMailsUpdateFormOverridesProps = {
    UserMailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    user_email?: PrimitiveOverrideProps<TextFieldProps>;
    mail_subject?: PrimitiveOverrideProps<TextFieldProps>;
    mail_message?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserMailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserMailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userMails?: any;
    onSubmit?: (fields: UserMailsUpdateFormInputValues) => UserMailsUpdateFormInputValues;
    onSuccess?: (fields: UserMailsUpdateFormInputValues) => void;
    onError?: (fields: UserMailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserMailsUpdateFormInputValues) => UserMailsUpdateFormInputValues;
    onValidate?: UserMailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserMailsUpdateForm(props: UserMailsUpdateFormProps): React.ReactElement;
