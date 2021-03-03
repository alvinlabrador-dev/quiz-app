<template>
  <div class="progress">
    <div
      class="progress__item"
      :class="{
        'progress__item--correct': item.status === 'correct',
        'progress__item--incorrect': item.status === 'incorrect',
        'progress__item--current': current === index + 1
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
  props: ["items", "current"],
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
  max-width: 31.25rem;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    max-width: 100%;
  }

  &__item {
    width: 1.4rem;
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    text-align: center;
    background: #b7b7b7;
    color: #2c5364;
    border: 2px solid #ffffff;
    transition: 0.2s;
    font-weight: 600;
    position: relative;
    font-size: 12px;

    @media screen and (min-width: 768px) {
      width: 2.625rem;
      height: 2.625rem;
      border-width: 0.25rem;
      font-size: inherit;
    }

    &::after {
      content: "";
      display: block;
      width: 180%;
      position: absolute;
      height: 0.25rem;
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
    &--incorrect,
    &--current {
      background: #ffffff;
    }

    &--current {
      border-color: #f2994a;

      &::after {
        background: #f2994a;
      }
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
