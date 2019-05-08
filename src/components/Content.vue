<template>
  <div class="content">
    <div class="item"
      :class="{
        time: status === REVERSING && theLostHeroIds.indexOf(hero.id) > -1,
        hidden: hideDone.indexOf(hero.id) > -1,
        visible: status === PEDDING || status === REVERSING
      }"
      :id="hero.id"
      v-for="(hero, index) in heroes"
      :key="index">
      <div class="item-body">
        <div class="avatar">
          <img :src="hero.src"
            alt="" />
        </div>
        <div class="info">{{hero.name}}</div>
      </div>
    </div>
    <DustHero v-for="id in theLostHeroIds"
      :class="`hero-${id}`"
      :heroId="id"
      @hide-hero="hideHero"
      :key="`hero-${id}`"></DustHero>
  </div>
</template>

<script>
import DustHero from "./DustHero";
import { statusMixin } from "@/global/mixins";
import Bus from "@/global/Bus.js";
export default {
  name: "Content",
  props: {
    heroes: Array,
    status: String
  },
  data() {
    return {
      theLostHeroIds: [],
      hideDone: []
    };
  },
  mixins: [statusMixin],
  methods: {
    hideHero(id) {
      this.hideDone.push(id);
    }
  },
  components: {
    DustHero
  },
  created() {
    Bus.$on("hide-hero", id => {
      this.theLostHeroIds.push(id);
    });
    Bus.$on("reverse-time", () => {
      this.hideDone = [];
      setTimeout(() => {
        this.$parent.changeStatus(this.PEDDING);
        this.theLostHeroIds = [];
      }, 2000);
    });
  },
  beforeDestroy() {
    Bus.$off("hide-hero");
    Bus.$off("reverse-time");
  }
};
</script>

<style lang="scss" scoped>
// hero num is 16
@for $i from 0 to 16 {
  .hero-#{$i + 1} {
    top: 220px + floor($i/4) * 280px;
    left: 330px + floor($i%4) * 245px;
  }
}
.visible {
  visibility: visible;
}
.hidden {
  visibility: hidden;
}
</style>

