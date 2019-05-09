<template>
  <div class="main">
    <div class="gauntlet">
      <div class="gauntlet-wrapper">
        <div id="gauntlet-snap"
          v-show="status === PEDDING || status === SNAPING"
          :class="status === SNAPING? 'snaping':''"
          class="gauntlet-item"
          @click="snapHandle"></div>
        <div id="gauntlet-reverse"
          v-show="status === DONE || status === REVERSING"
          :class="status === REVERSING? 'reversing':''"
          class="gauntlet-item"
          @click="reverseHandle"></div>
      </div>
    </div>

    <Content :heroes="heroes"
      :status="status" />

    <audio preload
      ref="allAuduio"></audio>
  </div>
</template>

<script>
import Content from "./Content";
import { statusMixin } from "@/global/mixins";
import { heroes } from "@/config";
import Bus from "@/global/Bus.js";
export default {
  name: "GauntletMain",
  data() {
    return {
      status: "PEDDING",
      heroes,
      stay: 4
    };
  },
  mixins: [statusMixin],
  methods: {
    changeStatus(status) {
      this.status = status;
    },
    sleep(delay) {
      return new Promise(resovle => {
        setTimeout(() => {
          resovle();
        }, delay || 2000);
      });
    },
    snapHandle() {
      // can not click until harf heroes becomes dust
      if (this.status === this.SNAPING || this.status === this.REVERSING)
        return;
      this.status = this.SNAPING;
      this.playAudio("snap");

      // select half heroes randomly
      setTimeout(async () => {
        // get half heroes randomly
        const heroesDisappered = this.heroes
          .slice(0)
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.ceil(this.heroes.length / 2));

        // hero becomes dust in turn.
        for (let i = 0; i < heroesDisappered.length; i++) {
          /* eslint-disable */
          if (!!i) await this.sleep();
          this.$nextTick(() => {
            this.playAudio();
            Bus.$emit("hide-hero", heroesDisappered[i].id);
          });
        }
        this.$nextTick(() => {
          this.status = this.DONE;
        });
      }, 2500);
    },
    reverseHandle() {
      if (this.status === this.SNAPING || this.status === this.REVERSING)
        return;
      this.status = this.REVERSING;
      Bus.$emit("reverse-time");
      this.playAudio("reverse");
    },
    playAudio(target) {
      const audio = this.$refs.allAuduio;
      if (!audio) return;
      if (!audio.paused) {
        audio.pause();
      }
      if (["snap", "reverse"].indexOf(target) > -1) {
        audio.src = require(`../assets/audios/thanos_${target}_sound.mp3`);
      } else {
        // 消失音频每段大概 4s
        let index = target || Math.floor(Math.random() * 6 + 1);
        audio.src = require(`../assets/audios/thanos_dust_${index}.mp3`);
      }
      audio.play();
    }
  },
  components: {
    Content
  }
};
</script>

<style lang="scss">
.main {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  .gauntlet {
    height: 100px;
  }
  .gauntlet-item {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
  #gauntlet-snap {
    background: transparent url("../assets/thanos/thanos_snap.png") center left
      no-repeat;
    background-position: 0 0;
  }
  #gauntlet-reverse {
    background: transparent url("../assets/thanos/thanos_reverse.png") center
      left no-repeat;
    background-position: 0 0;
  }
  .snaping,
  .reversing {
    animation: gauntlet 2.8s steps(47) both;
  }
}
</style>