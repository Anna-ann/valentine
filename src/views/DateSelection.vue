<template>
  <div class="date-selection">
    <h1 class="valentine-text">Choose Your Date</h1>
    <div class="date-options" :class="{ 'single-card': dateOptions.length <= 2 }">
      <div v-if="loading" v-for="index in 3" :key="'skeleton-' + index" class="skeleton-card"></div>
      <div v-else v-for="(date, index) in dateOptions" :key="index" class="date-card"
        :class="{ 'center-card': isHorizontalCenter(index) }" @click="openPopup(date.name)">
        <img :src="date.icon" :alt="date.name" class="icon" />
        <h2>{{ date.name }}</h2>
      </div>
    </div>

    <!-- Popup Modal -->
    <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
      <div class="popup-content">
        <h2 class="valentine-text" v-if="!videoVisible">
          You chose: {{ selectedDate }}
        </h2>
        <h2 class="valentine-text" v-else>
          Here is your voucher
        </h2>
        <div v-if="!videoVisible" class="popup-buttons">
          <button class="confirm-button" @click="playVideoAndAudio">
            Confirm
          </button>
          <button class="close-button" @click="closePopup">
            Close
          </button>
        </div>
        <div v-if="videoVisible" class="video-container">
          <img src="/assets/cat.gif" alt="Cat GIF" class="centered-gif" />
          <audio ref="audioPlayer" :src="songUrl" autoplay></audio>
          <!-- Voucher image displayed below the video -->
          <img v-if="voucherImage" :src="voucherImage" alt="Voucher Image" class="voucher-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateOptions: [
        { name: "Dinner", icon: "/assets/dinner.jpg" },
        { name: "Arcade Game", icon: "/assets/arcade.jpg" },
        { name: "Workshop", icon: "/assets/workshop.jpg" },
        { name: "Spa", icon: "/assets/spa.jpg" },
        { name: "Cinema", icon: "/assets/cinema.jpg" },
        { name: "Mystery Date", icon: "/assets/mystery.jpg" },
      ],
      selectedDate: null,
      showPopup: false,
      videoVisible: false,
      loading: false,
      songUrl: "/assets/girlfriend.mp3",
      sendMessage: false,
    };
  },
  computed: {
    voucherImage() {
      if (!this.selectedDate) return "";
      // Map the selected date to the corresponding voucher image.
      const mapping = {
        "Dinner": "/assets/dinner.png",
        "Arcade Game": "/assets/arcade.png",
        "Workshop": "/assets/workshop.png",
        "Spa": "/assets/spa.png",
        "Cinema": "/assets/cinema.png",
        "Mystery Date": "/assets/mystery.png",
      };
      return mapping[this.selectedDate] || "";
    },
  },
  methods: {
    openPopup(name) {
      this.selectedDate = name;
      this.showPopup = true;
      this.videoVisible = false;
      this.sendMessage = false;
    },
    closePopup() {
      this.showPopup = false;
      this.stopAudio();
    },
    playVideoAndAudio() {
      this.videoVisible = true;
      this.$nextTick(() => {
        const audioPlayer = this.$refs.audioPlayer;
        if (audioPlayer) {
          audioPlayer.play();
        } else {
          console.error("Audio player not found!");
        }
      });

      if (!this.sendMessage) {
        this.sendTelegramMessage(
          `A special date with "${this.selectedDate}"? Someone's got excellent taste!`
        );
        this.sendMessage = true;
      }
    },
    stopAudio() {
      const audioPlayer = this.$refs.audioPlayer;
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
    },
    isHorizontalCenter(index) {
      const rowSize = 3;
      const rowStartIndex = Math.floor(index / rowSize) * rowSize;
      const middleIndex = rowStartIndex + Math.floor(rowSize / 2);
      return index === middleIndex;
    },
    sendTelegramMessage(message) {
      const telegramToken =
        "7653221474:AAFZBsXNKNMsCS8OOZ6l3Y6ZwjSA5Mngkws";
      const chatId = "666389841";
      const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Message sent to Telegram:", data);
        })
        .catch((error) => {
          console.error("Error sending message to Telegram:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Page Container */
.date-selection {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(180deg, #ffe6f0, #ffc3d6);
  min-height: 100vh;
}

/* Title Styling */
.valentine-text {
  font-family: "Indie Flower", cursive;
  font-size: 4rem;
  color: #ff3399;
  text-shadow: 3px 3px 0 #fff, 5px 5px 5px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: fadeInUp 1s ease forwards 0.5s;
}

/* Card Grid */
.date-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 4rem;
  justify-items: center;
  row-gap: 5rem;
  column-gap: 0;
}

/* Card Styling */
.date-card {
  position: relative;
  width: 300px;
  height: 400px;
  background-color: #ff3399;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
}

.date-card:hover {
  background-color: #ff7599;
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Card Content */
.icon {
  width: 80%;
  height: 270px;
  margin-bottom: 1rem;
  border-radius: 15px;
  object-fit: cover;
}

.date-card h2 {
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
  text-align: center;
}

.center-card {
  transform: scale(1.15);
  z-index: 2;
}

/* Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  max-width: 800px;
  max-height: 90vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Popup Buttons with Spacing */
.popup-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.confirm-button,
.close-button {
  background-color: #ff3399;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.confirm-button:hover,
.close-button:hover {
  background-color: #fff;
  color: #ff3399;
}

/* Animations */
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

/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.popup-content iframe {
  width: 100%;
  max-width: 700px;
  height: auto;
  transform: scale(1.1);
  transition: transform 0.1s ease-in-out;
  border: none;
  margin-top: 1rem;
}

.popup-content h2 {
  margin-bottom: 2rem;
  font-size: 1.8rem;
}

.video-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  margin-top: 1rem;
}

/* Centered GIF */
.centered-gif {
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 10px;
  object-fit: contain;
  animation: fadeIn 0.5s ease-in-out;
}

/* Voucher Image Styling */
.voucher-img {
  max-width: 100%;
  margin-top: 1rem;
  border-radius: 10px;
  object-fit: contain;
  animation: fadeIn 0.5s ease-in-out;
}
</style>
