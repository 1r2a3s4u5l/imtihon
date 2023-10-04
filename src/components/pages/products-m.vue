<template>
  <AppModal v-model="dialog">
    <h1 v-if="!forms._id">Add Product</h1>
    <h1 v-else>Edit Product</h1>
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
        :modelValue="forms.group"
        v-slot="{ errors }"
        name="Group"
      >
        <input
          type="text"
          v-model="forms.group"
          class="form-control my-2"
          placeholder="Group"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="forms.brand"
        v-slot="{ errors }"
        name="Brand"
      >
        <input
          type="text"
          v-model="forms.brand"
          class="form-control my-2"
          placeholder="Brand"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="forms.description"
        v-slot="{ errors }"
        name="Description"
      >
        <input
          type="text"
          v-model="forms.description"
          class="form-control my-2"
          placeholder="Description"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="forms.arrival_price"
        v-slot="{ errors }"
        name="Arrival price"
      >
        <input
          type="number"
          v-model="forms.arrival_price"
          class="form-control my-2"
          placeholder="Arrival price"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="forms.price"
        v-slot="{ errors }"
        name="Price"
      >
        <input
          type="number"
          v-model="forms.price"
          class="form-control my-2"
          placeholder="Price"
        />
        <p class="text-danger" v-if="errors && errors.length">
          {{ errors[0] }}
        </p>
      </Field>

      <Field
        rules="required"
        :modelValue="forms.selling_price"
        v-slot="{ errors }"
        name="Selling price"
      >
        <input
          type="number"
          v-model="forms.selling_price"
          class="form-control my-2"
          placeholder="Selling price"
        />
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
  group: "",
  brand: "",
  description: "",
  arrival_price: null,
  price: null,
  selling_price: null,
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
        .post("/products/add", {
          name: forms.value.name,
          group: forms.value.group,
          brand: forms.value.brand,
          description: forms.value.description,
          arrival_price: forms.value.arrival_price,
          price: forms.value.price,
          selling_price: forms.value.selling_price,
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
        .patch(`/products/update/${forms.value._id}`, {
          name: forms.value.name,
          group: forms.value.group,
          brand: forms.value.brand,
          description: forms.value.description,
          arrival_price: forms.value.arrival_price,
          price: forms.value.price,
          selling_price: forms.value.selling_price,
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
