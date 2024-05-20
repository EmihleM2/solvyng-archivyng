/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createUserCardDetails } from "../../mutations";
const client = generateClient();
export default function UserCardDetailsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    card_name: "",
    card_number: "",
    expire_date: "",
    cvc_number: "",
    subscription_plan: "",
    user_email: "",
  };
  const [card_name, setCard_name] = React.useState(initialValues.card_name);
  const [card_number, setCard_number] = React.useState(
    initialValues.card_number
  );
  const [expire_date, setExpire_date] = React.useState(
    initialValues.expire_date
  );
  const [cvc_number, setCvc_number] = React.useState(initialValues.cvc_number);
  const [subscription_plan, setSubscription_plan] = React.useState(
    initialValues.subscription_plan
  );
  const [user_email, setUser_email] = React.useState(initialValues.user_email);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCard_name(initialValues.card_name);
    setCard_number(initialValues.card_number);
    setExpire_date(initialValues.expire_date);
    setCvc_number(initialValues.cvc_number);
    setSubscription_plan(initialValues.subscription_plan);
    setUser_email(initialValues.user_email);
    setErrors({});
  };
  const validations = {
    card_name: [{ type: "Required" }],
    card_number: [{ type: "Required" }],
    expire_date: [{ type: "Required" }],
    cvc_number: [{ type: "Required" }],
    subscription_plan: [{ type: "Required" }],
    user_email: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          card_name,
          card_number,
          expire_date,
          cvc_number,
          subscription_plan,
          user_email,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createUserCardDetails.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserCardDetailsCreateForm")}
      {...rest}
    >
      <TextField
        label="Card name"
        isRequired={true}
        isReadOnly={false}
        value={card_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              card_name: value,
              card_number,
              expire_date,
              cvc_number,
              subscription_plan,
              user_email,
            };
            const result = onChange(modelFields);
            value = result?.card_name ?? value;
          }
          if (errors.card_name?.hasError) {
            runValidationTasks("card_name", value);
          }
          setCard_name(value);
        }}
        onBlur={() => runValidationTasks("card_name", card_name)}
        errorMessage={errors.card_name?.errorMessage}
        hasError={errors.card_name?.hasError}
        {...getOverrideProps(overrides, "card_name")}
      ></TextField>
      <TextField
        label="Card number"
        isRequired={true}
        isReadOnly={false}
        value={card_number}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              card_name,
              card_number: value,
              expire_date,
              cvc_number,
              subscription_plan,
              user_email,
            };
            const result = onChange(modelFields);
            value = result?.card_number ?? value;
          }
          if (errors.card_number?.hasError) {
            runValidationTasks("card_number", value);
          }
          setCard_number(value);
        }}
        onBlur={() => runValidationTasks("card_number", card_number)}
        errorMessage={errors.card_number?.errorMessage}
        hasError={errors.card_number?.hasError}
        {...getOverrideProps(overrides, "card_number")}
      ></TextField>
      <TextField
        label="Expire date"
        isRequired={true}
        isReadOnly={false}
        value={expire_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              card_name,
              card_number,
              expire_date: value,
              cvc_number,
              subscription_plan,
              user_email,
            };
            const result = onChange(modelFields);
            value = result?.expire_date ?? value;
          }
          if (errors.expire_date?.hasError) {
            runValidationTasks("expire_date", value);
          }
          setExpire_date(value);
        }}
        onBlur={() => runValidationTasks("expire_date", expire_date)}
        errorMessage={errors.expire_date?.errorMessage}
        hasError={errors.expire_date?.hasError}
        {...getOverrideProps(overrides, "expire_date")}
      ></TextField>
      <TextField
        label="Cvc number"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={cvc_number}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              card_name,
              card_number,
              expire_date,
              cvc_number: value,
              subscription_plan,
              user_email,
            };
            const result = onChange(modelFields);
            value = result?.cvc_number ?? value;
          }
          if (errors.cvc_number?.hasError) {
            runValidationTasks("cvc_number", value);
          }
          setCvc_number(value);
        }}
        onBlur={() => runValidationTasks("cvc_number", cvc_number)}
        errorMessage={errors.cvc_number?.errorMessage}
        hasError={errors.cvc_number?.hasError}
        {...getOverrideProps(overrides, "cvc_number")}
      ></TextField>
      <TextField
        label="Subscription plan"
        isRequired={true}
        isReadOnly={false}
        value={subscription_plan}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              card_name,
              card_number,
              expire_date,
              cvc_number,
              subscription_plan: value,
              user_email,
            };
            const result = onChange(modelFields);
            value = result?.subscription_plan ?? value;
          }
          if (errors.subscription_plan?.hasError) {
            runValidationTasks("subscription_plan", value);
          }
          setSubscription_plan(value);
        }}
        onBlur={() =>
          runValidationTasks("subscription_plan", subscription_plan)
        }
        errorMessage={errors.subscription_plan?.errorMessage}
        hasError={errors.subscription_plan?.hasError}
        {...getOverrideProps(overrides, "subscription_plan")}
      ></TextField>
      <TextField
        label="User email"
        isRequired={true}
        isReadOnly={false}
        value={user_email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              card_name,
              card_number,
              expire_date,
              cvc_number,
              subscription_plan,
              user_email: value,
            };
            const result = onChange(modelFields);
            value = result?.user_email ?? value;
          }
          if (errors.user_email?.hasError) {
            runValidationTasks("user_email", value);
          }
          setUser_email(value);
        }}
        onBlur={() => runValidationTasks("user_email", user_email)}
        errorMessage={errors.user_email?.errorMessage}
        hasError={errors.user_email?.hasError}
        {...getOverrideProps(overrides, "user_email")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
