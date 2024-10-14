CREATE TABLE Attendance (
    Id INT PRIMARY KEY IDENTITY(1,1),
    StudentId INT NOT NULL,
    ClassId INT NOT NULL,
    Date DATE NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    Notes NVARCHAR(255),
    FOREIGN KEY (StudentId) REFERENCES Students(Id),
    FOREIGN KEY (ClassId) REFERENCES Classes(Id)
);

CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Passwords should be hashed before storage
    role VARCHAR(50) NOT NULL CHECK (role IN ('Admin', 'Teacher', 'Student'))
);

-- Create a table for storing class information
CREATE TABLE classes (
    id INT PRIMARY KEY IDENTITY,
    class_name VARCHAR(100) NOT NULL,
    teacher_id INT NOT NULL,
    room VARCHAR(50),
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create a table for storing schedule information
CREATE TABLE schedules (
    id INT PRIMARY KEY IDENTITY,
    class_id INT NOT NULL,
    day_of_week VARCHAR(20) NOT NULL,  -- E.g., Monday, Tuesday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
);
