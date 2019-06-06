<template>
  <div class="car">
    <span>{{ carNumber }}</span>
    <img
      v-for="line in lines"
      :key="line"
      :src="`/icons/${line}.svg`"
      :alt="line"
      class="bullet-icon"
    >
  </div>
</template>

<script>

export default {
  props: {
    carNumber: String,
    lines: Array,
  },
}
</script>

<style scoped lang="scss">
.car {
  align-items: center;
  display: inline-flex;
  padding: 0.5rem 1rem;
}

.bullet-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.25rem;

  &:first-of-type {
    margin-left: 0.5rem;
  }
}
</style>
