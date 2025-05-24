import re
import json
import PyPDF2
from typing import List, Dict, Optional

class QuestionExtractor:
    def __init__(self):
        self.cancelled_questions = [108, 159, 180, 205, 238, 252, 269]
        # Questions with diagrams that need special handling
        self.diagram_questions = {
            141: 'tree',
            161: 'adjacency_matrix',
            258: 'network_diagram',
        }
        # Questions with tables
        self.table_questions = {
            138: 'matching_table',
            148: 'definition_table', 
            161: 'adjacency_matrix',
            165: 'algorithm_complexity_table',
        }
        
        # PDF footer/header patterns to remove
        self.footer_patterns = [
            r'AUV-A\s*\]\s*\[\s*\d+\s*\]\s*\[\s*[A-Za-z\.\s]*',  # AUV-A ] [ 42 ] [ Contd...
            r'AUV-A\s*\]\s*\[\s*\d+\s*\]\s*\[\s*P\.T\.O\.',      # AUV-A ] [ 42 ] [ P.T.O.
            r'PROVISIONAL ANSWER KEY.*',                           # PROVISIONAL ANSWER KEY...
            r'NAME OF THE POST.*',                                 # NAME OF THE POST...
            r'Date of Preliminary Test.*',                        # Date of Preliminary Test...
            r'Subject.*Que\.\s*\d+\s*to\s*\d+.*',                # Subject : Concerned Subject...
            r'\[\s*Contd\.{3,}\s*\]',                            # [ Contd... ]
            r'\[\s*P\.T\.O\.\s*\]',                              # [ P.T.O. ]
        ]
    
    def clean_footer_contamination(self, text: str) -> str:
        """Remove PDF footer/header contamination from text"""
        if not text:
            return text
            
        # Apply all footer patterns
        for pattern in self.footer_patterns:
            text = re.sub(pattern, '', text, flags=re.IGNORECASE)
        
        # Clean up extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def has_table(self, question_id: int) -> bool:
        """Check if question has a table"""
        return question_id in self.table_questions
    
    def parse_question_148(self, block: str) -> Dict:
        """Special parser for question 148 with definition table"""
        question_text = """Match the following:

| Term | Definition |
|------|------------|
| P. Recoverable | 1. Tj reads data items written by Ti, the Tj commits after Ti commits |
| Q. Cascadeless | 2. Reading uncommitted data |
| R. Dirty read | 3. Tj reads data items written by Ti, the Ti commits after Tj commits |
| S. Non recoverable | 4. Tj reads data items written by Ti, the commit operation of Ti appears before the read operation of Tj |"""
        
        return {
            'id': 148,
            'text': question_text,
            'options': {
                'A': 'P-2, Q-1, R-4, S-3',
                'B': 'P-3, Q-4, R-2, S-1',
                'C': 'P-2, Q-3, R-4, S-1',
                'D': 'P-1, Q-4, R-2, S-3'
            },
            'cancelled': False,
            'has_table': True,
            'table_type': 'definition_matching'
        }
    
    def parse_question_161(self, block: str) -> Dict:
        """Special parser for question 161 with adjacency matrix"""
        question_text = """With the following as adjacency matrix of an undirected graph G, the number of bridge(s) is

Adjacency Matrix:
```
    p  q  r  s  t  u
p   0  1  1  0  0  0
q   1  0  0  1  0  0
r   1  0  0  1  1  0
s   0  1  1  0  0  0
t   0  0  1  0  0  1
u   0  0  0  0  1  0
```"""
        
        return {
            'id': 161,
            'text': question_text,
            'options': {
                'A': '3',
                'B': '2',
                'C': '1',
                'D': '5'
            },
            'cancelled': False,
            'has_table': True,
            'table_type': 'adjacency_matrix'
        }
    
    def extract_from_pdf(self, pdf_path: str) -> List[Dict]:
        """Extract text from PDF and parse questions"""
        try:
            with open(pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                full_text = ""
                
                for page in pdf_reader.pages:
                    page_text = page.extract_text()
                    # Clean each page before concatenating
                    page_text = self.clean_footer_contamination(page_text)
                    full_text += page_text + "\n"
                
                return self.parse_questions_from_text(full_text)
        
        except Exception as e:
            print(f"Error reading PDF: {e}")
            return []
    
    def extract_from_text_file(self, text_file_path: str) -> List[Dict]:
        """Extract questions from a text file"""
        try:
            with open(text_file_path, 'r', encoding='utf-8') as file:
                text = file.read()
                return self.parse_questions_from_text(text)
        
        except Exception as e:
            print(f"Error reading text file: {e}")
            return []
    
    def parse_questions_from_text(self, text: str) -> List[Dict]:
        """Parse questions from raw text"""
        questions = []
        
        # Clean up the text
        text = self.clean_text(text)
        
        # Split by question numbers (101., 102., etc.)
        question_pattern = r'(\d{3}\..*?)(?=\d{3}\.|$)'
        question_blocks = re.findall(question_pattern, text, re.DOTALL)
        
        print(f"Found {len(question_blocks)} question blocks")
        
        for block in question_blocks:
            question = self.parse_question_block(block)
            if question:
                questions.append(question)
                print(f"Parsed question {question['id']}")
            else:
                # Try to extract question number for debugging
                number_match = re.match(r'^(\d{3})\.', block.strip())
                if number_match:
                    print(f"Failed to parse question {number_match.group(1)}")
        
        return sorted(questions, key=lambda x: x['id'])
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        # Remove footer contamination first
        text = self.clean_footer_contamination(text)
        
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Fix common OCR issues and format options properly
        text = text.replace('(A)', '\n(A)')
        text = text.replace('(B)', '\n(B)')
        text = text.replace('(C)', '\n(C)')
        text = text.replace('(D)', '\n(D)')
        
        # Clean up common PDF artifacts
        text = re.sub(r'[^\x00-\x7F]+', ' ', text)  # Remove non-ASCII characters
        text = re.sub(r'\s+', ' ', text)  # Normalize whitespace again
        
        return text
    
    def parse_question_block(self, block: str) -> Optional[Dict]:
        """Parse a single question block"""
        # Extract question number
        number_match = re.match(r'^(\d{3})\.', block.strip())
        if not number_match:
            return None
        
        question_id = int(number_match.group(1))
        
        # Handle special cases with diagrams, tables, or complex formatting
        if question_id == 141:
            return self.parse_question_141(block)
        elif question_id == 148:
            return self.parse_question_148(block)
        elif question_id == 161:
            return self.parse_question_161(block)
        
        # Clean the block from footer contamination
        block = self.clean_footer_contamination(block)
        
        # Extract question text (everything before first option)
        text_pattern = r'^\d{3}\.\s*(.*?)(?=\(A\))'
        text_match = re.search(text_pattern, block, re.DOTALL)
        if not text_match:
            print(f"Could not extract text for question {question_id}")
            return None
        
        question_text = text_match.group(1).strip()
        question_text = self.clean_footer_contamination(question_text)
        
        # Extract options
        options = self.extract_options(block)
        
        if not options or len(options) < 4:
            print(f"Could not extract all options for question {question_id}. Found: {list(options.keys()) if options else 'None'}")
            return None
        
        result = {
            'id': question_id,
            'text': question_text,
            'options': options,
            'cancelled': question_id in self.cancelled_questions
        }
        
        # Add metadata for tables and diagrams
        if self.has_table(question_id):
            result['has_table'] = True
            result['table_type'] = self.table_questions[question_id]
        
        if self.has_diagram(question_id):
            result['has_diagram'] = True
            result['diagram_type'] = self.diagram_questions[question_id]
        
        return result
    
    def has_diagram(self, question_id: int) -> bool:
        """Check if question has a diagram"""
        return question_id in self.diagram_questions
    
    def detect_diagram_questions(self, text: str) -> List[int]:
        """Detect questions that likely contain diagrams"""
        diagram_indicators = [
            'following tree',
            'adjacency matrix', 
            'network diagram',
            'figure',
            'diagram',
            'graph',
            'flowchart',
            'circuit'
        ]
        
        detected = []
        for indicator in diagram_indicators:
            pattern = rf'(\d{{3}})\.\s*.*?{indicator}'
            matches = re.findall(pattern, text, re.IGNORECASE)
            for match in matches:
                detected.append(int(match))
        
        return list(set(detected))
    
    def detect_table_questions(self, text: str) -> List[int]:
        """Detect questions that likely contain tables"""
        table_indicators = [
            'match the following',
            'adjacency matrix',
            'following pairs',
            'table',
            'matrix'
        ]
        
        detected = []
        for indicator in table_indicators:
            pattern = rf'(\d{{3}})\.\s*.*?{indicator}'
            matches = re.findall(pattern, text, re.IGNORECASE)
            for match in matches:
                detected.append(int(match))
        
        return list(set(detected))
    
    def parse_question_141(self, block: str) -> Dict:
        """Special parser for question 141 with tree diagram"""
        question_text = """Consider the following tree and locking sequences:

[TREE DIAGRAM - Please refer to the original PDF or add mermaid diagram]
Tree structure: A at root, B and C as children of A, D and E as children of B, F and G as children of C, H and I as children of E

I. Lock-X(A), Lock-X(B), Lock-X(D), unlock(D), lock-X(F), unlock(F), unlock (B), unlock (A)
II. Lock-X(A), lock-X(E), lock-X(H), unlock (H), unlock(E), unlock (A)
III. Lock-X(B), lock-X(F), lock-X(E), unlock (F), unlock(E), unlock (B)

Which of the above is (are) the valid locking sequence(s) for tree-based protocol?"""
        
        return {
            'id': 141,
            'text': question_text,
            'options': {
                'A': 'II and III only',
                'B': 'I only', 
                'C': 'I and III only',
                'D': 'II only'
            },
            'cancelled': False,
            'has_diagram': True,
            'diagram_type': 'tree'
        }
    
    def extract_options(self, block: str) -> Dict[str, str]:
        """Extract options A, B, C, D from question block with improved cleaning"""
        options = {}
        
        # Clean the block first
        block = self.clean_footer_contamination(block)
        
        # Improved pattern to match each option with better boundaries
        option_patterns = {
            'A': r'\(A\)\s*(.*?)(?=\s*\(B\)|\s*$)',
            'B': r'\(B\)\s*(.*?)(?=\s*\(C\)|\s*$)',
            'C': r'\(C\)\s*(.*?)(?=\s*\(D\)|\s*$)',
            'D': r'\(D\)\s*(.*?)(?=\s*\d{3}\.|$)'
        }
        
        for key, pattern in option_patterns.items():
            match = re.search(pattern, block, re.DOTALL)
            if match:
                option_text = match.group(1).strip()
                
                # Clean up the option text more aggressively
                option_text = self.clean_footer_contamination(option_text)
                option_text = re.sub(r'\s+', ' ', option_text)
                
                # Remove common PDF artifacts that might remain
                option_text = re.sub(r'^\s*[-•]\s*', '', option_text)  # Remove bullet points
                option_text = option_text.strip()
                
                if option_text:  # Only add non-empty options
                    options[key] = option_text
        
        return options
    
    def generate_javascript_code(self, questions: List[Dict]) -> str:
        """Generate JavaScript code for data.js"""
        js_code = "const QUESTIONS = [\n"
        
        for i, question in enumerate(questions):
            js_code += "    {\n"
            js_code += f"        id: {question['id']},\n"
            js_code += f"        text: `{self.escape_js_template_string(question['text'])}`,\n"
            js_code += "        options: {\n"
            js_code += f"            A: \"{self.escape_js_string(question['options'].get('A', ''))}\",\n"
            js_code += f"            B: \"{self.escape_js_string(question['options'].get('B', ''))}\",\n"
            js_code += f"            C: \"{self.escape_js_string(question['options'].get('C', ''))}\",\n"
            js_code += f"            D: \"{self.escape_js_string(question['options'].get('D', ''))}\"\n"
            js_code += "        }"
            
            if question.get('cancelled', False):
                js_code += ",\n        cancelled: true"
            
            if question.get('has_diagram', False):
                js_code += ",\n        has_diagram: true"
                js_code += f",\n        diagram_type: \"{question.get('diagram_type', 'unknown')}\""
            
            if question.get('has_table', False):
                js_code += ",\n        has_table: true"
                js_code += f",\n        table_type: \"{question.get('table_type', 'unknown')}\""
            
            js_code += "\n    }"
            
            if i < len(questions) - 1:
                js_code += ","
            
            js_code += "\n"
        
        js_code += "];\n"
        return js_code
    
    def escape_js_template_string(self, text: str) -> str:
        """Escape string for JavaScript template literals (for tables/multi-line content)"""
        if not text:
            return ""
        
        # Escape backticks and backslashes for template literals
        text = text.replace('\\', '\\\\')
        text = text.replace('`', '\\`')
        text = text.replace('${', '\\${')
        
        return text
    
    def escape_js_string(self, text: str) -> str:
        """Escape string for JavaScript"""
        if not text:
            return ""
        
        # Escape quotes and backslashes
        text = text.replace('\\', '\\\\')
        text = text.replace('"', '\\"')
        text = text.replace('\n', '\\n')
        text = text.replace('\r', '\\r')
        text = text.replace('\t', '\\t')
        
        return text
    
    def save_json(self, questions: List[Dict], output_path: str):
        """Save questions as JSON file"""
        with open(output_path, 'w', encoding='utf-8') as file:
            json.dump(questions, file, indent=2, ensure_ascii=False)
        print(f"JSON saved to {output_path}")
    
    def save_javascript(self, questions: List[Dict], output_path: str):
        """Save questions as JavaScript file"""
        js_code = self.generate_javascript_code(questions)
        with open(output_path, 'w', encoding='utf-8') as file:
            file.write(js_code)
        print(f"JavaScript code saved to {output_path}")
    
    def validate_questions(self, questions: List[Dict]) -> List[Dict]:
        """Validate and report issues with extracted questions"""
        issues = []
        
        for question in questions:
            question_issues = []
            
            # Check if all options are present
            expected_options = ['A', 'B', 'C', 'D']
            missing_options = [opt for opt in expected_options if opt not in question['options']]
            if missing_options:
                question_issues.append(f"Missing options: {missing_options}")
            
            # Check for suspiciously short or long options
            for opt, text in question['options'].items():
                if len(text) < 1:
                    question_issues.append(f"Option {opt} is empty")
                elif len(text) > 200:
                    question_issues.append(f"Option {opt} is suspiciously long ({len(text)} chars)")
            
            # Check for footer contamination patterns that might have been missed
            all_text = question['text'] + ' ' + ' '.join(question['options'].values())
            if re.search(r'AUV-A|Contd|P\.T\.O', all_text, re.IGNORECASE):
                question_issues.append("Possible footer contamination detected")
            
            if question_issues:
                issues.append({
                    'question_id': question['id'],
                    'issues': question_issues
                })
        
        return issues

def main():
    """Main function to run the extractor"""
    extractor = QuestionExtractor()
    
    print("Improved PDF Question Extractor with Footer Cleaning")
    print("1. Extract from PDF file")
    print("2. Extract from text file")
    print("3. Extract from pasted text")
    
    choice = input("Choose option (1/2/3): ").strip()
    
    questions = []
    
    if choice == "1":
        pdf_path = input("Enter PDF file path: ").strip()
        questions = extractor.extract_from_pdf(pdf_path)
    
    elif choice == "2":
        text_path = input("Enter text file path: ").strip()
        questions = extractor.extract_from_text_file(text_path)
    
    elif choice == "3":
        print("Paste your question text (press Ctrl+D when done):")
        import sys
        text = sys.stdin.read()
        questions = extractor.parse_questions_from_text(text)
    
    else:
        print("Invalid choice")
        return
    
    if not questions:
        print("No questions found!")
        return
    
    print(f"Extracted {len(questions)} questions")
    
    # Validate questions and report issues
    issues = extractor.validate_questions(questions)
    if issues:
        print(f"\nFound issues in {len(issues)} questions:")
        for issue in issues[:5]:  # Show first 5 issues
            print(f"Question {issue['question_id']}: {', '.join(issue['issues'])}")
        if len(issues) > 5:
            print(f"... and {len(issues) - 5} more issues")
    
    # Print first question as sample
    if questions:
        print("\nSample question:")
        print(f"ID: {questions[0]['id']}")
        print(f"Text: {questions[0]['text'][:100]}...")
        print(f"Options: {list(questions[0]['options'].keys())}")
        print(f"Option A: {questions[0]['options'].get('A', 'Missing')}")
    
    # Save options
    save_choice = input("\nSave as (1=JSON, 2=JavaScript, 3=Both): ").strip()
    
    if save_choice in ["1", "3"]:
        extractor.save_json(questions, "questions_cleaned.json")
    
    if save_choice in ["2", "3"]:
        extractor.save_javascript(questions, "data_cleaned.js")
    
    # Print JavaScript code for copy-paste
    if input("\nPrint JavaScript code for copy-paste? (y/n): ").lower() == 'y':
        print("\n" + "="*50)
        print("JavaScript code for data.js:")
        print("="*50)
        print(extractor.generate_javascript_code(questions))

if __name__ == "__main__":
    main()

# Alternative: Simple function for direct text input
def extract_questions_from_text(text_input: str) -> str:
    """Simple function to extract questions from text and return JavaScript code"""
    extractor = QuestionExtractor()
    questions = extractor.parse_questions_from_text(text_input)
    return extractor.generate_javascript_code(questions)