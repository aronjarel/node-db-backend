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
