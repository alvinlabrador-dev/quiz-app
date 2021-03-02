<template>
  <div class="btn-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ButtonGroup"
};
</script>

<style lang="scss" scoped>
.btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
