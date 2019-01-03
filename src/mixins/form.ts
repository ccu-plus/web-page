import { Component, Inject, Vue } from "vue-property-decorator";
import { Validator } from "vee-validate";

@Component({
  $_veeValidate: { validator: "new" }
})
export default class FormMixin extends Vue {
  @Inject("$validator") $validator!: Validator;

  get isFormValid() {
    return !this.isFormInvalid;
  }

  get isFormInvalid() {
    return Object.keys(this.fields).some(
      key => this.fields[key].invalid as boolean
    );
  }
}
