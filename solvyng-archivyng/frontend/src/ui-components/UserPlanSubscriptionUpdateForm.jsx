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
import { getUserPlanSubscription } from "../../queries";
import { updateUserPlanSubscription } from "../../mutations";
const client = generateClient();
export default function UserPlanSubscriptionUpdateForm(props) {
  const {
    id: idProp,
    userPlanSubscription: userPlanSubscriptionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    current_plan: "",
    user_email: "",
    current_plan_price: "",
  };
  const [current_plan, setCurrent_plan] = React.useState(
    initialValues.current_plan
  );
  const [user_email, setUser_email] = React.useState(initialValues.user_email);
  const [current_plan_price, setCurrent_plan_price] = React.useState(
    initialValues.current_plan_price
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = userPlanSubscriptionRecord
      ? { ...initialValues, ...userPlanSubscriptionRecord }
      : initialValues;
    setCurrent_plan(cleanValues.current_plan);
    setUser_email(cleanValues.user_email);
    setCurrent_plan_price(cleanValues.current_plan_price);
    setErrors({});
  };
  const [userPlanSubscriptionRecord, setUserPlanSubscriptionRecord] =
    React.useState(userPlanSubscriptionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getUserPlanSubscription.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getUserPlanSubscription
        : userPlanSubscriptionModelProp;
      setUserPlanSubscriptionRecord(record);
    };
    queryData();
  }, [idProp, userPlanSubscriptionModelProp]);
  React.useEffect(resetStateValues, [userPlanSubscriptionRecord]);
  const validations = {
    current_plan: [{ type: "Required" }],
    user_email: [{ type: "Required" }],
    current_plan_price: [{ type: "Required" }],
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
          current_plan,
          user_email,
          current_plan_price,
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
            query: updateUserPlanSubscription.replaceAll("__typename", ""),
            variables: {
              input: {
                id: userPlanSubscriptionRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserPlanSubscriptionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Current plan"
        isRequired={true}
        isReadOnly={false}
        value={current_plan}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              current_plan: value,
              user_email,
              current_plan_price,
            };
            const result = onChange(modelFields);
            value = result?.current_plan ?? value;
          }
          if (errors.current_plan?.hasError) {
            runValidationTasks("current_plan", value);
          }
          setCurrent_plan(value);
        }}
        onBlur={() => runValidationTasks("current_plan", current_plan)}
        errorMessage={errors.current_plan?.errorMessage}
        hasError={errors.current_plan?.hasError}
        {...getOverrideProps(overrides, "current_plan")}
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
              current_plan,
              user_email: value,
              current_plan_price,
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
      <TextField
        label="Current plan price"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={current_plan_price}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              current_plan,
              user_email,
              current_plan_price: value,
            };
            const result = onChange(modelFields);
            value = result?.current_plan_price ?? value;
          }
          if (errors.current_plan_price?.hasError) {
            runValidationTasks("current_plan_price", value);
          }
          setCurrent_plan_price(value);
        }}
        onBlur={() =>
          runValidationTasks("current_plan_price", current_plan_price)
        }
        errorMessage={errors.current_plan_price?.errorMessage}
        hasError={errors.current_plan_price?.hasError}
        {...getOverrideProps(overrides, "current_plan_price")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || userPlanSubscriptionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || userPlanSubscriptionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
