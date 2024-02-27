DROP TABLE IF EXISTS Roles;

CREATE TABLE Roles (
    role_id INT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE,
    role_description text
);

DROP TABLE IF EXISTS UserPermissions;

CREATE TABLE UserPermissions (
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);
