from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

# Load models + scalers
fire_model = joblib.load("models/fire.pkl")
fire_scaler = joblib.load("models/fire_scaler.pkl")

earthquake_model = joblib.load("models/earthquake.pkl")
earthquake_scaler = joblib.load("models/earthquake_scaler.pkl")

flood_model = joblib.load("models/flood.pkl")
flood_scaler = joblib.load("models/flood_scaler.pkl")


# ---------------- FIRE ----------------
class FireInput(BaseModel):
    latitude: float
    longitude: float
    sea_distance: float
    NDVI: float
    SoilMoisture: float
    dew_point_weekly_mean: float
    average_temperature_weekly_mean: float

@app.post("/predict/fire")
def predict_fire(data: FireInput):

    # Convert input to dict
    input_dict = data.dict()

    # Create DataFrame
    df = pd.DataFrame([input_dict])

    # 🔥 Enforce correct column order
    df = df[fire_scaler.feature_names_in_]

    # Scale
    scaled = fire_scaler.transform(df)

    # Predict probability
    prob = fire_model.predict_proba(scaled)[0][1]

    # Confidence
    confidence = max(prob, 1 - prob)

    # Risk classification
    if prob > 0.6:
        risk = "High Risk"
    elif prob > 0.3:
        risk = "Medium Risk"
    else:
        risk = "Low Risk"

    return {
        "fire_probability": round(float(prob), 4),
        "confidence": round(float(confidence), 4),
        "risk": risk
    }



# ---------------- EARTHQUAKE ----------------
class EarthquakeInput(BaseModel):
    latitude: float
    longitude: float
    depth: float
    magnitude: float


@app.post("/predict/earthquake")
def predict_earthquake(data: EarthquakeInput):

    df = pd.DataFrame([data.dict()])

    # ✅ enforce correct order
    df = df[["latitude", "longitude", "depth", "magnitude"]]

    scaled = earthquake_scaler.transform(df)

    # 🔥 Ensemble predictions for confidence
    preds = [tree.predict(scaled)[0] for tree in earthquake_model.estimators_]

    import numpy as np
    preds = np.array(preds)

    predicted_sig = preds.mean()
    std_dev = preds.std()

    # ✅ Confidence (based on agreement between trees)
    confidence = max(0, 1 - (std_dev / 200))

    # ✅ Probability (normalized sig)
    probability = min(predicted_sig / 1000, 1)

    # ✅ Risk classification
    if predicted_sig < 100:
        risk = "Low"
    elif predicted_sig < 500:
        risk = "Medium"
    else:
        risk = "High"

    return {
        "predicted_sig": round(float(predicted_sig), 2),
        "earthquake_probability": round(float(probability), 4),
        "confidence": round(float(confidence), 4),
        "risk": risk
    }
# ---------------- FLOOD ----------------
class FloodInput(BaseModel):
    rainfall: float
    temperature: float
    humidity: float
    river_discharge: float
    water_level: float
    elevation: float
    historical_floods: int


@app.post("/predict/flood")
def predict_flood(data: FloodInput):

    # Convert input to DataFrame
    df = pd.DataFrame([data.dict()])

    # Scale using the saved scaler
    scaled = flood_scaler.transform(df)

    # Predict
    pred = flood_model.predict(scaled)[0]
    prob = flood_model.predict_proba(scaled)[0][1]  # probability of flood

    return {
        "prediction": int(pred),
        "flood_probability": float(prob)
    }


# Load landslide model (ensure this file exists in your models/ folder)
landslide_model = joblib.load("models/landslide.pkl") 

# ---------------- LANDSLIDE ----------------
class LandslideInput(BaseModel):
    latitude: float
    longitude: float
    distance: float
    population: float
    landslide_size: str
    trigger: str

@app.post("/predict/landslide")
def predict_landslide(data: LandslideInput):
    # Convert Pydantic model to dictionary
    input_dict = data.dict()

    # 1. Map Categorical Strings to Numbers 
    # CRITICAL: These must match the mapping used during your model training
    size_map = {"small": 0, "medium": 1, "large": 2, "very_large": 3}
    trigger_map = {"rain": 0, "earthquake": 1, "snow": 2, "construction": 3, "other": 4}

    # Apply the mapping with a default value to prevent crashes on unknown strings
    input_dict["landslide_size"] = size_map.get(input_dict["landslide_size"], 1) 
    input_dict["trigger"] = trigger_map.get(input_dict["trigger"], 0)

    # 2. Create DataFrame and enforce feature order
    df = pd.DataFrame([input_dict])
    
    # 3. Predict using .values to avoid feature name warnings
    # This converts the DataFrame to a NumPy array, matching how most models are fitted
    prob = landslide_model.predict_proba(df.values)[0][1]
    prediction = int(landslide_model.predict(df.values)[0])

    confidence = max(prob, 1 - prob)

    return {
        "Prediction": prediction,
        "Probability": round(float(prob), 4),
        "confidence": round(float(confidence), 4),
        "risk": "High Risk" if prob > 0.6 else "Medium Risk" if prob > 0.3 else "Low Risk"
    }