-- SEEDS > LANGUAGES
INSERT INTO codelanguage (name)
VALUES
('HTML'),
('CSS'),
('JAVASCRIPT'),
('API'),
('NODE'),
('MYSQL'),
('EXPRESS'),
('HANDLEBARS');

-- SEEDS > USERS
INSERT INTO users (username, user_password, user_email)
VALUES
('cassandra', 'password1', 'cassandra@email.com'),
('ramu', 'password2', 'ramu@email.com'),
('shuan', 'password3', 'shuan@email.com'),
('ballard', 'password4', 'ballard@email.com');

-- SEEDS > SUBMISSION
INSERT INTO submission (language_id, title, detail, username)
VALUES
(1,'HTML-TIP-1', 'TIP DETAIL', 1),
(1,'HTML-TIP-2', 'TIP DETAIL', 2),
(1,'HTML-TIP-3', 'TIP DETAIL', 3),
(1,'HTML-TIP-4', 'TIP DETAIL', 4),
(1,'HTML-TIP-5', 'TIP DETAIL', 1),
(2,'CSS-TIP-1', 'TIP DETAIL', 2),
(2,'CSS-TIP-2', 'TIP DETAIL', 3),
(2,'CSS-TIP-3', 'TIP DETAIL', 4),
(2,'CSS-TIP-4', 'TIP DETAIL', 1),
(2,'CSS-TIP-5', 'TIP DETAIL', 2),
(3,'JAVASCRIPT-TIP-1', 'TIP DETAIL', 3),
(3,'JAVASCRIPT-TIP-2', 'TIP DETAIL', 4),
(3,'JAVASCRIPT-TIP-3', 'TIP DETAIL', 1),
(3,'JAVASCRIPT-TIP-4', 'TIP DETAIL', 2),
(3,'JAVASCRIPT-TIP-5', 'TIP DETAIL', 3),
(4,'API-TIP-1', 'TIP DETAIL', 4),
(4,'API-TIP-2', 'TIP DETAIL', 1),
(4,'API-TIP-3', 'TIP DETAIL', 2),
(4,'API-TIP-4', 'TIP DETAIL', 3),
(4,'API-TIP-5', 'TIP DETAIL', 4),
(5,'NODE-TIP-1', 'TIP DETAIL', 1),
(5,'NODE-TIP-2', 'TIP DETAIL', 2),
(5,'NODE-TIP-3', 'TIP DETAIL', 3),
(5,'NODE-TIP-4', 'TIP DETAIL', 4),
(5,'NODE-TIP-5', 'TIP DETAIL', 1),
(6,'MYSQL-TIP-1', 'TIP DETAIL', 2),
(6,'MYSQL-TIP-2', 'TIP DETAIL', 3),
(6,'MYSQL-TIP-3', 'TIP DETAIL', 4),
(6,'MYSQL-TIP-4', 'TIP DETAIL', 1),
(6,'MYSQL-TIP-5', 'TIP DETAIL', 2),
(7,'EXPRESS-TIP-1', 'TIP DETAIL', 3),
(7,'EXPRESS-TIP-2', 'TIP DETAIL', 4),
(7,'EXPRESS-TIP-3', 'TIP DETAIL', 1),
(7,'EXPRESS-TIP-4', 'TIP DETAIL', 2),
(7,'EXPRESS-TIP-5', 'TIP DETAIL', 3),
(8,'HANDLEBARS-TIP-1', 'TIP DETAIL', 4),
(8,'HANDLEBARS-TIP-2', 'TIP DETAIL', 1),
(8,'HANDLEBARS-TIP-3', 'TIP DETAIL', 2),
(8,'HANDLEBARS-TIP-4', 'TIP DETAIL', 3),
(8,'HANDLEBARS-TIP-5', 'TIP DETAIL', 4);

-- SEEDS > MY SQL FUNCTIONS - ALL DEPARTMENTS
SELECT codelanguage.name
AS submission,
submission.id,
submission.title,
submission.detail,
submission.language_id,
submission.username
FROM submission
LEFT JOIN codelanguage ON (codelanguage.id = submission.language_id)
LEFT JOIN submission ON (submission.id = users.username)
ORDER BY submission.title;