const coursesData = {
    "categories": [
      {
        "id": 1,
        "name": "Programming",
        "description": "Software development courses"
      }
    ],
    "instructors": [
      {
        "id": 1,
        "name": "Professor Oak",
        "bio": "Pokémon researcher and Python expert",
        "email": "oak@example.com"
      },
      {
        "id": 2,
        "name": "Professor Elm",
        "bio": "Web development specialist",
        "email": "elm@example.com"
      },
      {
        "id": 3,
        "name": "Professor Birch",
        "bio": "Cybersecurity researcher",
        "email": "birch@example.com"
      },
      {
        "id": 4,
        "name": "Professor Rowan",
        "bio": "Java and enterprise development expert",
        "email": "rowan@example.com"
      }
    ],
    "courses": [
      {
        "id": 1,
        "title": "Python Programming Masterclass",
        "instructorId": 1,
        "categoryId": 1,
        "shortDescription": "Learn Python from scratch to advanced level",
        "fullDescription": "This comprehensive course takes you from Python basics to advanced concepts...",
        "duration": "8 weeks",
        "level": "Beginner to Intermediate",
        "image": "https://via.placeholder.com/300x200?text=Python",
        "content": [
          {
            "id": "python_basics",
            "type": "video",
            "title": "Python Basics & Syntax",
            "duration": "18:45",
            "url": "#",
            "completed": false
          },
          {
            "id": "python_data_structures",
            "type": "video",
            "title": "Data Structures in Python",
            "duration": "25:30",
            "url": "#",
            "completed": false,
            "prerequisites": ["python_basics"]
          },
          {
            "id": "python_oop",
            "type": "video",
            "title": "Object-Oriented Programming",
            "duration": "22:15",
            "url": "#",
            "completed": false,
            "prerequisites": ["python_data_structures"]
          },
          {
            "id": "python_quiz",
            "type": "quiz",
            "title": "Test your Python programming skills",
            "duration": "15:00",
            "url": "#",
            "completed": false,
            "prerequisites": ["python_oop"]
          }
        ]
      },
      {
        "id": 2,
        "title": "Complete Web Development Bootcamp",
        "instructorId": 2,
        "categoryId": 1,
        "shortDescription": "Full-stack web development course",
        "fullDescription": "Full-stack web development course in HTML, CSS, JavaScript, React, Node.js, and MongoDB.",
        "duration": "12 weeks",
        "level": "Beginner to Advanced",
        "image": "https://via.placeholder.com/300x200?text=Web+Dev",
        "content": [
          {
            "id": "web_html_css",
            "type": "video",
            "title": "HTML & CSS Fundamentals",
            "duration": "20:10",
            "url": "#",
            "completed": false
          },
          {
            "id": "web_js",
            "type": "video",
            "title": "JavaScript Basics",
            "duration": "28:45",
            "url": "#",
            "completed": false,
            "prerequisites": ["web_html_css"]
          },
          {
            "id": "web_react",
            "type": "video",
            "title": "React Crash Course",
            "duration": "35:20",
            "url": "#",
            "completed": false,
            "prerequisites": ["web_js"]
          },
          {
            "id": "web_node",
            "type": "video",
            "title": "Node.js & Express",
            "duration": "30:15",
            "url": "#",
            "completed": false,
            "prerequisites": ["web_js"]
          },
          {
            "id": "web_frontend_quiz",
            "type": "quiz",
            "title": "Test your knowledge in Front-end development",
            "duration": "25:00",
            "url": "#",
            "completed": false,
            "prerequisites": ["web_react"]
          },
          {
            "id": "web_backend_quiz",
            "type": "quiz",
            "title": "Test your knowledge in Back-end development",
            "duration": "40:00",
            "url": "#",
            "completed": false,
            "prerequisites": ["web_node"]
          }
        ]
      },
      {
        "id": 3,
        "title": "Cybersecurity Fundamentals",
        "instructorId": 3,
        "categoryId": 1,
        "shortDescription": "Eveything Cybersecurity",
        "fullDescription": "Learn essential cybersecurity concepts, ethical hacking, and how to protect systems from threats.",
        "duration": "10 weeks",
        "level": "Intermediate",
        "image": "https://via.placeholder.com/300x200?text=Cybersecurity",
        "content": [
          {
            "id": "cyber_intro",
            "type": "video",
            "title": "Introduction to Cybersecurity",
            "duration": "15:30",
            "url": "#",
            "completed": false
          },
          {
            "id": "cyber_network",
            "type": "video",
            "title": "Network Security",
            "duration": "25:30",
            "url": "#",
            "completed": false,
            "prerequisites": ["cyber_intro"]
          },
          {
            "id": "cyber_crypto",
            "type": "video",
            "title": "Cryptography Basics",
            "duration": "25:30",
            "url": "#",
            "completed": false,
            "prerequisites": ["cyber_network"]
          },
          {
            "id": "cyber_quiz",
            "type": "quiz",
            "title": "Test your cybersecurity knowledge",
            "duration": "20:00",
            "url": "#",
            "completed": false,
            "prerequisites": ["cyber_crypto"]
          }
        ]
      },
      {
        "id": 4,
        "title": "Java Programming: From Basics to Advanced",
        "instructorId": 4,
        "categoryId": 1,
        "shortDescription": "How to Java",
        "fullDescription": "Master Java programming language, including core concepts, frameworks, and enterprise development.",
        "duration": "10 weeks",
        "level": "Beginner to Advanced",
        "image": "https://via.placeholder.com/300x200?text=Java",
        "content": [
          {
            "id": "java_basics",
            "type": "video",
            "title": "Java Syntax & Basics",
            "duration": "20:15",
            "url": "#",
            "completed": false
          },
          {
            "id": "java_oop",
            "type": "video",
            "title": "Object-Oriented Programming in Java",
            "duration": "25:40",
            "url": "#",
            "completed": false,
            "prerequisites": ["java_basics"]
          },
          {
            "id": "java_collections",
            "type": "video",
            "title": "Collections Framework",
            "duration": "18:25",
            "url": "#",
            "completed": false,
            "prerequisites": ["java_oop"]
          },
          {
            "id": "java_spring",
            "type": "video",
            "title": "Spring Boot Introduction",
            "duration": "30:10",
            "url": "#",
            "completed": false,
            "prerequisites": ["java_collections"]
          },
          {
            "id": "java_quiz",
            "type": "quiz",
            "title": "Test your Java Programming Skills",
            "duration": "30:00",
            "url": "#",
            "completed": false,
            "prerequisites": ["java_spring"]
          }
        ]
      }
    ],
    "reviews": [
      {
        "id": 1,
        "courseId": 1,
        "user": "Alex",
        "rating": 5,
        "comment": "Perfect for beginners! The projects really helped solidify my learning.",
        "date": "2025-01-10"
      },
      {
        "id": 2,
        "courseId": 1,
        "user": "Jaime",
        "rating": 4,
        "comment": "Great content, but some sections could use more examples.",
        "date": "2024-12-10"
      },
      {
        "id": 3,
        "courseId": 2,
        "user": "Taylor",
        "rating": 5,
        "comment": "Changed my career! Landed a web dev job after completing this.",
        "date": "2024-10-10"
      },
      {
        "id": 4,
        "courseId": 3,
        "user": "Sam",
        "rating": 4,
        "comment": "Excellent content on network security!",
        "date": "2024-09-03"
      },
      {
        "id": 5,
        "courseId": 4,
        "user": "Chris",
        "rating": 5,
        "comment": "Perfect for anyone wanting to learn Java properly.",
        "date": "2025-01-10"
      },
      {
        "id": 6,
        "courseId": 4,
        "user": "Jaime",
        "rating": 4,
        "comment": "Great course, but could use more examples on Spring Boot.",
        "date": "2024-12-10"
      }
    ]
};