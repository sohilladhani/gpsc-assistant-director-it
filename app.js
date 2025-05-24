// Main application logic for the online test application

class TestApplication {
    constructor() {
        this.timer = null;
        this.questionManager = null;
        this.navigationManager = null;
        this.resultsManager = null;
        this.isTestStarted = false;
        this.isTestCompleted = false;
        
        this.initializeElements();
        this.bindEvents();
        this.checkForSavedProgress();
    }

    initializeElements() {
        this.startScreen = document.getElementById('startScreen');
        this.testInterface = document.getElementById('testInterface');
        this.resultsScreen = document.getElementById('resultsScreen');
        this.startBtn = document.getElementById('startBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.confirmModal = document.getElementById('confirmModal');
        this.confirmYes = document.getElementById('confirmYes');
        this.confirmNo = document.getElementById('confirmNo');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => {
            this.startTest();
        });

        this.submitBtn.addEventListener('click', () => {
            this.showSubmitConfirmation();
        });

        this.restartBtn.addEventListener('click', () => {
            this.restartTest();
        });

        this.confirmYes.addEventListener('click', () => {
            this.submitTest();
        });

        this.confirmNo.addEventListener('click', () => {
            this.hideSubmitConfirmation();
        });

        // Handle page visibility change (prevent cheating)
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Handle beforeunload (warn about leaving page)
        window.addEventListener('beforeunload', (e) => {
            if (this.isTestStarted && !this.isTestCompleted) {
                e.preventDefault();
                e.returnValue = 'Are you sure you want to leave? Your progress will be lost.';
                return e.returnValue;
            }
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    checkForSavedProgress() {
        const hasProgress = localStorage.getItem('testProgress');
        const hasTimerState = localStorage.getItem('testTimerState');
        
        if (hasProgress || hasTimerState) {
            const resume = confirm('Previous test progress found. Do you want to resume?');
            if (resume) {
                this.resumeTest();
            } else {
                this.clearAllProgress();
            }
        }
    }

    startTest() {
        console.log('Starting test...');
        
        // Initialize managers
        this.timer = new TestTimer();
        this.questionManager = new QuestionManager();
        this.navigationManager = new NavigationManager(this.questionManager);
        this.resultsManager = new ResultsManager(this.questionManager, this.timer);
        
        // Make timer accessible globally for auto-submit
        window.testApp = this;
        
        // Hide start screen, show test interface
        this.startScreen.classList.add('hidden');
        this.testInterface.classList.remove('hidden');
        
        // Start timer
        this.timer.start();
        this.isTestStarted = true;
        
        // Load first page
        this.navigationManager.goToPage(1);
        
        // Start auto-save
        this.startAutoSave();
        
        console.log('Test started successfully');
    }

    resumeTest() {
        console.log('Resuming test...');
        
        // Initialize managers
        this.timer = new TestTimer();
        this.questionManager = new QuestionManager();
        this.navigationManager = new NavigationManager(this.questionManager);
        this.resultsManager = new ResultsManager(this.questionManager, this.timer);
        
        // Make timer accessible globally
        window.testApp = this;
        
        // Load saved progress
        this.questionManager.loadProgress();
        this.navigationManager.loadState();
        this.timer.loadState();
        
        // Hide start screen, show test interface
        this.startScreen.classList.add('hidden');
        this.testInterface.classList.remove('hidden');
        
        // Resume timer
        this.timer.start();
        this.isTestStarted = true;
        
        // Update navigation
        this.navigationManager.updatePageStatus();
        
        // Start auto-save
        this.startAutoSave();
        
        console.log('Test resumed successfully');
    }

    startAutoSave() {
        // Auto-save progress every 30 seconds
        this.autoSaveInterval = setInterval(() => {
            if (this.isTestStarted && !this.isTestCompleted) {
                this.saveProgress();
            }
        }, 30000);
    }

    saveProgress() {
        if (this.questionManager) this.questionManager.saveProgress();
        if (this.navigationManager) this.navigationManager.saveState();
        if (this.timer) this.timer.saveState();
    }

    showSubmitConfirmation() {
        // Check if there are unanswered questions
        const summary = this.questionManager.getAnswerSummary();
        const unanswered = summary.notAttempted;
        
        if (unanswered > 0) {
            const proceedAnyway = confirm(
                `You have ${unanswered} unanswered questions. ` +
                `These will result in penalty marks (-1/3 each). ` +
                `Do you want to review them first?`
            );
            
            if (!proceedAnyway) {
                // Highlight incomplete pages
                this.navigationManager.highlightIncompletePages();
                return;
            }
        }
        
        this.confirmModal.classList.remove('hidden');
        this.confirmModal.classList.add('modal-enter');
    }

    hideSubmitConfirmation() {
        this.confirmModal.classList.add('hidden');
        this.confirmModal.classList.remove('modal-enter');
    }

    submitTest() {
        console.log('Submitting test...');
        
        this.hideSubmitConfirmation();
        this.isTestCompleted = true;
        
        // Stop timer
        if (this.timer) {
            this.timer.stop();
        }
        
        // Stop auto-save
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        // Calculate results
        const results = this.resultsManager.calculateResults();
        
        // Save results
        this.resultsManager.saveResults(results);
        
        // Display results
        this.resultsManager.displayResults(results);
        
        // Clear progress from localStorage
        this.clearAllProgress();
        
        console.log('Test submitted successfully', results);
    }

    autoSubmitTest() {
        console.log('Auto-submitting test due to time up...');
        
        this.isTestCompleted = true;
        
        // Calculate results
        const results = this.resultsManager.calculateResults();
        
        // Save results
        this.resultsManager.saveResults(results);
        
        // Display results
        this.resultsManager.displayResults(results);
        
        // Clear progress
        this.clearAllProgress();
        
        // Show time up message
        alert('Time is up! Your test has been automatically submitted.');
        
        console.log('Test auto-submitted successfully', results);
    }

    restartTest() {
        console.log('Restarting test...');
        
        // Reset all components
        this.resetApplication();
        
        // Show start screen
        this.resultsScreen.classList.add('hidden');
        this.testInterface.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
        
        console.log('Test restarted');
    }

    resetApplication() {
        // Stop timer
        if (this.timer) {
            this.timer.stop();
            this.timer.reset();
        }
        
        // Stop auto-save
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        // Clear all progress
        this.clearAllProgress();
        
        // Reset flags
        this.isTestStarted = false;
        this.isTestCompleted = false;
        
        // Reset managers
        this.timer = null;
        this.questionManager = null;
        this.navigationManager = null;
        this.resultsManager = null;
    }

    clearAllProgress() {
        localStorage.removeItem('testProgress');
        localStorage.removeItem('testTimerState');
        localStorage.removeItem('navigationState');
    }

    handleVisibilityChange() {
        if (this.isTestStarted && !this.isTestCompleted) {
            if (document.hidden) {
                console.log('Page hidden - test paused');
                // Optionally pause timer or log the event
            } else {
                console.log('Page visible - test resumed');
                // Optionally resume timer
            }
        }
    }

    handleKeyboardShortcuts(e) {
        if (!this.isTestStarted || this.isTestCompleted) return;
        
        // Ctrl + S to save progress
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            this.saveProgress();
            this.showNotification('Progress saved!');
        }
        
        // Ctrl + Enter to submit
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            this.showSubmitConfirmation();
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowLeft' && e.ctrlKey) {
            e.preventDefault();
            this.navigationManager.goToPreviousPage();
        }
        
        if (e.key === 'ArrowRight' && e.ctrlKey) {
            e.preventDefault();
            this.navigationManager.goToNextPage();
        }
        
        // Number keys for page navigation (1-9)
        if (e.ctrlKey && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const pageNumber = parseInt(e.key);
            if (pageNumber <= window.EXAM_DATA.TOTAL_PAGES) {
                this.navigationManager.goToPage(pageNumber);
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ${
            type === 'success' ? 'bg-green-600' : 
            type === 'warning' ? 'bg-yellow-600' : 
            type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Get test statistics
    getTestStatistics() {
        if (!this.questionManager) return null;
        
        const summary = this.questionManager.getAnswerSummary();
        const navSummary = this.navigationManager ? this.navigationManager.getNavigationSummary() : null;
        
        return {
            questions: summary,
            navigation: navSummary,
            timeElapsed: this.timer ? this.timer.getElapsedTimeString() : '00:00:00',
            timeRemaining: this.timer ? this.timer.getRemainingTimeString() : '02:00:00'
        };
    }

    // Debug method to get current state
    getDebugInfo() {
        return {
            isTestStarted: this.isTestStarted,
            isTestCompleted: this.isTestCompleted,
            currentPage: this.navigationManager ? this.navigationManager.currentPage : 0,
            statistics: this.getTestStatistics(),
            savedProgress: {
                hasTestProgress: !!localStorage.getItem('testProgress'),
                hasTimerState: !!localStorage.getItem('testTimerState'),
                hasNavigationState: !!localStorage.getItem('navigationState')
            }
        };
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Test Application...');
    
    // Initialize Mermaid
    if (window.mermaid) {
        window.mermaid.initialize({ 
            startOnLoad: false,
            theme: 'default',
            themeVariables: {
                primaryColor: '#3b82f6',
                primaryTextColor: '#1f2937',
                primaryBorderColor: '#3b82f6',
                lineColor: '#6b7280',
                secondaryColor: '#f3f4f6',
                tertiaryColor: '#ffffff'
            }
        });
        console.log('Mermaid initialized');
    }
    
    window.testApp = new TestApplication();
    console.log('Test Application initialized successfully');
});

// Export for global access
window.TestApplication = TestApplication;