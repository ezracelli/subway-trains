<template>
  <nuxt />
</template>

<script>
export default {}
</script>

<style lang="scss">
@keyframes spin {
  from { transform: rotate(0deg) }
  to { transform: rotate(359deg) }
}

.icon-spinner2 {
  animation: spin 0.3s linear infinite;
}

.btn {
  display: inline-flex;
  align-items: center;

  &.btn-block {
    display: flex;
    justify-content: center;
  }

  i:first-child {
    margin-right: 0.5rem;
  }

  i:last-child {
    margin-left: 0.5rem;
  }
}
</style>
