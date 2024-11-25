<template>
  <div class="mainLogin">
    <v-row justify="center">
      <v-col cols="12" md="6" class="pa-8 d-flex">
        <v-container class="d-flex justify-center align-center pa-0">
          <v-col
            v-show="registerOn"
            class="pa-0"
            cols="12"
            lg="12"
            md="12"
            sm="12"
          >
            <RegisterComponent @registerOnFunc="registerOnFunc()" />
          </v-col>
          <v-col
            v-show="forgetPasswordOn"
            class="pa-0"
            cols="12"
            lg="12"
            md="12"
            sm="12"
          >
            <ForgetPassword @passwordOnFunc="passwordOnFunc()" />
          </v-col>
          <v-col
            v-show="loginOn"
            class="pa-0"
            cols="12"
            lg="12"
            md="12"
            sm="12"
          >
            <v-form ref="loginForm" @submit.prevent="validateLogin()">
              <v-title class="d-flex justify-center text-white text-h4 mb-4">
                Login
              </v-title>
              <v-row>
                <v-col cols="12" class="flex-start pb-0">
                  <v-text-field
                    class="pb-0"
                    type="text"
                    :rules="[required, validEmail]"
                    variant="solo-filled"
                    placeholder="E-mail"
                    outlined
                    label="E-mail"
                    v-model="email"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="flex-start pb-0 pt-0">
                  <v-text-field
                    class="pb-0"
                    variant="solo-filled"
                    placeholder="Senha"
                    outlined
                    label="Senha"
                    :rules="[required]"
                    v-model="senha"
                    :append-inner-icon="
                      passwordIcon ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    @click:append-inner="passwordIcon = !passwordIcon"
                    :type="passwordIcon ? 'password' : 'text'"
                  /> </v-col
              ></v-row>
              <v-row class="pt-0 justify-space-between">
                <v-col cols="12">
                  <v-btn
                    type="submit"
                    class="text-sm-body-1 text-md-body-1 text-lg-body-1"
                    color="#A2A644"
                    elevation="4"
                    :block="true"
                  >
                    Entrar
                  </v-btn>
                </v-col>

                <v-col cols="12">
                  <v-row>
                    <v-col cols="12" lg="6" md="6" sm="6">
                      <v-btn
                        class="ml-0 mx-4 text-sm-body-1 text-md-body-1 text-lg-body-1"
                        color="#A2A644"
                        @click="
                          (registerOn = !registerOn), (loginOn = !loginOn)
                        "
                        :block="true"
                      >
                        Solicitar cadastro
                      </v-btn>
                    </v-col>
                    <v-col cols="12" lg="6" md="6" sm="6">
                      <v-btn
                        class="text-capitalize text-sm-body-1 text-md-body-1 text-lg-body-1"
                        color="#A2A644"
                        @click="
                          (forgetPasswordOn = !forgetPasswordOn),
                            (loginOn = !loginOn)
                        "
                        :block="true"
                      >
                        Esqueci a senha
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RegisterComponent from "../../components/Register.vue";
import ForgetPassword from "../../components/ForgetPassword.vue";

const senha = ref("");
const email = ref("");
const passwordIcon = ref(true);
const loginForm = ref(null);
let registerOn = ref(false);
let forgetPasswordOn = ref(false);
let loginOn = ref(true);

const registerOnFunc = () => {
  registerOn.value = !registerOn.value;
  loginOn.value = !loginOn.value;
};

const passwordOnFunc = () => {
  forgetPasswordOn.value = !forgetPasswordOn.value;
  loginOn.value = !loginOn.value;
};

const validateLogin = async (): Promise<void> => {
  const isValid = await loginForm.value.validate();
  if (isValid.valid) {
    await navigateTo("/Home");
  }
};

const required = (value: string | number): string | boolean => {
  if (value) {
    return true;
  }
  return "Este campo é necessario";
};

const validEmail = (email: string): string | boolean => {
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return true;
  }
  return "Email Inválido";
};
</script>

<style scoped>
.mainLogin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
