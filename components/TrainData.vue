<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="View by car number">
        <train-with-lines
          v-for="(lines, carNumber) in cars"
          :key="carNumber"
          v-bind="{ carNumber, lines }"
        />
      </b-tab>
      <b-tab title="View by line">
        <line-with-trains
          v-for="(carNumbers, line) in lines"
          :key="line"
          v-bind="{ line, carNumbers }"
        />
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import TrainWithLines from './TrainWithLines'
import LineWithTrains from './LineWithTrains'

export default {
  components: { TrainWithLines, LineWithTrains },
  computed: mapGetters([ 'cars', 'lines' ]),
}
</script>

<style scoped lang="scss">

</style>
