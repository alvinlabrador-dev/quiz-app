<template>
  <svg :class="`icon icon-${name}`">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
export default {
  name: "AppIcon",
  props: ["name"]
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
