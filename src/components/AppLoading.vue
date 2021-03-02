<template>
  <div class="loading">
    <slot>
      <h1>Loading</h1>
    </slot>
  </div>
</template>

<script>
export default {
  name: "AppLoading"
};
</script>

<style lang="scss" scoped>
.loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    width: 4rem;
    height: 4rem;
    display: block;
    border-radius: 5rem;
    border: 0.25rem dashed #fff;
    margin: 0 1rem 0 0;
    animation: loading 5s linear infinite;
  }
}
@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}
</style>
