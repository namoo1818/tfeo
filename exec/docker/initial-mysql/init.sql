DROP USER IF EXISTS 'tfeo'@'%';
CREATE USER 'tfeo'@'%' IDENTIFIED BY 'tfeo123';
GRANT CREATE ON *.* TO 'tfeo'@'%';

CREATE DATABASE IF NOT EXISTS tfeo;
CREATE DATABASE IF NOT EXISTS tfeo_test;
CREATE DATABASE IF NOT EXISTS tfeo_temp;



GRANT ALL PRIVILEGES ON `tfeo`.* TO 'tfeo'@'%';
GRANT ALL PRIVILEGES ON `tfeo_test`.* TO 'tfeo'@'%';
GRANT ALL PRIVILEGES ON `tfeo_temp`.* TO 'tfeo'@'%';

FLUSH PRIVILEGES;
