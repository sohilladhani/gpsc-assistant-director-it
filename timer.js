// Timer management for the online test application

class TestTimer {
    constructor() {
        this.totalTime = window.EXAM_DATA.TIMER_CONFIG.TOTAL_TIME;
        this.remainingTime = this.totalTime;
        this.startTime = null;
        this.timerInterval = null;
        this.isRunning = false;
        this.warningShown = [];
        
        this.timerElement = document.getElementById('timer');
        this.warningModal = document.getElementById('warningModal');
        this.warningMessage = document.getElementById('warningMessage');
        this.warningOk = document.getElementById('warningOk');
        
        this.bindEvents();
    }

    bindEvents() {
        this.warningOk.addEventListener('click', () => {
            this.hideWarningModal();
        });
    }

    start() {
        if (this.isRunning) return;
        
        this.startTime = Date.now();
        this.isRunning = true;
        this.timerInterval = setInterval(() => {
            this.tick();
        }, 1000);
        
        console.log('Timer started');
    }

    stop() {
        if (!this.isRunning) return;
        
        clearInterval(this.timerInterval);
        this.isRunning = false;
        console.log('Timer stopped');
    }

    tick() {
        const elapsed = Date.now() - this.startTime;
        this.remainingTime = Math.max(0, this.totalTime - elapsed);
        
        this.updateDisplay();
        this.checkWarnings();
        
        if (this.remainingTime <= 0) {
            this.timeUp();
        }
    }

    updateDisplay() {
        const hours = Math.floor(this.remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timerElement.textContent = timeString;
        
        // Change timer color based on remaining time
        this.timerElement.classList.remove('timer-warning', 'timer-critical');
        
        if (this.remainingTime <= 5 * 60 * 1000) { // 5 minutes
            this.timerElement.classList.add('timer-critical');
        } else if (this.remainingTime <= 30 * 60 * 1000) { // 30 minutes
            this.timerElement.classList.add('timer-warning');
        }
    }

    checkWarnings() {
        const warnings = window.EXAM_DATA.TIMER_CONFIG.WARNING_TIMES;
        
        warnings.forEach((warning, index) => {
            if (this.remainingTime <= warning.time && !this.warningShown[index]) {
                this.showWarning(warning.message);
                this.warningShown[index] = true;
            }
        });
    }

    showWarning(message) {
        this.warningMessage.textContent = message;
        this.warningModal.classList.remove('hidden');
        this.warningModal.classList.add('modal-enter');
        
        // Auto-hide after 5 seconds if user doesn't click OK
        setTimeout(() => {
            if (!this.warningModal.classList.contains('hidden')) {
                this.hideWarningModal();
            }
        }, 5000);
    }

    hideWarningModal() {
        this.warningModal.classList.add('hidden');
        this.warningModal.classList.remove('modal-enter');
    }

    timeUp() {
        this.stop();
        console.log('Time up! Auto-submitting test...');
        
        // Trigger auto-submission
        if (window.testApp && typeof window.testApp.autoSubmitTest === 'function') {
            window.testApp.autoSubmitTest();
        }
    }

    getElapsedTime() {
        if (!this.startTime) return 0;
        return Date.now() - this.startTime;
    }

    getElapsedTimeString() {
        const elapsed = this.getElapsedTime();
        const hours = Math.floor(elapsed / (1000 * 60 * 60));
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    getRemainingTimeString() {
        const hours = Math.floor(this.remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    reset() {
        this.stop();
        this.remainingTime = this.totalTime;
        this.startTime = null;
        this.warningShown = [];
        this.updateDisplay();
        console.log('Timer reset');
    }

    // Get percentage of time elapsed
    getTimeElapsedPercentage() {
        if (!this.startTime) return 0;
        const elapsed = this.getElapsedTime();
        return Math.min(100, (elapsed / this.totalTime) * 100);
    }

    // Check if timer is in critical state (less than 5 minutes)
    isCritical() {
        return this.remainingTime <= 5 * 60 * 1000;
    }

    // Check if timer is in warning state (less than 30 minutes)
    isWarning() {
        return this.remainingTime <= 30 * 60 * 1000;
    }

    // Save timer state to localStorage for recovery
    saveState() {
        const state = {
            startTime: this.startTime,
            remainingTime: this.remainingTime,
            warningShown: this.warningShown
        };
        localStorage.setItem('testTimerState', JSON.stringify(state));
    }

    // Load timer state from localStorage
    loadState() {
        const savedState = localStorage.getItem('testTimerState');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                this.startTime = state.startTime;
                this.remainingTime = state.remainingTime;
                this.warningShown = state.warningShown || [];
                
                // Recalculate remaining time based on current time
                if (this.startTime) {
                    const elapsed = Date.now() - this.startTime;
                    this.remainingTime = Math.max(0, this.totalTime - elapsed);
                }
                
                this.updateDisplay();
                return true;
            } catch (error) {
                console.error('Error loading timer state:', error);
                return false;
            }
        }
        return false;
    }

    // Clear saved state
    clearState() {
        localStorage.removeItem('testTimerState');
    }
}

// Export timer class
window.TestTimer = TestTimer;