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
export declare type UserPlanSubscriptionCreateFormInputValues = {
    current_plan?: string;
    user_email?: string;
    current_plan_price?: number;
};
export declare type UserPlanSubscriptionCreateFormValidationValues = {
    current_plan?: ValidationFunction<string>;
    user_email?: ValidationFunction<string>;
    current_plan_price?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserPlanSubscriptionCreateFormOverridesProps = {
    UserPlanSubscriptionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    current_plan?: PrimitiveOverrideProps<TextFieldProps>;
    user_email?: PrimitiveOverrideProps<TextFieldProps>;
    current_plan_price?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserPlanSubscriptionCreateFormProps = React.PropsWithChildren<{
    overrides?: UserPlanSubscriptionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserPlanSubscriptionCreateFormInputValues) => UserPlanSubscriptionCreateFormInputValues;
    onSuccess?: (fields: UserPlanSubscriptionCreateFormInputValues) => void;
    onError?: (fields: UserPlanSubscriptionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserPlanSubscriptionCreateFormInputValues) => UserPlanSubscriptionCreateFormInputValues;
    onValidate?: UserPlanSubscriptionCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserPlanSubscriptionCreateForm(props: UserPlanSubscriptionCreateFormProps): React.ReactElement;
