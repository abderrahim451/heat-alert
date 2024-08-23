def get_mitigation_advice(temperature):
    if temperature > 35:
        return "Heatwave alert! Drink plenty of water, stay in cool places, and avoid strenuous activities."
    elif 25 <= temperature <= 35:
        return "Warm weather. Stay hydrated and use sunscreen if outdoors."
    elif 0 <= temperature < 25:
        return "Cool weather. Dress in layers to stay comfortable."
    elif temperature < 0:
        return "Cold weather. Wear warm clothing, limit outdoor exposure, and stay inside if possible."
    else:
        return "Extreme weather conditions. Stay safe and follow local advisories."
