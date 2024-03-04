
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT,
    user_email varchar(63) NOT NULL UNIQUE,
    user_password varchar(255) NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    username varchar(63) NOT NULL UNIQUE,
    institution varchar(63) DEFAULT "",
    designation varchar(63) DEFAULT "user",
    user_profile_url varchar(255) DEFAULT "",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_details_json json,
    verified boolean DEFAULT false,
    PRIMARY KEY (user_id)
);

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

DROP TABLE IF EXISTS RefreshToken;

CREATE TABLE RefreshToken (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, 
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS OTP;

CREATE TABLE OTP(
    user_id INT(255) NOT NULL PRIMARY KEY,
    otp VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);
