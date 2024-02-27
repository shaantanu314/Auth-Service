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

