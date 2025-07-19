curl -X POST http://localhost:3000/api/mentor/register \
  -H "Content-Type: application/json" \
  -d '{
    "firebaseUid": "testuid123",
    "email": "mentor@test.com",
    "fullName": "Test Mentor",
    "age": 30,
    "contactNumber": "0712345678",
    "preferredLanguage": "English",
    "currentLocation": "Colombo",
    "bio": "Experienced physics teacher with 5 years of teaching experience",
    "professionalRole": "Senior Physics Teacher",
    "subjects": [
      {
        "subjectName": "Physics",
        "teachingExperience": "Three_to_Five_Years",
        "preferredLevels": ["O_L", "A_L"]
      },
      {
        "subjectName": "Mathematics",
        "teachingExperience": "One_to_Three_Years",
        "preferredLevels": ["O_L"]
      }
    ],
    "linkedinUrl": "https://linkedin.com/in/testmentor",
    "githubOrPortfolioUrl": "https://github.com/testmentor",
    "profilePictureUrl": "https://example.com/profile.jpg"
  }'
