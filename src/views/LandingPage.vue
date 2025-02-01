<template>
  <div :class="['landing-page']">
    <!-- Greeting text -->
    <div class="header-container">
      <h1 class="valentine-text">Hi, Little spoon</h1>
      <p v-if="showInstructions" class="instruction-text">Water the flowers to see the magic!</p>
    </div>

    <!-- Bouquet container at bottom center -->
    <div class="bouquet">
      <!-- FLOWER 1 (rose) -->
      <div class="flower flower1">
        <div class="stem stem1">
          <div class="leaf leaf-left"></div>
          <div class="leaf leaf-right"></div>
        </div>
        <div class="rose rose1">
          <!-- Five petals + center for the rose -->
          <div class="petal petal1"></div>
          <div class="petal petal2"></div>
          <div class="petal petal3"></div>
          <div class="petal petal4"></div>
          <div class="petal petal5"></div>
          <div class="rose-center"></div>
        </div>
      </div>

      <!-- TULIP (NEW) -->
      <div class="flower flower--tulip">
        <div class="stem stem--tulip"></div>
        <div class="tulip-bloom">
          <!-- 3 or 4 main petals for a tulip-like shape -->
          <div class="tulip-petal tulip-petal--front"></div>
          <div class="tulip-petal tulip-petal--left"></div>
          <div class="tulip-petal tulip-petal--right"></div>
          <!-- optional "back" petal or overlap if you want it fuller -->
        </div>
      </div>

      <!-- FLOWER 2 (the “blue” flower) -->
      <div class="flower flower--blue">
        <div class="flower__line">
          <!-- Stem leaves -->
          <div class="flower__line__leaf flower__line__leaf--1"></div>
          <div class="flower__line__leaf flower__line__leaf--2"></div>
          <div class="flower__line__leaf flower__line__leaf--3"></div>
          <div class="flower__line__leaf flower__line__leaf--4"></div>
          <div class="flower__line__leaf flower__line__leaf--5"></div>
          <div class="flower__line__leaf flower__line__leaf--6"></div>

          <!-- Top "bloom" -->
          <div class="flower__leafs flower__leafs--blue">
            <div class="flower__leaf flower__leaf--1"></div>
            <div class="flower__leaf flower__leaf--2"></div>
            <div class="flower__leaf flower__leaf--3"></div>
            <div class="flower__leaf flower__leaf--4"></div>
            <div class="flower__white-circle"></div>
          </div>
        </div>
      </div>

      <!-- TULIP (NEW) -->
      <div class="flower flower--tulip2">
        <div class="stem stem--tulip"></div>
        <div class="tulip-bloom">
          <!-- 3 or 4 main petals for a tulip-like shape -->
          <div class="tulip-petal tulip-petal--front"></div>
          <div class="tulip-petal tulip-petal--left"></div>
          <div class="tulip-petal tulip-petal--right"></div>
          <!-- optional "back" petal or overlap if you want it fuller -->
        </div>
      </div>

      <!-- FLOWER 3 (another rose) -->
      <div class="flower flower3">
        <div class="stem stem3">
          <div class="leaf leaf-left"></div>
          <div class="leaf leaf-right"></div>
        </div>
        <div class="rose rose3">
          <!-- Five petals + center for the rose -->
          <div class="petal petal1"></div>
          <div class="petal petal2"></div>
          <div class="petal petal3"></div>
          <div class="petal petal4"></div>
          <div class="petal petal5"></div>
          <div class="rose-center"></div>
        </div>
      </div>
      
    </div>

    <!-- Watering can -->
    <div
      v-if="!showButterflies"
      class="watering-can"
      :class="{ 'fade-in': wateringCanVisible }"
      @mousedown="startWatering"
      @mouseup="stopWatering"
      @mousemove="waterFlowers"
      :style="{ top: `${wateringCanPosition.y}px`, left: `${wateringCanPosition.x}px` }"
    >
      <div v-if="watering" class="water-droplets"></div>  
    </div>
  

    <!-- Progress bar -->
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: `${waterProgress}%` }"></div>
    </div>

    <!-- Butterflies transition -->
    <div v-if="showButterflies" class="butterflies-overlay"></div>

  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      watering: false,
      waterProgress: 0,
      showButterflies: false,
      wateringCanPosition: { x: window.innerWidth - 400, y: window.innerHeight / 2 }, 
      showInstructions: true,
      wateringCanVisible: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.wateringCanVisible = true;
    }, 2000); 
  },
  methods: {
    startWatering(event) {
      this.watering = true;
      this.updateWateringCanPosition(event);
      this.hideInstructions(); 
    },
    stopWatering() {
      this.watering = false;
    },
    waterFlowers(event) {
      if (this.watering) {
        this.updateWateringCanPosition(event);

        if (this.waterProgress < 100) {
          this.waterProgress += 0.5;
        }

        if (this.waterProgress >= 100 && !this.showButterflies) {
          this.waterProgress = 100;
          this.triggerButterflies(); 
        }
      }
    },
    updateWateringCanPosition(event) {
      const offsetX = 25;
      const offsetY = 25;

      this.wateringCanPosition = {
        x: event.clientX - offsetX, 
        y: event.clientY - offsetY, 
      };
    },
    triggerButterflies() {
      this.showButterflies = true;

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });

      setTimeout(() => {
        this.$router.push("/question");
      }, 6000); 
  },
    smoothScrollToTop(callback) {
      const duration = 1000;
      const step = window.scrollY / (duration / 16); 
      const scrollAnimation = () => {
        if (window.scrollY > 0) {
          window.scrollBy(0, -step);
          requestAnimationFrame(scrollAnimation);
        } else if (callback) {
          callback(); 
        }
      };
      scrollAnimation();
    },
    hideInstructions() {
      this.showInstructions = false; 
    },
  },
};
</script>

<style scoped lang="scss">
/* ======================
   1) Page + Greeting
====================== */
.landing-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    #ffd6e0 0%,
    #ff9ab5 100%
  );
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5rem;
}

.valentine-text {
  font-family: "Indie Flower", cursive;
  font-size: 5rem; 
  color: #ff3399;
  text-shadow: 3px 3px 0 #fff, 5px 5px 5px rgba(0, 0, 0, 0.2); 
  opacity: 0;
  animation: fadeInUp 1.5s ease forwards 0.5s;
}

.valentine-text,
.instruction-text {
  pointer-events: none; /* Prevent interaction */
  user-select: none; /* Disable text selection */
  outline: none; /* Remove focus outline */
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Instruction Text */
.header-container .instruction-text {
  font-family: "Indie Flower", cursive;
  font-size: 1.2rem;
  color: #ff3399;
  text-align: center;
  margin-top: 0.5rem;
  animation: fadeInUp 1.5s ease forwards 2s; 
  opacity: 0;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}


/* ======================
   2) Bouquet Container
====================== */
.bouquet {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

/* ======================
   3) Flower (Shared)
====================== */
.flower {
  position: absolute;
  bottom: 0;
  transform-origin: bottom center;
}

/* 
   ======================
   4) ROSE FLOWERS (1,3)
   ======================
*/
/* FLOWER 1: Rose on the left */
.flower1 {
  animation: moving-flower-1 4s linear infinite;
}

@keyframes moving-flower-1 {
  0%, 100% {
    transform: translateX(-2.5rem) rotate(-20deg);
  }
  50% {
    transform: translateX(-2.5rem) rotate(-15deg);
  }
}

/* FLOWER 3: Rose on the right */
.flower3 {
  animation: moving-flower-3 4s linear infinite;
}

.flower3 .petal {
  background: radial-gradient(circle at 30% 30%, #fff, #fb8ad3 70%);
}

.flower3 .rose-center {
  background: radial-gradient(circle at 30% 30%, #fff, #ff00a6 80%);
}

@keyframes moving-flower-3 {
  0%, 100% {
    transform: translateX(2.5rem) rotate(20deg);
  }
  50% {
    transform: translateX(2.5rem) rotate(15deg);
  }
}

/* ROSE STEM */
.stem {
  position: relative;
  width: 0.5rem;
  height: 12rem;
  background: #40a559; /* green */
  transform-origin: bottom center;
  transform: scaleY(0);
  animation: growStem 1.5s forwards ease-in;
}

.stem1 {
  animation-delay: 0s;
}

.stem3 {
  animation-delay: 0.8s;
}

@keyframes growStem {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}

/* ROSE LEAVES on the stem */
.leaf {
  position: absolute;
  width: 1.5rem;
  height: 0.8rem;
  background: #40a559;
  border-radius: 50%;
  transform-origin: center;
  opacity: 0;
  animation: leafGrow 1s forwards ease-out;
  animation-delay: 1s;
}

.leaf-left {
  left: -1.6rem;
  bottom: 50%;
  transform: rotate(-30deg);
}

.leaf-right {
  right: -1.6rem;
  bottom: 60%;
  transform: rotate(30deg);
}

@keyframes leafGrow {
  0% {
    transform: scale(0.1) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* ROSE BLOOM: 5 petals + center */
.rose {
  position: absolute;
  left: 50%;
  width: 4rem;
  height: 11rem;
  transform: translateX(-50%) scale(0);
  animation: bloomRose 1s forwards ease-out;
}

.rose1 {
  bottom: 8rem;
  animation-delay: 1.5s;
}

.rose3 {
  bottom: 6rem;
  animation-delay: 2.3s;
}

@keyframes bloomRose {
  0% {
    transform: translateX(-50%) scale(0);
  }
  75% {
    transform: translateX(-50%) scale(1.1);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}

/* Rose petals */
.petal {
  position: absolute;
  width: 2rem;
  height: 2.8rem;
  left: 50%;
  top: 50%;
  transform-origin: center bottom;
  border-radius: 50% 50% 0 0;
  background: radial-gradient(circle at 30% 30%, #fff7f9, #f48da3 70%);
}

.petal1 {
  transform: translate(-50%, -70%) rotate(0deg);
}
.petal2 {
  transform: translate(-50%, -70%) rotate(72deg);
}
.petal3 {
  transform: translate(-50%, -70%) rotate(144deg);
}
.petal4 {
  transform: translate(-50%, -70%) rotate(216deg);
}
.petal5 {
  transform: translate(-50%, -70%) rotate(288deg);
}

/* Rose center */
.rose-center {
  position: absolute;
  left: 50%;
  top: 57%;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffbccd, #f6657b 80%);
  z-index: 2;
}

/* ======================
   5) The "Blue" Flower (Flower 2)
   ====================== */
.flower--blue {
  position: absolute;
  left: 50%;
  bottom: 0;
  animation: moving-flower-2 4s linear infinite;
  transform-origin: bottom center;
  --fl-speed: 0.8s;
}

@keyframes moving-flower-2 {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

/* The stem (line) for the blue flower */
.flower__line {
  position: relative;
  height: 40vmin;
  width: 1.5vmin;
  background-image: linear-gradient(
      to left,
      rgba(0, 0, 0, 0.2),
      transparent,
      rgba(255, 255, 255, 0.2)
    ),
    linear-gradient(to top, transparent 10%, #147a2c, #57c272);
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
  animation: grow-flower-tree 4s forwards;
}

@keyframes grow-flower-tree {
  0% {
    height: 0;
    border-radius: 1vmin;
  }
  100% {
    height: 40vmin;
    border-radius: 0;
  }
}

/* Leaves on the blue flower’s stem */
.flower__line__leaf {
  --w: 7vmin;
  --h: calc(var(--w) + 2vmin);
  position: absolute;
  top: 20%;
  left: 90%;
  width: var(--w);
  height: var(--h);
  border-top-right-radius: var(--h);
  border-bottom-left-radius: var(--h);
  background-image: linear-gradient(to top, rgba(20, 122, 66, 0.4), #57c272);
}

.flower__line__leaf--1 {
  animation: blooming-leaf-right var(--fl-speed) 1.6s backwards;
  transform: rotate(70deg) rotateY(30deg);
}
.flower__line__leaf--2 {
  top: 45%;
  animation: blooming-leaf-right var(--fl-speed) 1.4s backwards;
  transform: rotate(70deg) rotateY(30deg);
}
.flower__line__leaf--3,
.flower__line__leaf--4,
.flower__line__leaf--6 {
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--h);
  border-bottom-right-radius: var(--h);
  left: -460%;
  top: 12%;
  animation: blooming-leaf-left var(--fl-speed) 1.2s backwards;
  transform: rotate(-70deg) rotateY(30deg);
}
.flower__line__leaf--4 {
  top: 40%;
  animation-delay: 1s;
}
.flower__line__leaf--5 {
  top: 0;
  transform-origin: left;
  animation: blooming-leaf-right var(--fl-speed) 1.8s backwards;
  transform: rotate(70deg) rotateY(30deg) scale(0.6);
}
.flower__line__leaf--6 {
  top: -2%;
  left: -450%;
  transform-origin: right;
  animation: blooming-leaf-left var(--fl-speed) 2s backwards;
  transform: rotate(-70deg) rotateY(30deg) scale(0.6);
}

/* The top bloom (petals) for the blue flower */
.flower__leafs--blue {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  animation: blooming-flower 1.5s forwards 3s;
}

@keyframes blooming-flower {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Each main petal at the top */
.flower__leaf {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  width: 8vmin;
  height: 11vmin;
  border-radius: 51% 49% 47% 53% / 44% 45% 55% 69%;
  background-color: #feffa7;
  background-image: linear-gradient(to top, #b8b654, #feffa7);
  transform-origin: bottom center;
  opacity: 0.9;
  box-shadow: inset 0 0 2vmin rgba(255, 255, 255, 0.5);
}

.flower__leaf--1 {
  transform: translate(-10%, 1%) rotateY(40deg) rotateX(-50deg);
}
.flower__leaf--2 {
  transform: translate(-50%, -4%) rotateX(40deg);
}
.flower__leaf--3 {
  transform: translate(-90%, 0%) rotateY(45deg) rotateX(50deg);
}
.flower__leaf--4 {
  width: 8vmin;
  height: 8vmin;
  transform-origin: bottom left;
  border-radius: 4vmin 10vmin 4vmin 4vmin;
  transform: translate(0%, 18%) rotateX(70deg) rotate(-43deg);
  background-image: linear-gradient(to top, #39c6d6, #a7ffee);
  z-index: 1;
  opacity: 0.8;
}

/* White oval center for the blue flower’s bloom */
.flower__white-circle {
  position: absolute;
  left: 50%;
  top: -4vmin;
  transform: translateX(-50%);
  width: 9vmin;
  height: 4vmin;
  border-radius: 50%;
  background-color: #fff;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    border-radius: inherit;
    background-image: repeating-linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.03) 0px,
        rgba(0, 0, 0, 0.03) 1px,
        transparent 1px,
        transparent 12px
      ),
      linear-gradient(90deg, rgb(255, 235, 18), rgb(255, 206, 0));
  }
}

/* Keyframes for leaves on the blue flower */
@keyframes blooming-leaf-right {
  0% {
    transform-origin: left;
    transform: rotate(70deg) rotateY(30deg) scale(0);
  }
  100% {
    transform: rotate(70deg) rotateY(30deg) scale(1);
  }
}

@keyframes blooming-leaf-left {
  0% {
    transform-origin: right;
    transform: rotate(-70deg) rotateY(30deg) scale(0);
  }
  100% {
    transform: rotate(-70deg) rotateY(30deg) scale(1);
  }
}

/* =============== TULIP (NEW) =============== */

/* 1) Tulip container */
.flower--tulip {
  position: absolute;
  bottom: 0;
  /* place it a bit left of center to fit between the first rose and the blue flower */
  transform: translateX(-1rem) rotate(-10deg);
  transform-origin: bottom center;
  animation: moving-tulip 4s linear infinite; 
}

.flower--tulip2 {
  transform: translateX(1.5rem) rotate(10deg); 
}

.flower--tulip2 .stem--tulip {
  animation-delay: 1s;
  height: 6rem;
}

.flower--tulip2 .tulip-petal {
  background: linear-gradient(to top, #ff4f4f, #ff8282); 
}

@keyframes moving-tulip {
  0%, 100% {
    transform: translateX(-1rem) rotate(-10deg);
  }
  50% {
    transform: translateX(-1rem) rotate(-6deg);
  }
}

/* 2) Tulip stem reusing your growStem animation */
.stem--tulip {
  position: relative;
  width: 0.4rem;
  height: 8rem;
  background: #57c272;
  transform-origin: bottom;
  transform: scaleY(0);
  animation: growStem 1.5s forwards ease-in;
  /* optional delay if you want it to appear after the rose */
  animation-delay: 0.5s;
}

/* 3) Tulip bloom container */
.tulip-bloom {
  position: absolute;
  bottom: 8rem;  
  left: 50%;
  transform: translateX(-50%) scale(0);
  animation: bloomTulip 1.5s forwards ease-out 1.5s;
}

.flower--tulip2 .tulip-bloom {
  position: absolute;
  bottom: 5rem;  
  left: 50%;
  transform: translateX(-50%) scale(0);
  animation: bloomTulip 3s forwards ease-out 3s;
}

@keyframes bloomTulip {
  0% {
    transform: translateX(-50%) scale(0);
  }
  75% {
    transform: translateX(-50%) scale(1.1);
  }
  100% {
    transform: translateX(-50%) scale(1);
  }
}

/* 4) Tulip petals */
.tulip-petal {
  position: absolute;
  width: 1.8rem;
  height: 2.2rem;
  background: linear-gradient(to top, #e24fff, #ff82e6); 
  border-radius: 50% 50% 20% 20%; /* gives a "tulip" shape at the top */
  transform-origin: bottom center;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}

/* Front petal is centered */
.tulip-petal--front {
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 2;
}

/* Left petal slightly rotated to the left */
.tulip-petal--left {
  left: 35%;
  bottom: 0;
  transform: rotateY(15deg);
  z-index: 1;
}

/* Right petal slightly rotated to the right */
.tulip-petal--right {
  right: 35%;
  bottom: 0;
  transform: rotateY(-15deg);
  z-index: 1;
}

/* (Optional) add a "back" petal for fullness 
.tulip-petal--back {
  left: 50%;
  bottom: 0;
  transform: translateX(-50%) rotateX(20deg);
  z-index: 0;
  opacity: 0.8;
}
*/

/* Watering can */
.watering-can {
  position: absolute; 
  width: 5rem;
  height: 5rem;
  background: url('/src/assets/watering-can.png') no-repeat center;
  background-size: contain;
  cursor: pointer;
  z-index: 10;
  opacity: 0;
  transform: translateY(20px);

  &.fade-in {
    animation: fadeInUp 1.5s ease forwards 2s;
  }
}

.watering-can {
  caret-color: transparent;
  outline: none; 
  user-select: none;
  cursor: grab;
}

.watering-can:active {
  cursor: grabbing;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hoverEffect {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.water-droplets {
  position: absolute;
  top: 80%;
  transform: translate(-50%, 0);
  width: 1rem;
  height: 2rem;
  background: linear-gradient(to bottom, #87cefa, rgba(135, 206, 250, 0));
  border-radius: 50%;
  animation: drip 1s infinite;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 0.5rem;
    height: 1rem;
    background: linear-gradient(to bottom, #00bfff, rgba(0, 191, 255, 0));
    border-radius: 50%;
    animation: drip 1s infinite 0.2s;
  }
}

@keyframes drip {
  0% {
    transform: translate(-50%, 0) scaleY(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 2rem) scaleY(0.5);
    opacity: 0;
  }
}

.progress-container {
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1rem;
  background: #ffe4e1;
  border-radius: 0.5rem;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #ff69b4, #ff1493);
  border-radius: 0.5rem;
  transition: width 0.3s ease;
}

.butterflies-overlay {
  position: absolute;
  bottom: 20%;
  left: 0;
  width: 100%;
  height: 60vh;
  background: url("/src/assets/butterflies.gif") no-repeat center;
  background-size: contain;
  z-index: 10;
  opacity: 0; /* Initially hidden */
  animation: fadeInButterflies 3s ease-in forwards; /* Smooth fade-in */
}

@keyframes fadeInButterflies {
  0% {
    opacity: 0;
    transform: scale(0.9); /* Start slightly smaller for a growing effect */
  }
  50% {
    opacity: 0.5;
    transform: scale(1); /* Full size but still fading */
  }
  100% {
    opacity: 1;
  }
}

.landing-page.fade-out {
  animation: fadeOut 1s ease forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

