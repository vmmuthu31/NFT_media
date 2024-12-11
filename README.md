# Inno-Analysis: Static Analysis Tool for Android Projects

Inno-Analysis is a static analysis tool designed to detect vulnerabilities in Android project files. It features a Flask-based web interface, backend functionality, and database integration for storing and retrieving scan results.

---

## Features

- **Static Code Analysis:**
  - Scans source files (`.kt`, `.java`, `.xml`, `.json`) for vulnerabilities using regex patterns.
  - Detects issues like hardcoded API keys, insecure cryptographic algorithms, and sensitive information exposure.
  
- **Dependency Analysis:**
  - Analyzes `build.gradle` files for outdated libraries or insecure dependencies.

- **Database Integration:**
  - Stores results in an SQLite database (`static_analysis.db`).

- **REST API Endpoints:**
  - `/upload_report` - Uploads JSON vulnerability reports to the database.
  - `/results` - Fetches stored vulnerabilities.

- **Real-Time Suggestions:**
  - Provides actionable advice for fixing identified issues.

---

## Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Steps to Install
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/inno-analysis.git
   cd inno-analysis

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate

3. Install required dependencies:
   ```bash
   pip install -r requirements.txt

4. Install required dependencies:
   ```bash
   python mainapp.py
