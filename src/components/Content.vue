<template>
  <div class="content">
    <div class="item"
      :style="reversingClass[hero.id] ? 'visibility: visible;': ''"
      :class="reversingClass[hero.id] ? 'time': ''"
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
  </div>
</template>

<script>
export default {
  name: "Content",
  props: {
    heroes: {
      type: Array,
      default: function() {
        return [];
      }
    },
    heroHided: {
      type: Array,
      default: function() {
        return [];
      }
    },
    reversing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reversingClass: {}
    };
  },
  watch: {
    reversing: function(val, oldVal) {
      // is reversing now
      if (val && !oldVal) {
        // this.reversingClass
        let obj = {};
        this.heroHided.forEach(heroId => {
          obj[heroId] = true;
        });
        this.reversingClass = obj;
      } else {
        // teardown watcher
        const keys = Object.keys(this.reversingClass);
        keys.forEach(key => {
          this.$delete(this.reversingClass, key);
        });
        this.snapingClass = {};
      }
    }
  }
};
</script>
