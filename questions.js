// Question display and management for the online test application

class QuestionManager {
    constructor() {
        this.questions = window.EXAM_DATA.QUESTIONS;
        this.userAnswers = {};
        this.currentPage = 1;
        this.questionsContainer = document.getElementById('questionsContainer');
        
        this.initializeAnswers();
    }

    initializeAnswers() {
        // Initialize all answers as null (not attempted)
        this.questions.forEach(question => {
            this.userAnswers[question.id] = null;
        });
    }

    getCurrentPageQuestions() {
        const startIndex = (this.currentPage - 1) * window.EXAM_DATA.QUESTIONS_PER_PAGE;
        const endIndex = startIndex + window.EXAM_DATA.QUESTIONS_PER_PAGE;
        return this.questions.slice(startIndex, endIndex);
    }

    renderCurrentPage() {
        const pageQuestions = this.getCurrentPageQuestions();
        const questionRange = this.getQuestionRange();
        
        // Update question range display
        document.getElementById('questionRange').textContent = `${questionRange.start}-${questionRange.end}`;
        
        // Clear container
        this.questionsContainer.innerHTML = '';
        
        // Render each question
        pageQuestions.forEach((question, index) => {
            const questionElement = this.createQuestionElement(question, index);
            this.questionsContainer.appendChild(questionElement);
        });
    }

    createQuestionElement(question, index) {
        const questionDiv = document.createElement('div');
        questionDiv.className = `question-container bg-gray-50 p-6 rounded-lg mb-6 ${this.getQuestionStatusClass(question.id)}`;
        
        // Question header
        const header = document.createElement('div');
        header.className = 'flex justify-between items-start mb-4';
        
        const questionNumber = document.createElement('h3');
        questionNumber.className = 'text-lg font-semibold text-gray-800';
        questionNumber.textContent = `Question ${question.id}`;
        
        const status = document.createElement('span');
        status.className = `px-3 py-1 rounded-full text-sm font-medium ${this.getStatusBadgeClass(question.id)}`;
        status.textContent = this.getStatusText(question.id);
        
        header.appendChild(questionNumber);
        header.appendChild(status);
        
        // Question text container
        const questionText = document.createElement('div');
        questionText.className = 'text-gray-700 mb-6 leading-relaxed';
        
        // Handle specific questions with special formatting
        if (question.id === 138) {
            this.renderQuestion138(questionText);
        } else if (question.id === 141) {
            this.renderQuestion141(questionText);
        } else if (question.id === 148) {
            this.renderQuestion148(questionText);
        } else if (question.id === 159) {
            this.renderQuestion159(questionText);
        } else if (question.id === 161) {
            this.renderQuestion161(questionText);
        } else if (question.id === 165) {
            this.renderQuestion165(questionText);
        } else if (question.id === 258) {
            this.renderQuestion258(questionText);
        } else if (question.has_table && question.table_type === 'algorithm_complexity_table') {
            // Generic algorithm complexity table renderer
            this.renderAlgorithmComplexityTable(questionText, question);
        } else {
            // Handle tables
            if (question.has_table) {
                const tableNotice = document.createElement('div');
                tableNotice.className = 'bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded mb-4';
                tableNotice.innerHTML = '<strong>Note:</strong> This question contains a table. See formatted content below.';
                questionText.appendChild(tableNotice);
                
                // Try to render table from text
                this.renderTableFromText(questionText, question);
            }
            
            // Handle diagrams
            if (question.has_diagram) {
                const diagramNotice = document.createElement('div');
                diagramNotice.className = 'bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4';
                diagramNotice.innerHTML = '<strong>Note:</strong> This question contains a diagram. Please refer to the original question paper or see the diagram below.';
                questionText.appendChild(diagramNotice);
            }
            
            // Add question text if no special rendering
            if (!question.has_table && !question.has_diagram) {
                const textDiv = document.createElement('div');
                textDiv.innerHTML = this.formatQuestionText(question.text);
                questionText.appendChild(textDiv);
            }
        }
        
        // Options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'space-y-3';
        
        // Do not show cancelled question notice anymore
        // The question will be handled in scoring logic
        
        // Create option elements
        ['A', 'B', 'C', 'D', 'E'].forEach(optionKey => {
            const optionElement = this.createOptionElement(question.id, optionKey, question.options[optionKey]);
            optionsContainer.appendChild(optionElement);
        });
        
        questionDiv.appendChild(header);
        questionDiv.appendChild(questionText);
        questionDiv.appendChild(optionsContainer);
        
        return questionDiv;
    }

    renderAlgorithmComplexityTable(container, question) {
        const questionTextDiv = document.createElement('div');
        questionTextDiv.innerHTML = '<p class="mb-4">Match the pairs:</p>';
        
        const tableDiv = document.createElement('div');
        tableDiv.className = 'my-4 overflow-x-auto';
        tableDiv.innerHTML = `
            <table class="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 border-b text-left font-semibold text-gray-700">Algorithm/Problem</th>
                        <th class="px-4 py-3 border-b text-left font-semibold text-gray-700">Time Complexity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium text-indigo-600">a) 0/1 knapsack</td>
                        <td class="px-4 py-3">1. O(n²2ⁿ)</td>
                    </tr>
                    <tr class="border-b bg-gray-50 hover:bg-gray-100">
                        <td class="px-4 py-3 font-medium text-indigo-600">b) All pairs shortest path</td>
                        <td class="px-4 py-3">2. O(2ⁿ)</td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium text-indigo-600">c) Optimal cost binary search tree</td>
                        <td class="px-4 py-3">3. O(n³)</td>
                    </tr>
                    <tr class="border-b bg-gray-50 hover:bg-gray-100">
                        <td class="px-4 py-3 font-medium text-indigo-600">d) Travelling sales person</td>
                        <td class="px-4 py-3">4. O(n²)</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        container.appendChild(questionTextDiv);
        container.appendChild(tableDiv);
    }

    renderQuestion258(container) {
        const questionTextDiv = document.createElement('div');
        questionTextDiv.innerHTML = '<p class="mb-4">Assume that source S and destination D are connected through two intermediate Routers labeled R. Determine how many times each packet has to visit the network layer and the data link layer during a transmission from S to D.</p>';
        
        // Add the network diagram
        const diagramDiv = document.createElement('div');
        diagramDiv.className = 'my-6 p-4 bg-white border-2 border-blue-200 rounded-lg';
        diagramDiv.innerHTML = `
            <h4 class="font-semibold mb-4 text-center text-gray-800">Network Topology</h4>
            <div class="flex justify-center items-center space-x-8 my-6">
                <div class="flex flex-col items-center">
                    <div class="w-16 h-16 bg-green-100 border-2 border-green-400 rounded-lg flex items-center justify-center font-bold text-green-700">
                        S
                    </div>
                    <span class="text-sm text-gray-600 mt-1">Source</span>
                </div>
                
                <div class="flex items-center">
                    <div class="w-8 h-0.5 bg-gray-400"></div>
                    <div class="text-gray-400 mx-2">→</div>
                </div>
                
                <div class="flex flex-col items-center">
                    <div class="w-16 h-16 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center font-bold text-blue-700">
                        R
                    </div>
                    <span class="text-sm text-gray-600 mt-1">Router 1</span>
                </div>
                
                <div class="flex items-center">
                    <div class="w-8 h-0.5 bg-gray-400"></div>
                    <div class="text-gray-400 mx-2">→</div>
                </div>
                
                <div class="flex flex-col items-center">
                    <div class="w-16 h-16 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center font-bold text-blue-700">
                        R
                    </div>
                    <span class="text-sm text-gray-600 mt-1">Router 2</span>
                </div>
                
                <div class="flex items-center">
                    <div class="w-8 h-0.5 bg-gray-400"></div>
                    <div class="text-gray-400 mx-2">→</div>
                </div>
                
                <div class="flex flex-col items-center">
                    <div class="w-16 h-16 bg-red-100 border-2 border-red-400 rounded-lg flex items-center justify-center font-bold text-red-700">
                        D
                    </div>
                    <span class="text-sm text-gray-600 mt-1">Destination</span>
                </div>
            </div>
            
            <div class="mt-6 bg-gray-50 p-4 rounded-lg">
                <h5 class="font-semibold mb-2 text-gray-700">Network Path Analysis:</h5>
                <div class="text-sm text-gray-600 space-y-1">
                    <p><strong>Path:</strong> S → R1 → R2 → D</p>
                    <p><strong>Hops:</strong> 3 hops total</p>
                    <p><strong>Network devices:</strong> 4 (Source, Router1, Router2, Destination)</p>
                </div>
            </div>
        `;
        
        container.appendChild(questionTextDiv);
        container.appendChild(diagramDiv);
    }

    renderQuestion159(container) {
        const questionTextDiv = document.createElement('div');
        questionTextDiv.innerHTML = '<p class="mb-4">Using the Cyclomatic complexity of a graph G having 13 vertices, 4 decision vertices, 1 connector, the number of edges in G is</p>';
        
        // Add the formula explanation
        const formulaDiv = document.createElement('div');
        formulaDiv.className = 'my-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg';
        formulaDiv.innerHTML = `
            <h4 class="font-semibold mb-4 text-blue-800">Cyclomatic Complexity Formula</h4>
            <div class="space-y-4">
                <div class="bg-white p-3 rounded border">
                    <p class="font-mono text-center text-lg">M = E - N + 2P</p>
                    <p class="text-sm text-gray-600 text-center mt-2">Where:</p>
                    <ul class="text-sm text-gray-700 mt-2 space-y-1">
                        <li><strong>M</strong> = Cyclomatic complexity</li>
                        <li><strong>E</strong> = Number of edges</li>
                        <li><strong>N</strong> = Number of vertices (nodes)</li>
                        <li><strong>P</strong> = Number of connected components</li>
                    </ul>
                </div>
                
                <div class="bg-white p-3 rounded border">
                    <h5 class="font-semibold text-gray-800 mb-2">Alternative Formula (for connected graphs):</h5>
                    <p class="font-mono text-center text-lg">M = E - N + 2</p>
                    <p class="text-sm text-gray-600 mt-2">For decision vertices: <strong>M = D + 1</strong></p>
                </div>
            </div>
        `;
        
        const calculationDiv = document.createElement('div');
        calculationDiv.className = 'my-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg';
        calculationDiv.innerHTML = `
            <h4 class="font-semibold mb-4 text-green-800">Given Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white p-3 rounded border">
                    <h5 class="font-semibold text-gray-800 mb-2">Graph Properties:</h5>
                    <ul class="text-sm space-y-1">
                        <li><strong>Vertices (N):</strong> 13</li>
                        <li><strong>Decision vertices:</strong> 4</li>
                        <li><strong>Connectors:</strong> 1</li>
                        <li><strong>Edges (E):</strong> ?</li>
                    </ul>
                </div>
                
                <div class="bg-white p-3 rounded border">
                    <h5 class="font-semibold text-gray-800 mb-2">Calculation:</h5>
                    <div class="text-sm space-y-1">
                        <p>Using: M = D + 1</p>
                        <p>M = 4 + 1 = 5</p>
                        <p>Using: M = E - N + 2</p>
                        <p>5 = E - 13 + 2</p>
                        <p><strong>E = 5 + 13 - 2 = 16</strong></p>
                    </div>
                </div>
            </div>
        `;
        
        // Add cancelled notice
        const cancelledNotice = document.createElement('div');
        cancelledNotice.className = 'bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4';
        cancelledNotice.innerHTML = '<strong>Note:</strong> This question has been cancelled. Any answer will be considered correct.';
        
        container.appendChild(questionTextDiv);
        container.appendChild(formulaDiv);
        container.appendChild(calculationDiv);
        container.appendChild(cancelledNotice);
    }

    renderTableFromText(container, question) {
        // Try to parse and render table from question text
        const text = question.text;
        
        // Check if it's the algorithm complexity pattern
        if (text.includes('0/1 knapsack') && text.includes('shortest path')) {
            this.renderAlgorithmComplexityTable(container, question);
            return;
        }
        
        // Fallback: just show the text with better formatting
        const textDiv = document.createElement('div');
        textDiv.innerHTML = this.formatQuestionText(text);
        container.appendChild(textDiv);
    }

    renderQuestion165(container) {
        const questionTextDiv = document.createElement('div');
        questionTextDiv.innerHTML = '<p class="mb-4">Match the pairs:</p>';
        
        const tableDiv = document.createElement('div');
        tableDiv.className = 'my-4 overflow-x-auto';
        tableDiv.innerHTML = `
            <table class="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 border-b text-left font-semibold text-gray-700">Algorithm/Problem</th>
                        <th class="px-4 py-3 border-b text-left font-semibold text-gray-700">Time Complexity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium text-indigo-600">a) 0/1 knapsack</td>
                        <td class="px-4 py-3">1. O(n²2ⁿ)</td>
                    </tr>
                    <tr class="border-b bg-gray-50 hover:bg-gray-100">
                        <td class="px-4 py-3 font-medium text-indigo-600">b) All pairs shortest path</td>
                        <td class="px-4 py-3">2. O(2ⁿ)</td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium text-indigo-600">c) Optimal cost binary search tree</td>
                        <td class="px-4 py-3">3. O(n³)</td>
                    </tr>
                    <tr class="border-b bg-gray-50 hover:bg-gray-100">
                        <td class="px-4 py-3 font-medium text-indigo-600">d) Travelling sales person</td>
                        <td class="px-4 py-3">4. O(n²)</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        container.appendChild(questionTextDiv);
        container.appendChild(tableDiv);
    }

    renderQuestion138(container) {
        const questionTextDiv = document.createElement('div');
        questionTextDiv.innerHTML = '<p class="mb-4">Match the following pairs:</p>';
        
        const tableDiv = document.createElement('div');
        tableDiv.className = 'my-4 overflow-x-auto';
        tableDiv.innerHTML = `
            <table class="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 border-b text-left font-semibold text-gray-700">Complexity</th>
                        <th class="px-4 py-3 border-b text-left font-semibold text-gray-700">Algorithm/Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium text-blue-600">I. O(log n)</td>
                        <td class="px-4 py-3">(M) Heap sort</td>
                    </tr>
                    <tr class="border-b bg-gray-50 hover:bg-gray-100">
                        <td class="px-4 py-3 font-medium text-blue-600">II. O(n)</td>
                        <td class="px-4 py-3">(N) DFS</td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium text-blue-600">III. O(nlogn)</td>
                        <td class="px-4 py-3">(O) Binary search</td>
                    </tr>
                    <tr class="border-b bg-gray-50 hover:bg-gray-100">
                        <td class="px-4 py-3 font-medium text-blue-600">IV. O(n²)</td>
                        <td class="px-4 py-3">(P) Selecting Kth smallest elements</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        container.appendChild(questionTextDiv);
        container.appendChild(tableDiv);
    }

    renderQuestion141(container) {
        const questionTextDiv = document.createElement('div');
        questionTextDiv.innerHTML = '<p class="mb-4">Consider the following tree and locking sequences:</p>';
        
        // Add the tree diagram using Mermaid
        const treeDiv = document.createElement('div');
        treeDiv.className = 'my-6 p-4 bg-white border-2 border-blue-200 rounded-lg';
        
        // Create unique ID for this mermaid diagram
        const diagramId = `mermaid-tree-141-${Date.now()}`;
        
        treeDiv.innerHTML = `
            <h4 class="font-semibold mb-4 text-center text-gray-800">Tree Structure</h4>
            <div class="mermaid-container flex justify-center">
                <div class="mermaid" id="${diagramId}">
                    graph TD
                        A --> B
                        A --> C
                        B --> D
                        B --> E
                        C --> F
                        C --> G
                        E --> H
                        E --> I
                        
                        style A fill:#e1f5fe
                        style B fill:#f3e5f5
                        style C fill:#f3e5f5
                        style D fill:#fff3e0
                        style E fill:#fff3e0
                        style F fill:#fff3e0
                        style G fill:#fff3e0
                        style H fill:#e8f5e8
                        style I fill:#e8f5e8
                </div>
            </div>
        `;
        
        const sequencesDiv = document.createElement('div');
        sequencesDiv.className = 'mt-6 space-y-3';
        sequencesDiv.innerHTML = `
            <div class="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                <strong class="text-blue-600">I.</strong> Lock-X(A), Lock-X(B), Lock-X(D), unlock(D), lock-X(F), unlock(F), unlock(B), unlock(A)
            </div>
            <div class="bg-gray-50 p-3 rounded border-l-4 border-green-400">
                <strong class="text-green-600">II.</strong> Lock-X(A), lock-X(E), lock-X(H), unlock(H), unlock(E), unlock(A)
            </div>
            <div class="bg-gray-50 p-3 rounded border-l-4 border-purple-400">
                <strong class="text-purple-600">III.</strong> Lock-X(B), lock-X(F), lock-X(E), unlock(F), unlock(E), unlock(B)
            </div>
        `;
        
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = '<p class="mt-4 font-medium">Which of the above is (are) the valid locking sequence(s) for tree-based protocol?</p>';
        
        container.appendChild(questionTextDiv);
        container.appendChild(treeDiv);
        container.appendChild(sequencesDiv);
        container.appendChild(questionDiv);
        
        // Initialize Mermaid for this specific diagram
        setTimeout(() => {
            if (window.mermaid) {
                try {
                    window.mermaid.init(undefined, `#${diagramId}`);
                } catch (error) {
                    console.warn('Mermaid initialization failed:', error);
                    // Fallback to text representation
                    this.renderTreeFallback(treeDiv);
                }
            } else {
                // Fallback if Mermaid not loaded
                this.renderTreeFallback(treeDiv);
            }
        }, 100);
    }
    
    renderTreeFallback(container) {
        container.innerHTML = `
            <h4 class="font-semibold mb-4 text-center text-gray-800">Tree Structure</h4>
            <div class="font-mono text-center space-y-2 text-sm">
                <div class="text-lg font-bold text-blue-600">A</div>
                <div class="text-gray-400">┌─────────┴─────────┐</div>
                <div class="flex justify-center space-x-16">
                    <span class="font-bold text-purple-600">B</span>
                    <span class="font-bold text-purple-600">C</span>
                </div>
                <div class="text-gray-400">┌───┴───┐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌───┴───┐</div>
                <div class="flex justify-center space-x-4">
                    <span class="text-orange-600">D</span>
                    <span class="text-orange-600">E</span>
                    <span class="ml-12 text-orange-600">F</span>
                    <span class="text-orange-600">G</span>
                </div>
                <div class="text-gray-400">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌───┴───┐</div>
                <div class="flex justify-center space-x-4">
                    <span class="ml-4 text-green-600">H</span>
                    <span class="text-green-600">I</span>
                </div>
            </div>
        `;
    }

    renderQuestion148(container) {
        const questionTextDiv = document.createElement('div');
        questionTextDiv.innerHTML = '<p class="mb-4">Match the following:</p>';
        
        const tableDiv = document.createElement('div');
        tableDiv.className = 'my-4 overflow-x-auto';
        tableDiv.innerHTML = `
            <table class="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 border-b text-left font-semibold text-gray-700">Term</th>
                        <th class="px-4 py-3 border-b text-left font-semibold text-gray-700">Definition</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium text-purple-600">P. Recoverable</td>
                        <td class="px-4 py-3">1. Tj reads data items written by Ti, the Tj commits after Ti commits</td>
                    </tr>
                    <tr class="border-b bg-gray-50 hover:bg-gray-100">
                        <td class="px-4 py-3 font-medium text-purple-600">Q. Cascadeless</td>
                        <td class="px-4 py-3">2. Reading uncommitted data</td>
                    </tr>
                    <tr class="border-b hover:bg-gray-50">
                        <td class="px-4 py-3 font-medium text-purple-600">R. Dirty read</td>
                        <td class="px-4 py-3">3. Tj reads data items written by Ti, the Ti commits after Tj commits</td>
                    </tr>
                    <tr class="border-b bg-gray-50 hover:bg-gray-100">
                        <td class="px-4 py-3 font-medium text-purple-600">S. Non recoverable</td>
                        <td class="px-4 py-3">4. Tj reads data items written by Ti, the commit operation of Ti appears before the read operation of Tj</td>
                    </tr>
                </tbody>
            </table>
        `;
        
        container.appendChild(questionTextDiv);
        container.appendChild(tableDiv);
    }

    renderQuestion161(container) {
        const questionTextDiv = document.createElement('div');
        questionTextDiv.innerHTML = '<p class="mb-4">With the following as adjacency matrix of an undirected graph G, the number of bridge(s) is</p>';
        
        const matrixDiv = document.createElement('div');
        matrixDiv.className = 'my-4 overflow-x-auto';
        matrixDiv.innerHTML = `
            <div class="bg-white p-4 border rounded-lg">
                <h4 class="font-semibold mb-3 text-center">Adjacency Matrix</h4>
                <table class="border-collapse border-2 border-gray-400 font-mono text-sm mx-auto">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-400 px-3 py-2 font-bold"></th>
                            <th class="border border-gray-400 px-3 py-2 font-bold">p</th>
                            <th class="border border-gray-400 px-3 py-2 font-bold">q</th>
                            <th class="border border-gray-400 px-3 py-2 font-bold">r</th>
                            <th class="border border-gray-400 px-3 py-2 font-bold">s</th>
                            <th class="border border-gray-400 px-3 py-2 font-bold">t</th>
                            <th class="border border-gray-400 px-3 py-2 font-bold">u</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="border border-gray-400 px-3 py-2 font-bold bg-gray-100">p</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-2 font-bold bg-gray-100">q</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-2 font-bold bg-gray-100">r</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center">0</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-2 font-bold bg-gray-100">s</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-2 font-bold bg-gray-100">t</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-2 font-bold bg-gray-100">u</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center">0</td><td class="border border-gray-400 px-3 py-2 text-center bg-blue-100">1</td><td class="border border-gray-400 px-3 py-2 text-center">0</td></tr>
                    </tbody>
                </table>
            </div>
        `;
        
        container.appendChild(questionTextDiv);
        container.appendChild(matrixDiv);
    }

    createTable148() {
        const tableDiv = document.createElement('div');
        tableDiv.className = 'my-4 overflow-x-auto';
        tableDiv.innerHTML = `
            <table class="min-w-full bg-white border border-gray-300">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-2 border-b text-left font-semibold">Term</th>
                        <th class="px-4 py-2 border-b text-left font-semibold">Definition</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b">
                        <td class="px-4 py-2 font-medium">P. Recoverable</td>
                        <td class="px-4 py-2">1. Tj reads data items written by Ti, the Tj commits after Ti commits</td>
                    </tr>
                    <tr class="border-b bg-gray-50">
                        <td class="px-4 py-2 font-medium">Q. Cascadeless</td>
                        <td class="px-4 py-2">2. Reading uncommitted data</td>
                    </tr>
                    <tr class="border-b">
                        <td class="px-4 py-2 font-medium">R. Dirty read</td>
                        <td class="px-4 py-2">3. Tj reads data items written by Ti, the Ti commits after Tj commits</td>
                    </tr>
                    <tr class="border-b bg-gray-50">
                        <td class="px-4 py-2 font-medium">S. Non recoverable</td>
                        <td class="px-4 py-2">4. Tj reads data items written by Ti, the commit operation of Ti appears before the read operation of Tj</td>
                    </tr>
                </tbody>
            </table>
        `;
        return tableDiv;
    }

    createAdjacencyMatrix() {
        const matrixDiv = document.createElement('div');
        matrixDiv.className = 'my-4 overflow-x-auto';
        matrixDiv.innerHTML = `
            <div class="bg-white p-4 border rounded">
                <h4 class="font-semibold mb-2">Adjacency Matrix:</h4>
                <table class="border-collapse border border-gray-400 font-mono text-sm">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-400 px-3 py-1"></th>
                            <th class="border border-gray-400 px-3 py-1">p</th>
                            <th class="border border-gray-400 px-3 py-1">q</th>
                            <th class="border border-gray-400 px-3 py-1">r</th>
                            <th class="border border-gray-400 px-3 py-1">s</th>
                            <th class="border border-gray-400 px-3 py-1">t</th>
                            <th class="border border-gray-400 px-3 py-1">u</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="border border-gray-400 px-3 py-1 font-bold bg-gray-100">p</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-1 font-bold bg-gray-100">q</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-1 font-bold bg-gray-100">r</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">0</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-1 font-bold bg-gray-100">s</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-1 font-bold bg-gray-100">t</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">1</td></tr>
                        <tr><td class="border border-gray-400 px-3 py-1 font-bold bg-gray-100">u</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">0</td><td class="border border-gray-400 px-3 py-1">1</td><td class="border border-gray-400 px-3 py-1">0</td></tr>
                    </tbody>
                </table>
            </div>
        `;
        return matrixDiv;
    }

    formatQuestionText(text) {
        // Convert markdown tables to HTML if present
        if (text.includes('|')) {
            return this.convertMarkdownTable(text);
        }
        
        // Convert code blocks
        text = text.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded font-mono text-sm overflow-x-auto">$1</pre>');
        
        // Convert line breaks
        return text.replace(/\n/g, '<br>');
    }

    convertMarkdownTable(text) {
        // Simple markdown table converter
        const lines = text.split('\n');
        let html = '';
        let inTable = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.includes('|') && !inTable) {
                // Start of table
                html += '<table class="border-collapse border border-gray-400 my-4"><tbody>';
                inTable = true;
            }
            
            if (line.includes('|') && inTable) {
                // Table row
                const cells = line.split('|').filter(cell => cell.trim());
                html += '<tr>';
                cells.forEach(cell => {
                    html += `<td class="border border-gray-400 px-3 py-2">${cell.trim()}</td>`;
                });
                html += '</tr>';
            } else if (inTable) {
                // End of table
                html += '</tbody></table>';
                inTable = false;
                html += line + '<br>';
            } else {
                html += line + '<br>';
            }
        }
        
        if (inTable) {
            html += '</tbody></table>';
        }
        
        return html;
    }

    createOptionElement(questionId, optionKey, optionText) {
        const optionDiv = document.createElement('div');
        optionDiv.className = `question-option border-2 border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            this.userAnswers[questionId] === optionKey ? 'selected' : ''
        } ${this.isQuestionLocked(questionId) ? 'disabled' : ''}`;
        
        const label = document.createElement('label');
        label.className = 'flex items-center cursor-pointer w-full';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = `question_${questionId}`;
        radio.value = optionKey;
        radio.className = 'mr-3 h-4 w-4 text-blue-600';
        radio.checked = this.userAnswers[questionId] === optionKey;
        radio.disabled = this.isQuestionLocked(questionId);
        
        const optionLabel = document.createElement('span');
        optionLabel.className = 'font-medium text-gray-800 mr-3';
        optionLabel.textContent = `(${optionKey})`;
        
        const optionTextSpan = document.createElement('span');
        optionTextSpan.className = 'text-gray-700 flex-1';
        
        if (optionKey === 'E') {
            optionTextSpan.textContent = 'Not Attempted (Skip this question)';
            optionTextSpan.className += ' italic text-blue-600';
        } else {
            optionTextSpan.textContent = optionText || `Option ${optionKey}`;
        }
        
        label.appendChild(radio);
        label.appendChild(optionLabel);
        label.appendChild(optionTextSpan);
        
        // Add click handler
        if (!this.isQuestionLocked(questionId)) {
            optionDiv.addEventListener('click', () => {
                this.selectAnswer(questionId, optionKey);
            });
            
            radio.addEventListener('change', () => {
                this.selectAnswer(questionId, optionKey);
            });
        }
        
        optionDiv.appendChild(label);
        return optionDiv;
    }

    selectAnswer(questionId, optionKey) {
        if (this.isQuestionLocked(questionId)) return;
        
        // Update user answer
        this.userAnswers[questionId] = optionKey;
        
        // Update UI
        this.updateQuestionStatus(questionId);
        
        // Re-render current page to update selection
        this.renderCurrentPage();
        
        // Update navigation status
        if (window.navigationManager) {
            window.navigationManager.updatePageStatus();
        }
        
        // Save progress
        this.saveProgress();
        
        console.log(`Question ${questionId} answered: ${optionKey}`);
    }

    isQuestionLocked(questionId) {
        // Questions are locked once answered (as per requirement)
        return this.userAnswers[questionId] !== null;
    }

    getQuestionStatusClass(questionId) {
        const answer = this.userAnswers[questionId];
        if (answer === null) return '';
        if (answer === 'E') return 'skipped';
        return 'answered';
    }

    getStatusBadgeClass(questionId) {
        const answer = this.userAnswers[questionId];
        if (answer === null) return 'bg-yellow-100 text-yellow-800';
        if (answer === 'E') return 'bg-blue-100 text-blue-800';
        return 'bg-green-100 text-green-800';
    }

    getStatusText(questionId) {
        const answer = this.userAnswers[questionId];
        if (answer === null) return 'Not Attempted';
        if (answer === 'E') return 'Skipped';
        return `Answered: ${answer}`;
    }

    updateQuestionStatus(questionId) {
        // This method can be used for real-time status updates
        const questionElement = document.querySelector(`input[name="question_${questionId}"]:checked`);
        if (questionElement) {
            const container = questionElement.closest('.question-container');
            if (container) {
                container.className = `question-container bg-gray-50 p-6 rounded-lg mb-6 ${this.getQuestionStatusClass(questionId)}`;
            }
        }
    }

    getQuestionRange() {
        const startIndex = (this.currentPage - 1) * window.EXAM_DATA.QUESTIONS_PER_PAGE;
        const start = this.questions[startIndex]?.id || 101;
        const endIndex = Math.min(startIndex + window.EXAM_DATA.QUESTIONS_PER_PAGE - 1, this.questions.length - 1);
        const end = this.questions[endIndex]?.id || 300;
        
        return { start, end };
    }

    setCurrentPage(pageNumber) {
        this.currentPage = pageNumber;
        this.renderCurrentPage();
    }

    getAnswerSummary() {
        const summary = {
            answered: 0,
            skipped: 0,
            notAttempted: 0,
            total: this.questions.length
        };
        
        Object.values(this.userAnswers).forEach(answer => {
            if (answer === null) {
                summary.notAttempted++;
            } else if (answer === 'E') {
                summary.skipped++;
            } else {
                summary.answered++;
            }
        });
        
        return summary;
    }

    getAllAnswers() {
        return { ...this.userAnswers };
    }

    saveProgress() {
        // Save progress to localStorage
        const progress = {
            answers: this.userAnswers,
            currentPage: this.currentPage,
            timestamp: Date.now()
        };
        localStorage.setItem('testProgress', JSON.stringify(progress));
    }

    loadProgress() {
        const saved = localStorage.getItem('testProgress');
        if (saved) {
            try {
                const progress = JSON.parse(saved);
                this.userAnswers = progress.answers || {};
                this.currentPage = progress.currentPage || 1;
                return true;
            } catch (error) {
                console.error('Error loading progress:', error);
                return false;
            }
        }
        return false;
    }

    clearProgress() {
        localStorage.removeItem('testProgress');
        this.initializeAnswers();
        this.currentPage = 1;
    }

    // Get questions for a specific page
    getPageQuestions(pageNumber) {
        const startIndex = (pageNumber - 1) * window.EXAM_DATA.QUESTIONS_PER_PAGE;
        const endIndex = startIndex + window.EXAM_DATA.QUESTIONS_PER_PAGE;
        return this.questions.slice(startIndex, endIndex);
    }

    // Check if a page has any answered questions
    isPageAnswered(pageNumber) {
        const pageQuestions = this.getPageQuestions(pageNumber);
        return pageQuestions.some(q => this.userAnswers[q.id] !== null);
    }

    // Check if a page is fully answered
    isPageFullyAnswered(pageNumber) {
        const pageQuestions = this.getPageQuestions(pageNumber);
        return pageQuestions.every(q => this.userAnswers[q.id] !== null);
    }

    // Get page status for navigation
    getPageStatus(pageNumber) {
        if (this.isPageFullyAnswered(pageNumber)) return 'completed';
        if (this.isPageAnswered(pageNumber)) return 'partial';
        return 'not-started';
    }
}

// Export question manager
window.QuestionManager = QuestionManager;