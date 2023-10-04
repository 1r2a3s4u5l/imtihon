<template>
  <div class="container">
    <productsM ref="product_modal" />
    <div class="mb-3">
      <button @click="createItem" class="btn btn-success">
        Create Product
      </button>
      <button @click="logOut" class="btn btn-danger">LogOut</button>
    </div>
    <div class="row">
      <div
        class="col-6 my-2"
        v-for="(item, index) in items.products"
        :key="index"
      >
        <div class="card">
          <div class="card-body">
            <h3>Ismi: {{ item.description }}</h3>
            <h3>Guruhi: {{ item.group }}</h3>
            <h4>Nomi: {{ item.name }}</h4>
            <h4>Narxi: {{ item.price }}</h4>
            <h4>Sotish narxi: {{ item.selling_price }}</h4>
          </div>
          <div class="card-footer">
            <button class="btn btn-info" @click="editItem(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteItem(item._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import http from "../../components/plugins/axios";
import productsM from "../../components/pages/products-m.vue";
import { createToast } from "mosha-vue-toastify";

const toastdelete = () => {
  createToast("Successfully deleted! (Reloading...)", {
    position: "top-right",
    type: "success",
    transition: "bounce",
  });
};

const items = ref([]);
const product_modal = ref();
const getUsers = () => {
  http
    .get("products")
    .then((res) => {
      res.data = res.data;
      items.value = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteItem = (_id) => {
  http
    .delete(`/products/${_id}`)
    .then((res) => {
      console.log(res);
      if (res.status === 202) {
        toastdelete();
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const createItem = () => {
  product_modal.value.openModal();
};

const editItem = (item) => {
  product_modal.value.openModal(item);
};

const logOut = () => {
  localStorage.removeItem("token");
  location.reload();
};
getUsers();
</script>

<style lang="scss" scoped>
.btn-first {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
</style>
