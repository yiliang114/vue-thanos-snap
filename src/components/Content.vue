<template>
  <div class="content">
    <div class="item"
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
      default: []
    }
  }
};
</script>
