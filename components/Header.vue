<template functional>
  <header class="parallax">
    <slot></slot>
  </header>
</template>

<style lang="less">
/* could be controlled from out of this component to make it reusable*/
@background: '/bg.jpg';

.parallax {
  width: 100%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(@background);
  background-position: center center;
}
</style>
