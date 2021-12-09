import signInUserDto from "@/api/types/user/signInUserDto";
import InputText from "@/elements/inputElement/inputText";
import defaultInputState from "@/elements/inputElement/state/defaultstate";
import EmailValidation from "@/types/classes/validation/emailValidation";
import PasswordValidation from "@/types/classes/validation/passwordValidation";
import ErrorState from "@/types/interfaces/validation/errorState";
import { FormEvent, useEffect, useState } from "react";
import styles from "./signInForm.module.scss";

interface inputState {
  value: string;
  error: ErrorState | null;
}

const SignInForm: React.FC<{
  onSubmit: (e: signInUserDto) => void;
}> = (props): JSX.Element => {
  const [emailProp, setEmail] = useState<inputState>(defaultInputState);
  const [passwordProp, setPassword] = useState<inputState>(defaultInputState);
  const [isFormInvalid, setInvalid] = useState(true);

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const body = {
      email: emailProp.value,
      password: passwordProp.value,
    };
    props.onSubmit(body);
  };

  useEffect(() => {
    setInvalid(emailProp.error != null || passwordProp.error != null);
  }, [emailProp.error, passwordProp.error]);

  return (
    <div className={styles.formWrapper}>
      <h2>Login</h2>
      <form action="submit" className={styles.form} onSubmit={onSubmitForm}>
        <InputText
          setValue={(e) => {
            setEmail(e);
          }}
          inputType="text"
          propName="email"
          label="Email"
          validation={new EmailValidation()}
        />
        <InputText
          setValue={(e) => {
            setPassword(e);
          }}
          inputType="text"
          propName="password"
          label="Password"
          validation={new PasswordValidation()}
        />
        <div className={styles.inputItem} />

        <button type="submit" disabled={isFormInvalid}>
          <span />
          <span />
          <span />
          <span />
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
