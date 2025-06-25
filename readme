# DateSheet API Documentation

## Overview

This API allows you to create, edit, delete, and search exam date sheets for an educational institution. Each date sheet is linked to an exam and contains subject-wise exam dates and times.

---

## Endpoints

### 1. Create DateSheet

- **Endpoint:** `POST /api/exam/createdatasheet`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examName": "Mid Term",
    "examClass": 10,
    "datesheet": [
      {
        "subject": "Math",
        "date": "2024-09-10",
        "time": "10:00 AM"
      },
      {
        "subject": "Science",
        "date": "2024-09-12",
        "time": "10:00 AM"
      }
      // ...more subjects
    ]
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "new datesheet created",
    "data": {
      "_id": "ObjectId",
      "academicYear": "2024-2025",
      "examName": "Mid Term",
      "examClass": 10,
      "datesheet": [
        {
          "subject": "Math",
          "date": "2024-09-10T00:00:00.000Z",
          "time": "10:00 AM"
        }
        // ...more subjects
      ]
    }
  }
  ```

---

### 2. Edit DateSheet

- **Endpoint:** `PUT /api/exam/editdatasheet`
- **Request Body:**
  ```json
  {
    "datesheetId": "ObjectId",
    "academicYear": "2024-2025",
    "examName": "Mid Term",
    "examClass": 10,
    "datesheet": [
      {
        "subject": "Math",
        "date": "2024-09-10",
        "time": "10:00 AM"
      }
      // ...more subjects
    ]
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "update succesffuly",
    "data": {
      "_id": "ObjectId",
      "academicYear": "2024-2025",
      "examName": "Mid Term",
      "examClass": 10,
      "datesheet": [
        {
          "subject": "Math",
          "date": "2024-09-10T00:00:00.000Z",
          "time": "10:00 AM"
        }
        // ...more subjects
      ]
    }
  }
  ```

---

### 3. Delete DateSheet

- **Endpoint:** `DELETE /api/exam/deletedatasheet/`
- **Request Query/Params:**
  - `datesheetId` (as a query or param, depending on your frontend implementation)
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Date sheet deleted successfully",
    "data": null
  }
  ```

---

### 4. Search DateSheet

- **Endpoint:** `GET /api/exam/searchdatasheet`
- **Request Query/Params:**
  - `academicYear`
  - `examName`
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "datesheet fetched",
    "data": [
      {
        "academicYear": "2024-2025",
        "examName": "Mid Term",
        "examClass": 10,
        "subjectCount": 5,
        "createdAt": "2024-06-24T12:00:00.000Z"
      }
      // ...more date sheets
    ]
  }
  ```

---

## Common Response Format

All API responses follow this structure:
```json
{
  "statusCode": <number>,
  "message": "<string>",
  "data": <object|null>
}
```

---

## Notes

- All endpoints expect and return JSON.
- For protected routes, include authentication tokens as required by your middleware.
- Replace `"ObjectId"` with actual MongoDB ObjectId strings.
- Dates should be in ISO format (`YYYY-MM-DD`).
```# DateSheet API Documentation

## Overview

This API allows you to create, edit, delete, and search exam date sheets for an educational institution. Each date sheet is linked to an exam and contains subject-wise exam dates and times.

---

## Endpoints

### 1. Create DateSheet

- **Endpoint:** `POST /api/exam/createdatasheet`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examName": "Mid Term",
    "examClass": 10,
    "datesheet": [
      {
        "subject": "Math",
        "date": "2024-09-10",
        "time": "10:00 AM"
      },
      {
        "subject": "Science",
        "date": "2024-09-12",
        "time": "10:00 AM"
      }
      // ...more subjects
    ]
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "new datesheet created",
    "data": {
      "_id": "ObjectId",
      "academicYear": "2024-2025",
      "examName": "Mid Term",
      "examClass": 10,
      "datesheet": [
        {
          "subject": "Math",
          "date": "2024-09-10T00:00:00.000Z",
          "time": "10:00 AM"
        }
        // ...more subjects
      ]
    }
  }
  ```

---

### 2. Edit DateSheet

- **Endpoint:** `PUT /api/exam/editdatasheet`
- **Request Body:**
  ```json
  {
    "datesheetId": "ObjectId",
    "academicYear": "2024-2025",
    "examName": "Mid Term",
    "examClass": 10,
    "datesheet": [
      {
        "subject": "Math",
        "date": "2024-09-10",
        "time": "10:00 AM"
      }
      // ...more subjects
    ]
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "update succesffuly",
    "data": {
      "_id": "ObjectId",
      "academicYear": "2024-2025",
      "examName": "Mid Term",
      "examClass": 10,
      "datesheet": [
        {
          "subject": "Math",
          "date": "2024-09-10T00:00:00.000Z",
          "time": "10:00 AM"
        }
        // ...more subjects
      ]
    }
  }
  ```

---

### 3. Delete DateSheet

- **Endpoint:** `DELETE /api/exam/deletedatasheet/`
- **Request Query/Params:**
  - `datesheetId` (as a query or param, depending on your frontend implementation)
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Date sheet deleted successfully",
    "data": null
  }
  ```

---

### 4. Search DateSheet

- **Endpoint:** `GET /api/exam/searchdatasheet`
- **Request Query/Params:**
  - `academicYear`
  - `examName`
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "datesheet fetched",
    "data": [
      {
        "academicYear": "2024-2025",
        "examName": "Mid Term",
        "examClass": 10,
        "subjectCount": 5,
        "createdAt": "2024-06-24T12:00:00.000Z"
      }
      // ...more date sheets
    ]
  }
  ```

---

# Exam Analytics API Documentation

## Overview

This API provides endpoints for analytics and statistics related to exams, including top students, pass/fail distribution, score distribution, and overall exam analytics. All endpoints are under the `/api/exam` route.

---

## Endpoints

### 1. Top Students

- **Endpoint:** `GET /api/exam/topstudent`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examClass": 10,
    "examName": "Mid Term"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "distribution of pass-fail",
    "data": [
      {
        "studentId": "ObjectId",
        "percentage": 95,
        "name": { "firstName": "John", "lastName": "Doe" },
        "roll": "101"
      }
      // ...up to 3 top students
    ]
  }
  ```

---

### 2. Pass/Fail Distribution

- **Endpoint:** `GET /api/exam/passfailnumber`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examClass": 10,
    "examName": "Mid Term"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "distribution of pass-fail",
    "data": [
      { "_id": "passed", "participants": 25 },
      { "_id": "failed", "participants": 5 }
    ]
  }
  ```

---

### 3. Score Distribution

- **Endpoint:** `GET /api/exam/scoredistribution`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examClass": 10,
    "examName": "Mid Term"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "all your range count",
    "data": [
      { "_id": 0, "count": 0 },
      { "_id": 11, "count": 0 },
      { "_id": 21, "count": 2 },
      { "_id": 31, "count": 5 }
      // ...other ranges
    ]
  }
  ```

---

### 4. Exam Analytics

- **Endpoint:** `GET /api/exam/examstats`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examClass": 10,
    "examName": "Mid Term"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "exam analytics found",
    "data": [
      {
        "participants": 30,
        "averageMark": 75.2,
        "topScore": 98
      }
    ]
  }
  ```

---

## Common Response Format

All API responses follow this structure:
```json
{
  "statusCode": <number>,
  "message": "<string>",
  "data": <object|array|null>
}
```

---

## Notes

- All endpoints expect and return JSON.
- For protected routes, include authentication tokens as required by your middleware.
- Replace `"ObjectId"` with actual MongoDB ObjectId strings.
- All analytics endpoints require `academicYear`, `examClass`, and `examName` in the request body.


# Exam Analytics API Documentation

## Overview

This API provides endpoints for analytics and statistics related to exams, including top students, pass/fail distribution, score distribution, and overall exam analytics. All endpoints are under the `/api/exam` route.

---

## Endpoints

### 1. Top Students

- **Endpoint:** `GET /api/exam/topstudent`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examClass": 10,
    "examName": "Mid Term"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "distribution of pass-fail",
    "data": [
      {
        "studentId": "ObjectId",
        "percentage": 95,
        "name": { "firstName": "John", "lastName": "Doe" },
        "roll": "101"
      }
      // ...up to 3 top students
    ]
  }
  ```

---

### 2. Pass/Fail Distribution

- **Endpoint:** `GET /api/exam/passfailnumber`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examClass": 10,
    "examName": "Mid Term"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "distribution of pass-fail",
    "data": [
      { "_id": "passed", "participants": 25 },
      { "_id": "failed", "participants": 5 }
    ]
  }
  ```

---

### 3. Score Distribution

- **Endpoint:** `GET /api/exam/scoredistribution`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examClass": 10,
    "examName": "Mid Term"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "all your range count",
    "data": [
      { "_id": 0, "count": 0 },
      { "_id": 11, "count": 0 },
      { "_id": 21, "count": 2 },
      { "_id": 31, "count": 5 }
      // ...other ranges
    ]
  }
  ```

---

### 4. Exam Analytics

- **Endpoint:** `GET /api/exam/examstats`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examClass": 10,
    "examName": "Mid Term"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "exam analytics found",
    "data": [
      {
        "participants": 30,
        "averageMark": 75.2,
        "topScore": 98
      }
    ]
  }
  ```

---

## Common Response Format

All API responses follow this structure:
```json
{
  "statusCode": <number>,
  "message": "<string>",
  "data": <object|array|null>
}
```

---

# Student Marks Filter API Documentation

## Overview

This API provides endpoints to filter student marks based on exam/class/section and to view detailed marks for a specific student and exam. All endpoints are under the `/api/exam` route.

---

## Endpoints

### 1. Filter Students by Exam/Class/Section

- **Endpoint:** `GET /api/exam/filterstudent`
- **Query Parameters:**
  - `examclass` (optional): Filter by class (e.g., `10`)
  - `section` (optional): Filter by section (e.g., `A`)
  - `examName` (optional): Filter by exam name (e.g., `"Mid Term"`)

- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "filter data",
    "data": [
      {
        "studentId": "ObjectId",
        "examId": "ObjectId",
        "name": { "firstName": "John", "lastName": "Doe" },
        "class": 10,
        "section": "A",
        "cumaltiveMarks": 250,
        "maximumMarks": 300
      }
      // ...more students
    ]
  }
  ```

---

### 2. View Details of a Student's Exam Result

- **Endpoint:** `GET /api/exam/viewdetails`
- **Query Parameters:**
  - `studentId`: The student's ObjectId
  - `examId`: The exam's ObjectId

- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Student exam result fetched successfully",
    "data": {
      "studentDetails": {
        "name": "John Doe",
        "rollNumber": "101",
        "class": "10-A",
        "academicYear": "2024-2025"
      },
      "examDetails": {
        "examType": "Mid Term",
        "overallScore": "250/300",
        "average": 83.3
      },
      "subjectWisePerformance": [
        {
          "subject": "Math",
          "marks": 90,
          "total": 100,
          "percentage": "90"
        },
        {
          "subject": "Science",
          "marks": 80,
          "total": 100,
          "percentage": "80"
        }
        // ...more subjects
      ]
    }
  }
  ```

---

## Common Response Format

All API responses follow this structure:
```json
{
  "statusCode": <number>,
  "message": "<string>",
  "data": <object|array|null>
}
```

---

# Marks Management API Documentation

## Overview

This API provides endpoints for managing marks assignment, entry, and viewing for exams. It supports admin and teacher workflows, including assigning marks entry to teachers, entering marks, and viewing marks and statistics. All endpoints are under the `/api/exam` route.

---

## Endpoints

### 1. Show Assign Marks Portal (Admin)

- **Endpoint:** `GET /api/exam/showassignmarkportal`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examName": "Mid Term"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "all exams send",
    "data": [
      {
        "examName": "Mid Term",
        "examClass": 10,
        "sectionsCount": 3,
        "examTerm": "Term 1",
        "academicYear": "2024-2025",
        "subjects": [
          { "subject": "Math", "date": "2024-09-10", "time": "10:00 AM" }
          // ...more subjects
        ],
        "subjectsCount": 5
      }
      // ...more exams
    ]
  }
  ```

---

### 2. Assign Marks to Teacher (Admin)

- **Endpoint:** `POST /api/exam/assignmarkstoteacher`
- **Request Body:**
  ```json
  {
    "academicYear": "2024-2025",
    "examClass": 10,
    "section": "A",
    "examName": "Mid Term",
    "startDate": "2024-09-10",
    "endDate": "2024-09-20",
    "assignTeachers": [
      { "teacher": "John Doe", "subject": "Math" }
      // ...more assignments
    ]
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "marks are assigned to teacher",
    "data": null
  }
  ```

---

### 3. Enter Mark (Teacher)

- **Endpoint:** `GET /api/exam/entermark`
- **Request Body:**
  ```json
  {
    "examId": "ObjectId",
    "section": "A",
    "subject": "Math"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "all students marks",
    "data": [
      {
        "examId": "ObjectId",
        "studentId": "ObjectId",
        "name": { "firstName": "John", "lastName": "Doe" },
        "roll": "101",
        "subjectMarks": 90,
        "remark": "Good"
      }
      // ...more students
    ]
  }
  ```

---

### 4. Submit Student Marks (Teacher)

- **Endpoint:** `POST /api/exam/submitstudentmarks`
- **Request Body:**
  ```json
  {
    "examId": "ObjectId",
    "subject": "Math",
    "marks": [
      { "studentId": "ObjectId", "score": 90, "remark": "Good" }
      // ...more students
    ],
    "maxMarks": 100
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "update successfully",
    "data": null
  }
  ```

---

### 5. View Marks (Teacher)

- **Endpoint:** `GET /api/exam/viewmark`
- **Request Body:**
  ```json
  {
    "session": "2024-2025",
    "examClass": 10,
    "subject": "Math",
    "examName": "Mid Term",
    "section": "A"
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "all students",
    "data": {
      "students": [
        {
          "examId": "ObjectId",
          "studentId": "ObjectId",
          "name": { "firstName": "John", "lastName": "Doe" },
          "roll": "101",
          "subjectMarks": 90,
          "subjectRemark": "Good"
        }
        // ...more students
      ],
      "averageMark": 85,
      "count": 30,
      "avgPercentage": "85"
    }
  }
  ```

---

# Exam Management API Documentation

## Overview

This API provides endpoints for creating new exams. Each exam includes details such as name, class, status, term, date range, academic year, and sections. All endpoints are under the `/api/exam` route.

---

## Endpoints

### 1. Create New Exam

- **Endpoint:** `POST /api/exam/newExam`
- **Request Body:**
  ```json
  {
    "examName": "Mid Term",
    "examClass": 10,
    "examStatus": "active",
    "examTerm": "Term 1",
    "examDateRange": "2024-09-10 to 2024-09-20",
    "academicYear": "2024-2025",
    "sections": ["A", "B", "C"]
  }
  ```
- **Response:**
  ```json
  {
    "statusCode": 201,
    "message": "Exam created",
    "data": {
      "_id": "ObjectId",
      "examName": "Mid Term",
      "examClass": 10,
      "examStatus": "active",
      "examTerm": "Term 1",
      "examDateRange": "2024-09-10 to 2024-09-20",
      "academicYear": "2024-2025",
      "sections": ["A", "B", "C"],
      "createdAt": "2024-06-25T12:00:00.000Z",
      "updatedAt": "2024-06-25T12:00:00.000Z"
    }
  }
  ```

---

# Student Marks API Documentation

## Overview

This API provides endpoints for students to view their detailed exam results and annual report cards. All endpoints are under the `/api/v1/marks` route.

---

## Endpoints

### 1. Get Exam Result for a Student

- **Endpoint:** `GET /api/exam/student/results/:studentId/exam/:examId`
- **Path Parameters:**
  - `studentId`: The student's ObjectId
  - `examId`: The exam's ObjectId

- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Student exam result fetched successfully",
    "data": {
      "studentDetails": {
        "name": "John Doe",
        "rollNumber": "101",
        "class": "10-A",
        "academicYear": "2024-2025"
      },
      "examDetails": {
        "examType": "Mid Term",
        "overallScore": "250/300",
        "average": 83.3
      },
      "subjectWisePerformance": [
        {
          "subject": "Math",
          "marks": 90,
          "total": 100,
          "percentage": "90"
        },
        {
          "subject": "Science",
          "marks": 80,
          "total": 100,
          "percentage": "80"
        }
        // ...more subjects
      ]
    }
  }
  ```

---

### 2. Get Annual Report Card

- **Endpoint:** `GET /api/exam/student/reportcard/:studentId/year/:academicYear`
- **Path Parameters:**
  - `studentId`: The student's ObjectId
  - `academicYear`: The academic year (e.g., `"2024-2025"`)

- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Student annual report fetched successfully",
    "data": {
      "studentDetails": {
        "name": "John Doe",
        "rollNumber": "101",
        "class": "10-A",
        "academicYear": "2024-2025"
      },
      "subjectWisePerformance": [
        {
          "subjectName": "Math",
          "theoryMarks": 90,
          "practicalMarks": "N/A",
          "totalMarks": 90,
          "maxMarks": 100,
          "grade": "A"
        }
        // ...more subjects
      ],
      "summary": {
        "remarks": "Excellent",
        "totalMarks": 450,
        "maxMarks": 500,
        "finalGrade": "A"
      }
    }
  }
  ```

---

# Exam API Documentation

## Overview

This API provides endpoints for managing and retrieving exam information, including listing all exams, searching exams, and fetching a single exam by ID. All endpoints are under the `/api/exam` route.

---

## Endpoints

### 1. Get All Exams

- **Endpoint:** `GET /api/exam/getallexam`
- **Query Parameters (optional):**
  - `page`: Page number for pagination (default: 1)
  - `limit`: Number of exams per page (default: 10)
  - `query`: Search string for exam name or term
  - `sortBy`: Field to sort by (default: `createdAt`)
  - `sortType`: `asc` or `desc` (default: `desc`)
  - `academicYear`: Filter by academic year
  - `examTerm`: Filter by exam term
  - `examStatus`: Filter by exam status

- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Exams fetched successfully",
    "data": {
      "exams": [
        {
          "_id": "ObjectId",
          "examName": "Mid Term",
          "examClass": 10,
          "examStatus": "active",
          "examTerm": "Term 1",
          "examDateRange": "2024-09-10 to 2024-09-20",
          "academicYear": "2024-2025",
          "sections": ["A", "B", "C"],
          "createdAt": "2024-06-25T12:00:00.000Z",
          "updatedAt": "2024-06-25T12:00:00.000Z"
        }
        // ...more exams
      ],
      "totalPages": 2,
      "currentPage": 1
    }
  }
  ```

---

### 2. Search Exams

- **Endpoint:** `GET /api/exam/searchexam`
- **Query Parameters:**
  - `q`: Search string for exam name or term

- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Exams found successfully",
    "data": [
      {
        "_id": "ObjectId",
        "examName": "Mid Term",
        "examClass": 10,
        "examStatus": "active",
        "examTerm": "Term 1",
        "examDateRange": "2024-09-10 to 2024-09-20",
        "academicYear": "2024-2025",
        "sections": ["A", "B", "C"],
        "createdAt": "2024-06-25T12:00:00.000Z",
        "updatedAt": "2024-06-25T12:00:00.000Z"
      }
      // ...more exams matching the search
    ]
  }
  ```

---

### 3. Get Exam by ID

- **Endpoint:** `GET /api/exam/:examId`
- **Path Parameters:**
  - `examId`: The exam's ObjectId

- **Response:**
  ```json
  {
    "statusCode": 200,
    "message": "Exam fetched successfully",
    "data": {
      "_id": "ObjectId",
      "examName": "Mid Term",
      "examClass": 10,
      "examStatus": "active",
      "examTerm": "Term 1",
      "examDateRange": "2024-09-10 to 2024-09-20",
      "academicYear": "2024-2025",
      "sections": ["A", "B", "C"],
      "createdAt": "2024-06-25T12:00:00.000Z",
      "updatedAt": "2024-06-25T12:00:00.000Z"
    }
  }
  ```

---
