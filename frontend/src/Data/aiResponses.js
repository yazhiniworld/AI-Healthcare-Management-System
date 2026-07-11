const aiResponses = [
  {
    keywords: ["leg pain", "knee pain", "joint pain"],
    response: {
      title: "Orthopedic Recommendation",
      message:
        "Based on your symptoms, you should consult an Orthopedic Doctor.",
      doctor: "Orthopedic",
      tips: [
        "Avoid heavy exercise.",
        "Rest the affected leg.",
        "Apply an ice pack if swollen."
      ]
    }
  },

  {
    keywords: ["fever", "cold", "cough"],
    response: {
      title: "General Physician",
      message:
        "You should consult a General Physician.",
      doctor: "General Physician",
      tips: [
        "Drink plenty of water.",
        "Take adequate rest.",
        "Monitor your temperature."
      ]
    }
  },

  {
    keywords: ["headache", "migraine"],
    response: {
      title: "Neurologist",
      message:
        "Persistent headaches should be evaluated by a Neurologist.",
      doctor: "Neurologist",
      tips: [
        "Reduce screen time.",
        "Stay hydrated.",
        "Sleep at least 7 hours."
      ]
    }
  },

  {
    keywords: ["chest pain", "heart"],
    response: {
      title: "Cardiologist",
      message:
        "Chest pain can sometimes be serious. Please consult a Cardiologist immediately.",
      doctor: "Cardiologist",
      tips: [
        "Avoid physical exertion.",
        "Visit the emergency room if pain is severe.",
        "Call emergency services if necessary."
      ]
    }
  },

  {
    keywords: ["skin", "allergy", "rash"],
    response: {
      title: "Dermatologist",
      message:
        "A Dermatologist is the right specialist for skin-related conditions.",
      doctor: "Dermatologist",
      tips: [
        "Avoid scratching.",
        "Keep the area clean.",
        "Avoid known allergens."
      ]
    }
  },

  {
    keywords: ["eye", "vision"],
    response: {
      title: "Ophthalmologist",
      message:
        "Please consult an Ophthalmologist for eye-related problems.",
      doctor: "Ophthalmologist",
      tips: [
        "Avoid rubbing your eyes.",
        "Limit screen time.",
        "Use proper lighting."
      ]
    }
  },

  {
    keywords: ["tooth", "teeth"],
    response: {
      title: "Dentist",
      message:
        "You should consult a Dentist.",
      doctor: "Dentist",
      tips: [
        "Brush twice daily.",
        "Avoid sugary foods.",
        "Schedule a dental check-up."
      ]
    }
  }
];

export default aiResponses;