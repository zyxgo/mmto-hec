import { observable, action } from "mobx";
import { auth } from "../../firebase";

class DaftarUserStore {
  @observable username = "";
  @observable email = "";
  @observable passwordOne = "";
  @observable passwordTwo = "";
  @observable isValid = false;
  @observable usernameError = "";
  @observable emailError = "";
  @observable passwordOneError = "";
  @observable passwordTwoError = "";
  @observable responseFirebase = "";

  @action
  usernameOnChange(id) {
    this.username = id;
    this.validateUsername();
  }

  @action
  validateUsername() {
    const alphaNumeric = /[^a-zA-Z0-9 ]/i.test(this.username)
      ? "Only alphanumeric characters"
      : undefined;
    const maxLength =
      this.username.length > 20 ? "Must be 20 characters or less" : undefined;
    const minLength =
      this.username.length < 5 ? "Must be 5 characters or more" : undefined;
    const required = this.username ? undefined : "Required";
    this.usernameError = required
      ? required
      : alphaNumeric ? alphaNumeric : maxLength ? maxLength : minLength;
  }

  @action
  emailOnChange(id) {
    this.email = id;
    this.validateEmail();
  }

  @action
  validateEmail() {
    const emailPatter = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const required = this.email ? undefined : "Required";
    this.emailError = required
      ? required
      : emailPatter.test(this.email) ? undefined : "Invalid email address";
  }

  @action
  passwordOneOnChange(pwd) {
    this.passwordOne = pwd;
    this.validatePasswordOne();
  }

  @action
  validatePasswordOne() {
    const alphaNumeric = /[^a-zA-Z0-9 ]/i.test(this.passwordOne)
      ? "Only alphanumeric characters"
      : undefined;
    const maxLength =
      this.passwordOne.length > 15 ? "Must be 15 characters or less" : undefined;
    const minLength =
      this.passwordOne.length < 8 ? "Must be 8 characters or more" : undefined;
    const required = this.passwordOne ? undefined : "Required";
    this.passwordOneError = required
      ? required
      : alphaNumeric ? alphaNumeric : maxLength ? maxLength : minLength;
  }

  @action
  passwordTwoOnChange(pwd) {
    this.passwordTwo = pwd;
    this.validatePasswordTwo();
  }

  @action
  validatePasswordTwo() {
    const alphaNumeric = /[^a-zA-Z0-9 ]/i.test(this.passwordTwo)
      ? "Only alphanumeric characters"
      : undefined;
    const maxLength =
      this.passwordTwo.length > 15 ? "Must be 15 characters or less" : undefined;
    const minLength =
      this.passwordTwo.length < 8 ? "Must be 8 characters or more" : undefined;
    const required = this.passwordTwo ? undefined : "Required";
    this.passwordTwoError = required
      ? required
      : alphaNumeric ? alphaNumeric : maxLength ? maxLength : minLength;
  }

  @action
  async validateForm() {
    if (this.usernameError === undefined && this.emailError === undefined && this.passwordOneError === undefined && this.passwordTwoError === undefined ) {
      await auth.doCreateUserWithEmailAndPassword(this.email, this.passwordOne)
      .then(() => {
        this.isValid = true;
      })
      .catch(error => {
        this.responseFirebase = error.message;
        console.log(this.responseFirebase);
        this.isValid = false;
      });
    }
  }

  @action
  clearStore() {
    this.username = "";
    this.usernameError = "";
    this.email = "";
    this.isValid = false;
    this.emailError = "";
    this.passwordOne = "";
    this.passwordOneError = "";
    this.passwordTwo = "";
    this.passwordTwoError = "";
    this.responseFirebase = "";
  }
}

export default DaftarUserStore;
