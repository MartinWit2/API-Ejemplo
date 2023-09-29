USE [master]
GO
CREATE LOGIN [Api-Ejemplo] WITH PASSWORD=N'Api-Ejemplo', DEFAULT_DATABASE=[Api-Ejemplo], CHECK_EXPIRATION=OFF,
CHECK_POLICY=OFF
GO

USE [Api-Ejemplo]
GO
CREATE USER [Api-Ejemplo] FOR LOGIN [Api-Ejemplo]
GO
USE [Api-Ejemplo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Api-Ejemplo]
GO