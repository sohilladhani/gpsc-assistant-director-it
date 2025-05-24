// Results calculation and display for the GPSC online test application

class ResultsManager {
    constructor(questionManager, timer) {
        this.questionManager = questionManager;
        this.timer = timer;
        this.answerKey = window.EXAM_DATA.ANSWER_KEY;
        this.cancelledQuestions = window.EXAM_DATA.CANCELLED_QUESTIONS;
    }

    calculateResults() {
        const userAnswers = this.questionManager.getAllAnswers();
        const results = {
            correct: 0,
            wrong: 0,
            skipped: 0,
            notAttempted: 0,
            totalQuestions: this.questionManager.questions.length,
            score: 0,
            maxScore: this.questionManager.questions.length,
            percentage: 0,
            timeTaken: this.timer.getElapsedTimeString(),
            questionAnalysis: []
        };

        // Calculate scores for each question
        this.questionManager.questions.forEach(question => {
            const questionId = question.id;
            const userAnswer = userAnswers[questionId];
            const correctAnswer = this.answerKey[questionId];
            const isCancelled = this.cancelledQuestions.includes(questionId);
            
            let status = '';
            let points = 0;
            let explanation = '';

            if (userAnswer === null) {
                // Not attempted - penalty
                status = 'not-attempted';
                points = -1/3;
                results.notAttempted++;
                explanation = 'No answer selected. Penalty applied.';
            } else if (userAnswer === 'E') {
                // Deliberately skipped
                status = 'skipped';
                points = 0;
                results.skipped++;
                explanation = 'Question skipped deliberately.';
            } else if (isCancelled) {
                // Cancelled question - always correct if not E
                status = 'correct';
                points = 1;
                results.correct++;
                explanation = 'Question cancelled - awarded full marks.';
            } else if (userAnswer === correctAnswer) {
                // Correct answer
                status = 'correct';
                points = 1;
                results.correct++;
                explanation = 'Correct answer!';
            } else {
                // Wrong answer
                status = 'wrong';
                points = 0;
                results.wrong++;
                explanation = `Incorrect. Correct answer: ${correctAnswer}`;
            }

            results.score += points;

            // Add to question analysis
            results.questionAnalysis.push({
                questionId: questionId,
                questionText: question.text,
                userAnswer: userAnswer,
                correctAnswer: correctAnswer,
                status: status,
                points: points,
                explanation: explanation,
                isCancelled: isCancelled,
                options: question.options
            });
        });

        // Calculate percentage
        results.percentage = Math.max(0, Math.round((results.score / results.maxScore) * 100));

        return results;
    }

    displayResults(results) {
        // Hide test interface and show results
        document.getElementById('testInterface').classList.add('hidden');
        document.getElementById('resultsScreen').classList.remove('hidden');

        // Update score summary
        document.getElementById('finalScore').textContent = results.score.toFixed(2);
        document.getElementById('timeTaken').textContent = results.timeTaken;
        document.getElementById('percentage').textContent = `${results.percentage}%`;

        // Update detailed analysis
        document.getElementById('correctCount').textContent = results.correct;
        document.getElementById('wrongCount').textContent = results.wrong;
        document.getElementById('skippedCount').textContent = results.skipped;
        document.getElementById('notAttemptedCount').textContent = results.notAttempted;

        // Display question-wise analysis
        this.displayQuestionAnalysis(results.questionAnalysis);

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    displayQuestionAnalysis(analysis) {
        const container = document.getElementById('analysisContainer');
        container.innerHTML = '';

        analysis.forEach(item => {
            const analysisDiv = document.createElement('div');
            analysisDiv.className = `analysis-item ${item.status} bg-white rounded-lg p-4 border shadow-sm`;

            const header = document.createElement('div');
            header.className = 'flex justify-between items-start mb-2';

            const questionInfo = document.createElement('div');
            questionInfo.innerHTML = `
                <h4 class="font-semibold text-gray-800">Question ${item.questionId}</h4>
                <p class="text-sm text-gray-600">${this.truncateText(item.questionText, 100)}</p>
            `;

            const scoreInfo = document.createElement('div');
            scoreInfo.className = 'text-right';
            
            const statusBadge = document.createElement('span');
            statusBadge.className = `px-2 py-1 rounded-full text-xs font-medium ${this.getStatusBadgeClass(item.status)}`;
            statusBadge.textContent = this.getStatusLabel(item.status);

            const pointsDiv = document.createElement('div');
            pointsDiv.className = `text-sm font-medium ${item.points > 0 ? 'text-green-600' : item.points < 0 ? 'text-red-600' : 'text-gray-600'}`;
            pointsDiv.textContent = `${item.points > 0 ? '+' : ''}${item.points} pt`;

            scoreInfo.appendChild(statusBadge);
            scoreInfo.appendChild(pointsDiv);

            header.appendChild(questionInfo);
            header.appendChild(scoreInfo);

            const details = document.createElement('div');
            details.className = 'mt-3 text-sm';

            let detailsHTML = '';
            
            if (item.userAnswer) {
                const userAnswerText = item.userAnswer === 'E' ? 'Not Attempted (E)' : 
                    item.options[item.userAnswer] || `Option ${item.userAnswer}`;
                detailsHTML += `<p><span class="font-medium">Your Answer:</span> ${item.userAnswer} - ${userAnswerText}</p>`;
            } else {
                detailsHTML += `<p><span class="font-medium">Your Answer:</span> <span class="text-red-600">No answer selected</span></p>`;
            }

            if (!item.isCancelled && item.correctAnswer) {
                const correctAnswerText = item.options[item.correctAnswer] || `Option ${item.correctAnswer}`;
                detailsHTML += `<p><span class="font-medium">Correct Answer:</span> ${item.correctAnswer} - ${correctAnswerText}</p>`;
            }

            detailsHTML += `<p class="mt-2 ${this.getExplanationClass(item.status)}">${item.explanation}</p>`;

            details.innerHTML = detailsHTML;

            analysisDiv.appendChild(header);
            analysisDiv.appendChild(details);
            container.appendChild(analysisDiv);
        });
    }

    getStatusBadgeClass(status) {
        switch (status) {
            case 'correct': return 'bg-green-100 text-green-800';
            case 'wrong': return 'bg-red-100 text-red-800';
            case 'skipped': return 'bg-blue-100 text-blue-800';
            case 'not-attempted': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    getStatusLabel(status) {
        switch (status) {
            case 'correct': return 'Correct';
            case 'wrong': return 'Wrong';
            case 'skipped': return 'Skipped';
            case 'not-attempted': return 'Not Attempted';
            default: return 'Unknown';
        }
    }

    getExplanationClass(status) {
        switch (status) {
            case 'correct': return 'text-green-600';
            case 'wrong': return 'text-red-600';
            case 'skipped': return 'text-blue-600';
            case 'not-attempted': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Generate detailed performance report
    generatePerformanceReport(results) {
        const report = {
            overall: {
                totalQuestions: results.totalQuestions,
                attempted: results.correct + results.wrong,
                score: results.score,
                percentage: results.percentage,
                timeTaken: results.timeTaken
            },
            breakdown: {
                correct: results.correct,
                wrong: results.wrong,
                skipped: results.skipped,
                notAttempted: results.notAttempted
            },
            efficiency: {
                accuracyRate: results.correct > 0 ? Math.round((results.correct / (results.correct + results.wrong)) * 100) : 0,
                attemptRate: Math.round(((results.correct + results.wrong) / results.totalQuestions) * 100),
                averageTimePerQuestion: this.calculateAverageTimePerQuestion()
            },
            recommendations: this.generateRecommendations(results)
        };

        return report;
    }

    calculateAverageTimePerQuestion() {
        const totalTimeMs = this.timer.getElapsedTime();
        const totalTimeSeconds = Math.floor(totalTimeMs / 1000);
        const averageSeconds = Math.floor(totalTimeSeconds / window.EXAM_DATA.TOTAL_QUESTIONS);
        
        const minutes = Math.floor(averageSeconds / 60);
        const seconds = averageSeconds % 60;
        
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    generateRecommendations(results) {
        const recommendations = [];
        
        if (results.notAttempted > 10) {
            recommendations.push("Try to attempt more questions. Unanswered questions result in penalty points in GPSC exams.");
        }
        
        if (results.wrong > results.correct) {
            recommendations.push("Focus on accuracy. Review concepts where you made mistakes for future GPSC preparations.");
        }
        
        if (results.skipped > 20) {
            recommendations.push("Practice more to build confidence. Too many skipped questions limit your score potential in competitive exams.");
        }
        
        const accuracyRate = results.correct > 0 ? (results.correct / (results.correct + results.wrong)) * 100 : 0;
        if (accuracyRate > 80) {
            recommendations.push("Excellent accuracy! Try to attempt more questions to maximize your GPSC exam score.");
        } else if (accuracyRate < 50) {
            recommendations.push("Work on fundamental concepts to improve accuracy before attempting speed in GPSC preparation.");
        }
        
        return recommendations;
    }

    // Export results for external use
    exportResults(results) {
        const exportData = {
            testInfo: {
                title: "GPSC - Assistant Director IT Exam",
                commission: "Gujarat Public Service Commission",
                position: "Assistant Director IT - Directorate of ICT and E-Governance, Class-I",
                advertisement: "Advt. No. 67/2016-17",
                examDate: "P.T. Date: 29-01-2017",
                totalQuestions: results.totalQuestions,
                timeTaken: results.timeTaken,
                completedAt: new Date().toISOString()
            },
            scores: {
                totalScore: results.score,
                maxScore: results.maxScore,
                percentage: results.percentage
            },
            breakdown: {
                correct: results.correct,
                wrong: results.wrong,
                skipped: results.skipped,
                notAttempted: results.notAttempted
            },
            questionAnalysis: results.questionAnalysis,
            performanceReport: this.generatePerformanceReport(results)
        };

        return exportData;
    }

    // Save results to localStorage
    saveResults(results) {
        const exportData = this.exportResults(results);
        const savedResults = JSON.parse(localStorage.getItem('gpscTestResults') || '[]');
        savedResults.push(exportData);
        
        // Keep only last 10 results
        if (savedResults.length > 10) {
            savedResults.splice(0, savedResults.length - 10);
        }
        
        localStorage.setItem('gpscTestResults', JSON.stringify(savedResults));
    }

    // Get previous results
    getPreviousResults() {
        return JSON.parse(localStorage.getItem('gpscTestResults') || '[]');
    }

    // Clear all saved results
    clearResults() {
        localStorage.removeItem('gpscTestResults');
    }

    // Compare with previous attempts
    compareWithPrevious(currentResults) {
        const previous = this.getPreviousResults();
        if (previous.length === 0) return null;
        
        const lastResult = previous[previous.length - 1];
        
        return {
            scoreImprovement: currentResults.score - lastResult.scores.totalScore,
            percentageImprovement: currentResults.percentage - lastResult.scores.percentage,
            accuracyImprovement: this.calculateAccuracyImprovement(currentResults, lastResult),
            timeImprovement: this.calculateTimeImprovement(currentResults, lastResult)
        };
    }

    calculateAccuracyImprovement(current, previous) {
        const currentAccuracy = current.correct / (current.correct + current.wrong) * 100;
        const previousAccuracy = previous.breakdown.correct / (previous.breakdown.correct + previous.breakdown.wrong) * 100;
        return currentAccuracy - previousAccuracy;
    }

    calculateTimeImprovement(current, previous) {
        // This would require more complex time parsing, simplified for now
        return "N/A";
    }
}

// Export results manager
window.ResultsManager = ResultsManager;