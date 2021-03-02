<template>
  <button>
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton"
};
</script>

<style lang="scss" scoped>
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  height: 3.75rem;
  color: #262626;
  background: linear-gradient(45deg, #f2c94c 0, #f2994a 100%);
  border: 0;
  outline: 0;
  border-radius: 0.375rem;
  font: inherit;
  font-weight: 700;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    opacity: 0.9;
    transform: translate(0, -0.25rem);
  }
}
</style>
