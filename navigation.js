// Navigation management for the online test application

class NavigationManager {
    constructor(questionManager) {
        this.questionManager = questionManager;
        this.currentPage = 1;
        this.totalPages = window.EXAM_DATA.TOTAL_PAGES;
        
        // Top navigation elements
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentPageSpan = document.getElementById('currentPage');
        this.pageNumbers = document.getElementById('pageNumbers');
        this.questionRange = document.getElementById('questionRange');
        
        // Bottom navigation elements
        this.prevBtnBottom = document.getElementById('prevBtnBottom');
        this.nextBtnBottom = document.getElementById('nextBtnBottom');
        this.currentPageSpanBottom = document.getElementById('currentPageBottom');
        this.pageNumbersBottom = document.getElementById('pageNumbersBottom');
        this.questionRangeBottom = document.getElementById('questionRangeBottom');
        
        this.initializeNavigation();
        this.bindEvents();
    }

    initializeNavigation() {
        this.renderPageNumbers();
        this.updateNavigationState();
    }

    bindEvents() {
        // Top navigation events
        this.prevBtn.addEventListener('click', () => {
            this.goToPreviousPage('top');
        });

        this.nextBtn.addEventListener('click', () => {
            this.goToNextPage('top');
        });

        // Bottom navigation events
        this.prevBtnBottom.addEventListener('click', () => {
            this.goToPreviousPage('bottom');
        });

        this.nextBtnBottom.addEventListener('click', () => {
            this.goToNextPage('bottom');
        });
    }

    renderPageNumbers() {
        // Clear both containers
        this.pageNumbers.innerHTML = '';
        this.pageNumbersBottom.innerHTML = '';
        
        for (let i = 1; i <= this.totalPages; i++) {
            // Create buttons for both top and bottom navigation
            const topPageBtn = this.createPageButton(i, 'top');
            const bottomPageBtn = this.createPageButton(i, 'bottom');
            
            this.pageNumbers.appendChild(topPageBtn);
            this.pageNumbersBottom.appendChild(bottomPageBtn);
        }
    }

    createPageButton(pageNumber, location) {
        const button = document.createElement('button');
        button.className = `page-btn border border-gray-300 rounded text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
            pageNumber === this.currentPage ? 'active' : ''
        }`;
        button.textContent = pageNumber;
        button.setAttribute('data-page', pageNumber);
        button.setAttribute('data-location', location);
        
        // Add status class
        const status = this.questionManager.getPageStatus(pageNumber);
        if (status === 'completed') {
            button.classList.add('answered');
        } else if (status === 'partial') {
            button.classList.add('partially-answered');
        }
        
        button.addEventListener('click', () => {
            this.goToPage(pageNumber, location);
        });
        
        return button;
    }

    updatePageStatus() {
        // Update page buttons in both navigation sections
        const topPageButtons = this.pageNumbers.querySelectorAll('.page-btn');
        const bottomPageButtons = this.pageNumbersBottom.querySelectorAll('.page-btn');
        
        [topPageButtons, bottomPageButtons].forEach(buttonGroup => {
            buttonGroup.forEach(button => {
                const pageNumber = parseInt(button.getAttribute('data-page'));
                const status = this.questionManager.getPageStatus(pageNumber);
                
                // Remove existing status classes
                button.classList.remove('answered', 'partially-answered');
                
                // Add appropriate status class
                if (status === 'completed') {
                    button.classList.add('answered');
                } else if (status === 'partial') {
                    button.classList.add('partially-answered');
                }
            });
        });
    }

    goToPage(pageNumber, clickedLocation = 'top') {
        if (pageNumber < 1 || pageNumber > this.totalPages) return;
        
        this.currentPage = pageNumber;
        this.questionManager.setCurrentPage(pageNumber);
        this.updateNavigationState();
        this.scrollToLocation(clickedLocation);
        
        console.log(`Navigated to page ${pageNumber} from ${clickedLocation} navigation`);
    }

    goToNextPage(clickedLocation = 'top') {
        if (this.currentPage < this.totalPages) {
            this.goToPage(this.currentPage + 1, clickedLocation);
        }
    }

    goToPreviousPage(clickedLocation = 'top') {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1, clickedLocation);
        }
    }

    updateNavigationState() {
        // Update current page display in both sections
        this.currentPageSpan.textContent = this.currentPage;
        this.currentPageSpanBottom.textContent = this.currentPage;
        
        // Update previous button state
        const isPrevDisabled = this.currentPage === 1;
        this.prevBtn.disabled = isPrevDisabled;
        this.prevBtnBottom.disabled = isPrevDisabled;
        
        // Update next button state
        const isNextDisabled = this.currentPage === this.totalPages;
        this.nextBtn.disabled = isNextDisabled;
        this.nextBtnBottom.disabled = isNextDisabled;
        
        // Update page button states in both sections
        const topPageButtons = this.pageNumbers.querySelectorAll('.page-btn');
        const bottomPageButtons = this.pageNumbersBottom.querySelectorAll('.page-btn');
        
        [topPageButtons, bottomPageButtons].forEach(buttonGroup => {
            buttonGroup.forEach(button => {
                const pageNumber = parseInt(button.getAttribute('data-page'));
                button.classList.toggle('active', pageNumber === this.currentPage);
            });
        });
        
        // Update question range in both sections
        this.updateQuestionRange();
    }

    updateQuestionRange() {
        const range = this.questionManager.getQuestionRange();
        const rangeText = `${range.start}-${range.end}`;
        this.questionRange.textContent = rangeText;
        this.questionRangeBottom.textContent = rangeText;
    }

    scrollToLocation(location) {
        if (location === 'top') {
            // Scroll to top of page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (location === 'bottom') {
            // Scroll to bottom navigation area
            const bottomNav = document.getElementById('testInterface').querySelector('.bg-white.rounded-lg.shadow-md.mt-6');
            if (bottomNav) {
                bottomNav.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    scrollToTop() {
        this.scrollToLocation('top');
    }

    // Get navigation summary for results
    getNavigationSummary() {
        const summary = {
            completedPages: 0,
            partialPages: 0,
            notStartedPages: 0,
            totalPages: this.totalPages
        };
        
        for (let i = 1; i <= this.totalPages; i++) {
            const status = this.questionManager.getPageStatus(i);
            if (status === 'completed') {
                summary.completedPages++;
            } else if (status === 'partial') {
                summary.partialPages++;
            } else {
                summary.notStartedPages++;
            }
        }
        
        return summary;
    }

    // Highlight pages with unanswered questions
    highlightIncompletePages() {
        const topPageButtons = this.pageNumbers.querySelectorAll('.page-btn');
        const bottomPageButtons = this.pageNumbersBottom.querySelectorAll('.page-btn');
        
        [topPageButtons, bottomPageButtons].forEach(buttonGroup => {
            buttonGroup.forEach(button => {
                const pageNumber = parseInt(button.getAttribute('data-page'));
                const status = this.questionManager.getPageStatus(pageNumber);
                
                if (status !== 'completed') {
                    button.classList.add('border-red-500', 'bg-red-50');
                    button.style.animation = 'pulse 2s infinite';
                }
            });
        });
        
        // Remove highlights after 5 seconds
        setTimeout(() => {
            [topPageButtons, bottomPageButtons].forEach(buttonGroup => {
                buttonGroup.forEach(button => {
                    button.classList.remove('border-red-500', 'bg-red-50');
                    button.style.animation = '';
                });
            });
        }, 5000);
    }

    // Get first incomplete page
    getFirstIncompletePage() {
        for (let i = 1; i <= this.totalPages; i++) {
            const status = this.questionManager.getPageStatus(i);
            if (status !== 'completed') {
                return i;
            }
        }
        return null;
    }

    // Navigate to first incomplete page
    goToFirstIncompletePage() {
        const firstIncomplete = this.getFirstIncompletePage();
        if (firstIncomplete) {
            this.goToPage(firstIncomplete);
            return true;
        }
        return false;
    }

    // Check if all pages are completed
    areAllPagesCompleted() {
        for (let i = 1; i <= this.totalPages; i++) {
            const status = this.questionManager.getPageStatus(i);
            if (status !== 'completed') {
                return false;
            }
        }
        return true;
    }

    // Get completion percentage
    getCompletionPercentage() {
        const summary = this.getNavigationSummary();
        return Math.round((summary.completedPages / summary.totalPages) * 100);
    }

    // Advanced navigation features
    
    // Jump to specific question number
    goToQuestion(questionNumber) {
        const questionIndex = this.questionManager.questions.findIndex(q => q.id === questionNumber);
        if (questionIndex === -1) return false;
        
        const pageNumber = Math.floor(questionIndex / window.EXAM_DATA.QUESTIONS_PER_PAGE) + 1;
        this.goToPage(pageNumber);
        
        // Scroll to specific question after a brief delay
        setTimeout(() => {
            const questionElement = document.querySelector(`input[name="question_${questionNumber}"]`);
            if (questionElement) {
                questionElement.closest('.question-container').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 300);
        
        return true;
    }

    // Get pages with specific status
    getPagesByStatus(status) {
        const pages = [];
        for (let i = 1; i <= this.totalPages; i++) {
            if (this.questionManager.getPageStatus(i) === status) {
                pages.push(i);
            }
        }
        return pages;
    }

    // Navigate through pages with specific status
    goToNextPageWithStatus(status) {
        const pagesWithStatus = this.getPagesByStatus(status);
        const currentIndex = pagesWithStatus.findIndex(page => page > this.currentPage);
        
        if (currentIndex !== -1) {
            this.goToPage(pagesWithStatus[currentIndex]);
            return true;
        }
        return false;
    }

    // Save navigation state
    saveState() {
        const state = {
            currentPage: this.currentPage,
            timestamp: Date.now()
        };
        localStorage.setItem('navigationState', JSON.stringify(state));
    }

    // Load navigation state
    loadState() {
        const saved = localStorage.getItem('navigationState');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                this.currentPage = state.currentPage || 1;
                this.questionManager.setCurrentPage(this.currentPage);
                this.updateNavigationState();
                return true;
            } catch (error) {
                console.error('Error loading navigation state:', error);
                return false;
            }
        }
        return false;
    }

    // Clear navigation state
    clearState() {
        localStorage.removeItem('navigationState');
        this.currentPage = 1;
    }

    // Reset navigation to first page
    reset() {
        this.currentPage = 1;
        this.questionManager.setCurrentPage(1);
        this.updateNavigationState();
        this.renderPageNumbers();
    }
}

// Export navigation manager
window.NavigationManager = NavigationManager;