
```markdown
# Disaster Prediction System

A comprehensive multi-disaster prediction system that integrates machine learning models with AI-powered analysis. This system predicts the probability of natural disasters (Fire, Flood, Earthquake, Landslide) and provides AI-generated analysis and actionable insights when risk levels are high.

## 📋 Table of Contents

- [System Overview](#system-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Workflow](#workflow)
- [Contributing](#contributing)
- [License](#license)

## 🌟 System Overview

This is a full-stack web application designed to predict natural disasters based on environmental sensor data. It consists of three main components:

1.  **Backend (Node.js/Express)**: Acts as the central API gateway, coordinating communication between the frontend, ML models, and AI services.
2.  **ML API (Python/FastAPI)**: Hosts trained machine learning models to perform numerical predictions.
3.  **Frontend (React)**: Provides a user interface for data input and visualizes prediction results.

When the predicted risk exceeds **60%**, the system automatically triggers the **Google Gemini AI** to generate a detailed report including severity assessment, risk level, historical matches, and precautionary measures.

## 🛠 Tech Stack

### Backend
- **Node.js** & **Express**: Server framework
- **Axios**: HTTP client for API requests
- **@google/genai**: Integration for Google Generative AI
- **CORS**: Cross-Origin Resource Sharing
- **Dotenv**: Environment variable management

### ML API
- **Python** & **FastAPI**: High-performance web framework for ML models
- **Joblib**: Model loading and serialization
- **Scikit-learn/Pandas/NumPy**: Data processing and model training dependencies

### Frontend
- **React**: UI library
- **Vite**: Next Generation Frontend Tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Composable charting library
- **Lucide React**: Beautiful & consistent icon toolkit

## 📂 Project Structure

```text
Disaster/
├── backend/                 # Backend Service Directory
│   ├── config/              # Configuration files
│   │   └── gemini.js        # Google AI configuration
│   ├── controllers/         # Request handling logic
│   │   └── disasterController.js
│   ├── routes/              # API route definitions
│   │   └── disasterRoutes.js
│   ├── services/            # External service integrations
│   │   └── aiService.js
│   ├── .env                 # Environment variables
│   └── server.js            # Backend entry point
├── frontend/                # Frontend Application Directory
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page views
│   │   └── main.jsx         # Frontend entry point
│   ├── index.html
│   └── package.json
├── ml-api/                  # Machine Learning Model Service
│   ├── models/              # Directory for .pkl model files
│   ├── app.py               # FastAPI application entry
│   └── requirements.txt     # Python dependencies
└── dataset/                 # Training datasets
```

## ✨ Features

- **Multi-Disaster Prediction**: Supports probability prediction for Fire, Flood, Earthquake, and Landslide.
- **Intelligent AI Analysis**: Automatically generates detailed analysis reports when risk probability > 60%, including:
  - Severity Assessment
  - Risk Level Classification
  - Precautionary Measures for Authorities and Civilians
  - Historical Disaster Matches
- **Data Visualization**: Frontend displays prediction results through intuitive charts and graphs.
- **Modular Architecture**: Easy to extend with new disaster types or models.

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Python (3.8 or higher)
- npm or yarn
- Google Gemini API Key

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Disaster
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:

```env
PORT=5000
ML_API_URL=http://localhost:8000
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:5000`.

### 3. ML API Setup

```bash
cd ml-api
pip install -r requirements.txt
```

Ensure the `models/` directory contains your trained model files (e.g., `fire.pkl`, `flood.pkl`).

Start the ML service:

```bash
python app.py
```

The ML API will run on `http://localhost:8000`.

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access the application at `http://localhost:5173`.

## 🔌 API Documentation

Base URL: `http://localhost:5000/api/disaster`

### Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/fire` | Predict fire probability |
| POST | `/flood` | Predict flood probability |
| POST | `/earthquake` | Predict earthquake probability |
| POST | `/landslide` | Predict landslide probability |

### Request Example (Fire Prediction)

**Request Body:**

```json
{
  "latitude": 12.9716,
  "longitude": 77.5946,
  "sea_distance": 350,
  "NDVI": 0.4,
  "SoilMoisture": 20,
  "dew_point": 18,
  "temperature": 35
}
```

**Response Body:**

```json
{
  "disasterType": "Fire",
  "probability": 75,
  "riskLevel": "High",
  "aiAnalysis": {
    "severity": "Critical",
    "explanation": "High temperatures combined with low soil moisture significantly increase the risk of fire...",
    "precautions": {
      "authorities": "Deploy fire-fighting units immediately to the affected sector...",
      "civilians": "Avoid outdoor activities and keep emergency kits ready..."
    }
  }
}
```

## 🔄 Workflow

1.  **User Input**: The user enters environmental parameters (e.g., temperature, rainfall) via the Frontend interface.
2.  **Backend Reception**: The Node.js Backend receives the POST request.
3.  **ML Prediction**: The Backend forwards the data to the Python FastAPI (ML API).
4.  **Model Calculation**: The ML API loads the corresponding `.pkl` model and calculates the disaster probability.
5.  **AI Trigger**:
    - If probability **> 60%**: The Backend calls `aiService.js`.
    - `aiService` sends the data and context to Google Gemini AI.
    - AI returns a structured JSON analysis.
6.  **Response Composition**: The Backend combines the ML probability result with the AI analysis.
7.  **Frontend Display**: The Frontend receives the final response and renders the results and charts.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
```
