<template>
  <div class="line row">
    <div class="col-auto p-0">
      <img
        :src="`/icons/${line}.svg`"
        :alt="line"
        class="bullet-icon"
      >
    </div>

    <div class="col p-0">
      <template
        v-for="(carNumber, index) in carNumbers"
      > {{ carNumber }}<template v-if="carNumbers[index + 1]">,</template></template>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    line: String,
    carNumbers: Array,
  },
}
</script>

<style scoped lang="scss">
.line {
  align-items: center;
  flex-wrap: nowrap;
  padding: 0.5rem 1rem;
}

.bullet-icon {
  margin-right: 0.7rem;
  width: 2rem;
  height: 2rem;
}
</style>
