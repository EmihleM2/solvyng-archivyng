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
export declare type UserCardDetailsUpdateFormInputValues = {
    card_name?: string;
    card_number?: string;
    expire_date?: string;
    cvc_number?: number;
    user_email?: string;
};
export declare type UserCardDetailsUpdateFormValidationValues = {
    card_name?: ValidationFunction<string>;
    card_number?: ValidationFunction<string>;
    expire_date?: ValidationFunction<string>;
    cvc_number?: ValidationFunction<number>;
    user_email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCardDetailsUpdateFormOverridesProps = {
    UserCardDetailsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    card_name?: PrimitiveOverrideProps<TextFieldProps>;
    card_number?: PrimitiveOverrideProps<TextFieldProps>;
    expire_date?: PrimitiveOverrideProps<TextFieldProps>;
    cvc_number?: PrimitiveOverrideProps<TextFieldProps>;
    user_email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserCardDetailsUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserCardDetailsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userCardDetails?: any;
    onSubmit?: (fields: UserCardDetailsUpdateFormInputValues) => UserCardDetailsUpdateFormInputValues;
    onSuccess?: (fields: UserCardDetailsUpdateFormInputValues) => void;
    onError?: (fields: UserCardDetailsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserCardDetailsUpdateFormInputValues) => UserCardDetailsUpdateFormInputValues;
    onValidate?: UserCardDetailsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserCardDetailsUpdateForm(props: UserCardDetailsUpdateFormProps): React.ReactElement;
