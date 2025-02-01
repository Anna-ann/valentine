<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <div ref="leftColumn" class="col-md-6 d-flex flex-column left-column position-relative">
        <div class="top-section flex-grow-1 d-flex align-items-center justify-content-center">
          <h1 class="valentine-text">Will you be my Valentine?</h1>
        </div>
        <div class="bottom-section flex-grow-4 d-flex align-items-center justify-content-center">
          <div class="button-group" :style="{ gap: buttonGap + 'px' }">
            <button @click="onYes" :style="{ transform: 'scale(' + yesButtonScale + ')' }"
              class="btn btn-success btn-lg" aria-label="Yes, I will be your Valentine">
              Yes
            </button>
            <button ref="noButton" @mouseover="evadeNoButton" @click="onNo" class="btn btn-danger btn-lg no-btn"
              :style="runAway ? { position: 'absolute', top: noBtnPos.top + 'px', left: noBtnPos.left + 'px' } : {}">
              {{ noButtonText }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6 right-column">
        <video autoplay muted loop class="video-background w-100 h-100" :key="currentVideo">
          <source :src="currentVideo" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Question",
  data() {
    return {
      yesButtonScale: 1,
      noClickCount: 0,
      noButtonText: "No",
      currentVideo: "/assets/valentine.mp4",
      evasiveSound: null,
      noButtonTexts: [
        "No",
        "Are you sure?",
        "Are you positive?",
        "Imma be very very sad",
        "You just activated my trap card!"
      ],
      buttonGap: 20,
      noBtnPos: { top: 0, left: 0 },
      runAway: false,
      telegramToken: "7653221474:AAFZBsXNKNMsCS8OOZ6l3Y6ZwjSA5Mngkws",
      chatId: "666389841",
      responder: ""
    };
  },
  mounted() {
    this.fetchTelegramUser();
    this.centerNoButton();
  },
  methods: {
    fetchTelegramUser() {
      const params = new URLSearchParams(window.location.search);
      const userName = params.get("user") || "Little Spoon";
      this.responder = userName;
    },
    onYes() {
      this.currentVideo = "/assets/celebration.mp4";
      this.sendTelegramMessage(`${this.responder} agreed to be your Valentine! 🎉`);
      setTimeout(() => {
        this.$router.push("/passcode");
      }, 5000);
    },
    onNo() {
      if (this.noClickCount < this.noButtonTexts.length - 1) {
        this.noClickCount++;
        this.noButtonText = this.noButtonTexts[this.noClickCount];
      }
      this.yesButtonScale += 0.5;
      this.buttonGap += 10;
      if (this.noClickCount === this.noButtonTexts.length - 1) {
        this.sendTelegramMessage(`${this.responder} said No. 😢`);
        const noBtn = this.$refs.noButton;
        noBtn.style.position = "absolute";
        const containerRect = this.$el.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        const currentLeft = btnRect.left - containerRect.left;
        const currentTop = btnRect.top - containerRect.top;
        this.noBtnPos = { top: currentTop, left: currentLeft };
        this.runAway = true;
      }
    },
    evadeNoButton(event) {
      if (!this.runAway) return;
      const noBtn = this.$refs.noButton;
      const btnRect = noBtn.getBoundingClientRect();
      const containerRect = this.$el.getBoundingClientRect();
      const maxLeft = containerRect.width - btnRect.width;
      const maxTop = containerRect.height - btnRect.height;
      const newLeft = Math.random() * maxLeft;
      const newTop = Math.random() * maxTop;
      this.noBtnPos = { top: newTop, left: newLeft };
      if (this.evasiveSound) {
        this.evasiveSound.currentTime = 0;
        this.evasiveSound.play();
      }
    },
    centerNoButton() {
      this.$nextTick(() => {
        const column = this.$refs.leftColumn.getBoundingClientRect();
        const noBtn = this.$refs.noButton;
        const btnRect = noBtn.getBoundingClientRect();
        const left = (column.width - btnRect.width) / 2;
        const top = (column.height - btnRect.height) / 2;
        this.noBtnPos = { top, left };
      });
    },
    sendTelegramMessage(message) {
      const url = `https://api.telegram.org/bot${this.telegramToken}/sendMessage`;
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("Message sent to Telegram:", data);
        })
        .catch(error => {
          console.error("Error sending message to Telegram:", error);
        });
    }
  }
};
</script>

<style scoped>
.container-fluid {
  background-color: #fff0f5;
  padding: 0;
  margin: 0;
  height: 100vh;
}

.left-column {
  background-color: #fff0f5;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.right-column {
  background-color: #ffffff;
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-section {
  flex: 1 1 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.bottom-section {
  flex: 4 1 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.btn {
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease;
  width: auto;
  text-align: center;
  white-space: nowrap;
}

.btn-success {
  background-color: #28a745;
  border: none;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.btn-success:hover {
  background-color: #218838;
  transform: scale(1.1);
}

.btn-danger {
  background-color: #dc3545;
  border: none;
  color: white;
  cursor: pointer;
  transition: top 0.4s ease, left 0.4s ease, background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c82333;
}

.valentine-text {
  font-family: "Indie Flower", cursive;
  font-size: 4rem;
  color: #ff3399;
  text-shadow: 3px 3px 0 #fff, 5px 5px 5px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: fadeInUp 1.5s ease-in forwards 0.5s;
  margin-top: 15%;
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

.video-background {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

@media (max-width: 767.98px) {
  .valentine-text {
    font-size: 1.5rem;
  }

  .button-group {
    gap: 10px;
  }

  .btn {
    font-size: 0.9rem;
    padding: 8px 15px;
  }

  .video-background {
    display: none;
  }

  .left-column,
  .right-column {
    width: 100%;
  }
}
</style>
