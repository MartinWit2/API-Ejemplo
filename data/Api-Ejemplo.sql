USE [master]
GO
/****** Object:  Database []    Script Date: 15/9/2023 11:18:40 ******/
CREATE DATABASE [Api-Ejemplo]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Api-Ejemplo', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Api-Ejemplo.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Api-Ejemplo_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Api-Ejemplo_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Api-Ejemplo] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Api-Ejemplo].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Api-Ejemplo] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET ARITHABORT OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Api-Ejemplo] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Api-Ejemplo] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Api-Ejemplo] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Api-Ejemplo] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET RECOVERY FULL 
GO
ALTER DATABASE [Api-Ejemplo] SET  MULTI_USER 
GO
ALTER DATABASE [Api-Ejemplo] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Api-Ejemplo] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Api-Ejemplo] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Api-Ejemplo] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Api-Ejemplo] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Api-Ejemplo', N'ON'
GO
ALTER DATABASE [Api-Ejemplo] SET QUERY_STORE = OFF
GO
USE [Api-Ejemplo]
GO
/****** Object:  User [Api-Ejemplo]    Script Date: 15/9/2023 11:18:40 ******/
CREATE USER [Api-Ejemplo] FOR LOGIN [Api-Ejemplo] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 15/9/2023 11:18:40 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Api-Ejemplo]
GO
/****** Object:  Table [dbo].[Perfil]    Script Date: 15/9/2023 11:18:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Perfil](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
	[fk_usuario] [int] NOT NULL,
 CONSTRAINT [PK_Perfil] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 15/9/2023 11:18:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[pass] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Perfil] ON 

INSERT [dbo].[Perfil] ([id], [nombre], [apellido], [fk_usuario]) VALUES (3, N'juju', N'faca', 1)

SET IDENTITY_INSERT [dbo].[Perfil] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([id], [username], [pass]) VALUES (1, N'jujeta', N'juju')
INSERT [dbo].[Usuario] ([id], [username], [pass]) VALUES (2, N'faca', N'faqueta')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Perfil]  WITH CHECK ADD  CONSTRAINT [FK_Perfil_Usuario] FOREIGN KEY([fk_usuario])
REFERENCES [dbo].[Usuario] ([id])
GO
ALTER TABLE [dbo].[Perfil] CHECK CONSTRAINT [FK_Perfil_Usuario]
GO
/****** Object:  StoredProcedure [dbo].[createProfile]    Script Date: 15/9/2023 11:18:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[createProfile]
	@nombre varchar(50),
	@apellido varchar(50),
	@fk_usuario int
AS
BEGIN
	INSERT INTO Perfil VALUES (@nombre, @apellido, @fk_usuario)
END
GO
/****** Object:  StoredProcedure [dbo].[getProfile]    Script Date: 15/9/2023 11:18:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[getProfile]
	@fk_usuario int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT id, nombre, apellido FROM Perfil WHERE fk_usuario = @fk_usuario
END
GO
/****** Object:  StoredProcedure [dbo].[getUserActual]    Script Date: 15/9/2023 11:18:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[getUserActual] 
	@username varchar(50)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT id FROM Usuario WHERE username = @username
END
GO
/****** Object:  StoredProcedure [dbo].[getUsers]    Script Date: 15/9/2023 11:18:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[getUsers]
AS
BEGIN
	SELECT * FROM Usuario
END
GO
/****** Object:  StoredProcedure [dbo].[insertUser]    Script Date: 15/9/2023 11:18:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[insertUser]
	@username varchar(50),
	@pass varchar(50)
AS
BEGIN
	INSERT INTO Usuario VALUES (@username, @pass)
END
GO
/****** Object:  StoredProcedure [dbo].[updateProfile]    Script Date: 15/9/2023 11:18:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[updateProfile] 
	@id int,
	@nombre varchar(50),
	@apellido varchar(50)
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE Perfil SET nombre = @nombre, apellido = @apellido WHERE id = @id
END
GO
USE [master]
GO
ALTER DATABASE [Api-Ejemplo] SET  READ_WRITE 
GO
