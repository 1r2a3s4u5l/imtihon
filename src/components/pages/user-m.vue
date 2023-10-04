<template>
  <AppModal v-model="dialog">
    <h1 v-if="!forms._id">Add User</h1>
    <h1 v-else>Edit User</h1>
    <Form>
      <Field
        rules="required"
        :modelValue="forms.name"
        v-slot="{ errors }"
        name="Name"
      >
        <input
          type="text"
          v-model="forms.name"
          class="form-control my-2"
          placeholder="Name"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="forms.surname"
        v-slot="{ errors }"
        name="Surname"
      >
        <input
          type="text"
          v-model="forms.surname"
          class="form-control my-2"
          placeholder="Surname"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <!-- 3 -->
      <Field
        rules="required"
        :modelValue="forms.address"
        v-slot="{ errors }"
        name="Address"
      >
        <input
          type="text"
          v-model="forms.address"
          class="form-control my-2"
          placeholder="Address"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <!-- 4 -->
      <Field
        rules="required"
        :modelValue="forms.age"
        v-slot="{ errors }"
        name="Age"
      >
        <input
          type="number"
          v-model="forms.age"
          class="form-control my-2"
          placeholder="Age"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <!-- 5 -->
      <Field
        rules="required"
        :modelValue="forms.is_diploma"
        v-slot="{ errors }"
        name="Is_Diploma"
      >
        <select v-model="forms.is_diploma" class="form-control my-2">
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <button class="btn btn-success" type="submit" @click="save">save</button>
    </Form>
  </AppModal>
</template>

<script setup>
import AppModal from "../ui/app-modal.vue";
import { ref, watch } from "vue";
import http from "../plugins/axios";
import { createToast } from "mosha-vue-toastify";
import { Form, Field } from "vee-validate";
const dialog = ref(false);

const toastcreate = () => {
  createToast("Successfully created! (Reloading...)", {
    position: "top-right",
    type: "success",
    transition: "bounce",
  });
};

const toastedit = () => {
  createToast("Successfully edited! (Reloading...)", {
    position: "top-right",
    type: "warning",
    transition: "bounce",
  });
};

const forms = ref({
  name: "",
  surname: "",
  address: "",
  age: null,
  is_diploma: false,
});

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});
const openModal = (value) => {
  if (value) forms.value = { ...value };
  dialog.value = true;
};

const save = (e) => {
  e.preventDefault();
  try {
    if (!forms.value._id) {
      http
        .post("/users/add", {
          name: forms.value.name,
          surname: forms.value.surname,
          address: forms.value.address,
          age: forms.value.age,
          is_diploma: forms.value.is_diploma == "yes" ? true : false,
        })
        .then((res) => {
          console.log(res);
          toastcreate();
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    } else {
      http
        .patch(`/users/update/${forms.value._id}`, {
          name: forms.value.name,
          surname: forms.value.surname,
          address: forms.value.address,
          age: forms.value.age,
          is_diploma: forms.value.is_diploma == "yes" ? true : false,
        })
        .then((res) => {
          console.log(res);
          toastedit();
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    }
  } catch (err) {
    console.log(err);
  }
};
defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
