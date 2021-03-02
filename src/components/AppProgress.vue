<template>
  <div class="progress">
    <div
      class="progress__item"
      :class="{
        'progress__item--correct': item.status === 'correct',
        'progress__item--incorrect': item.status === 'incorrect'
      }"
      v-for="(item, index) in items"
      :key="item.id"
    >
      <template v-if="item.status === 'correct'">
        <app-icon name="check" />
      </template>
      <template v-else-if="item.status === 'incorrect'">
        <app-icon name="x" />
      </template>
      <template v-else> {{ index + 1 }} </template>
    </div>
  </div>
</template>

<script>
import AppIcon from "@/components/AppIcon";
export default {
  name: "AppProgress",
  props: ["items"],
  components: {
    AppIcon
  }
};
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  &__item {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    text-align: center;
    background: #b7b7b7;
    color: #2c5364;
    border: 4px solid #ffffff;
    transition: 0.2s;
    font-weight: 600;
    position: relative;

    &::after {
      content: "";
      display: block;
      width: 180%;
      position: absolute;
      height: 4px;
      left: 100%;
      top: 50%;
      z-index: -1;
      background: #ffffff;
      transition: 0.2s;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }

    &--correct,
    &--incorrect {
      background: #ffffff;
    }

    &--correct {
      border-color: #00a87a;
      color: #00a87a;

      &::after {
        background: #00a87a;
      }
    }

    &--incorrect {
      border-color: #f25b4a;
      color: #f25b4a;

      &::after {
        background: #f25b4a;
      }
    }
  }
}
</style>
