from leak_detector_ml import LeakDetectorML

if __name__ == "__main__":
    detector = LeakDetectorML(model_path="../models/leak_model.pkl")
    detector.train_model_from_csv("../models/training_data.csv", label_field="label")
