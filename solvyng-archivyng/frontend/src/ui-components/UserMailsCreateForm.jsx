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
import { createUserMails } from "../../mutations";
const client = generateClient();
export default function UserMailsCreateForm(props) {
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
    user_email: "",
    mail_subject: "",
    mail_message: "",
  };
  const [user_email, setUser_email] = React.useState(initialValues.user_email);
  const [mail_subject, setMail_subject] = React.useState(
    initialValues.mail_subject
  );
  const [mail_message, setMail_message] = React.useState(
    initialValues.mail_message
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUser_email(initialValues.user_email);
    setMail_subject(initialValues.mail_subject);
    setMail_message(initialValues.mail_message);
    setErrors({});
  };
  const validations = {
    user_email: [{ type: "Required" }],
    mail_subject: [{ type: "Required" }],
    mail_message: [{ type: "Required" }],
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
          user_email,
          mail_subject,
          mail_message,
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
            query: createUserMails.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "UserMailsCreateForm")}
      {...rest}
    >
      <TextField
        label="User email"
        isRequired={true}
        isReadOnly={false}
        value={user_email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user_email: value,
              mail_subject,
              mail_message,
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
        label="Mail subject"
        isRequired={true}
        isReadOnly={false}
        value={mail_subject}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user_email,
              mail_subject: value,
              mail_message,
            };
            const result = onChange(modelFields);
            value = result?.mail_subject ?? value;
          }
          if (errors.mail_subject?.hasError) {
            runValidationTasks("mail_subject", value);
          }
          setMail_subject(value);
        }}
        onBlur={() => runValidationTasks("mail_subject", mail_subject)}
        errorMessage={errors.mail_subject?.errorMessage}
        hasError={errors.mail_subject?.hasError}
        {...getOverrideProps(overrides, "mail_subject")}
      ></TextField>
      <TextField
        label="Mail message"
        isRequired={true}
        isReadOnly={false}
        value={mail_message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              user_email,
              mail_subject,
              mail_message: value,
            };
            const result = onChange(modelFields);
            value = result?.mail_message ?? value;
          }
          if (errors.mail_message?.hasError) {
            runValidationTasks("mail_message", value);
          }
          setMail_message(value);
        }}
        onBlur={() => runValidationTasks("mail_message", mail_message)}
        errorMessage={errors.mail_message?.errorMessage}
        hasError={errors.mail_message?.hasError}
        {...getOverrideProps(overrides, "mail_message")}
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
