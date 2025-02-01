<template>
  <div class="passcode-game">
    <h1 class="valentine-text">The key to something special</h1>
    <div class="spacer"></div>
    <div class="passcode-container">
      <div class="media-container">
        <template v-if="isPasscodeCorrect">
          <img src="/src/assets/happy.gif" alt="Happy Animation" class="side-gif" />
          <audio autoplay class="side-audio">
            <source src="/src/assets/happy.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </template>
        <template v-else>
          <img src="/src/assets/cat.jpg" alt="cat" class="side-image" />
        </template>
      </div>
      <div>
        <div class="passcode-display">
          {{ enteredPasscode }}
          <div class="dot-indicator">
            <span v-for="dot in 8" :key="dot" :class="{ filled: dot <= enteredPasscode.length }"></span>
          </div>
          <p v-if="showError" class="error-message">
            Oh, sweetie, that’s not it. Give it another shot!
          </p>
          <p v-if="isPasscodeCorrect" class="success-message">
            ✨ Correct! Let's move on ✨
          </p>
        </div>
        <div class="keypad">
          <button v-for="number in numbers" :key="number" @click="handleKeyPress(number)">
            {{ number }}
          </button>
          <button class="backspace-btn" @click="removeDigit">⌫</button>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correctPasscode: "12122024",
      enteredPasscode: "",
      isPasscodeCorrect: false,
      showError: false,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    };
  },
  methods: {
    handleKeyPress(number) {
      if (this.enteredPasscode.length < 8) {
        this.enteredPasscode += number;
      }
      if (this.enteredPasscode.length === 8) {
        this.checkPasscode();
      }
    },
    removeDigit() {
      this.enteredPasscode = this.enteredPasscode.slice(0, -1);
    },
    checkPasscode() {
      this.isPasscodeCorrect = this.enteredPasscode === this.correctPasscode;
      if (this.isPasscodeCorrect) {
        setTimeout(() => {
          this.$router.push("/date");
        }, 7000);
      } else {
        this.showError = true;
        setTimeout(() => {
          this.enteredPasscode = "";
          this.showError = false;
        }, 2000);
      }
    },
    handleKeyboardInput(event) {
      if (event.key === "Backspace") {
        this.removeDigit();
      } else {
        const key = event.key;
        if (!isNaN(key) && this.enteredPasscode.length < 8) {
          this.handleKeyPress(key);
        }
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyboardInput);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyboardInput);
  },
};
</script>

<style scoped>
.valentine-text {
  font-family: "Indie Flower", cursive;
  font-size: 4rem;
  color: #ff3399;
  text-shadow: 3px 3px 0 #fff, 5px 5px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding-top: 3%;
}
.spacer {
  margin: 60px 0;
}
.passcode-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rem;
}
.media-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.side-image,
.side-gif {
  max-width: 600px;
  max-height: 600px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
  height: 400px;
}
.side-audio {
  display: none;
}
.passcode-display {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 40px;
  color: #444;
  background-color: #f9f9f9;
  text-align: center;
  position: relative;
}
.dot-indicator {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 5px;
}
.dot-indicator span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ddd;
  transition: background-color 0.3s ease;
}
.dot-indicator span.filled {
  background-color: #ff3399;
}
.error-message {
  color: red;
  font-size: 1rem;
  margin-top: 5px;
  animation: fadeIn 0.5s ease;
}
.success-message {
  color: green;
  font-size: 1rem;
  margin-top: 5px;
  animation: fadeIn 0.5s ease;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.keypad {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
  justify-content: center;
}
.keypad > button:nth-child(10) {
  grid-column: 2;
}
.backspace-btn {
  grid-column: 3;
  background-color: #f0f0f0;
  color: #333;
}
button {
  font-size: 1.5rem;
  padding: 15px;
  border: 1px solid #aaa;
  border-radius: 8px;
  background-color: #fff;
  color: #ff3399;
  text-shadow: 3px 3px 0 #fff, 5px 5px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}
button:hover {
  background-color: #ffe6f0;
  transform: scale(1.1);
}
</style>
