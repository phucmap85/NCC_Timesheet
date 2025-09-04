CREATE TABLE `roles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) UNIQUE NOT NULL,
  `displayName` varchar(100) UNIQUE NOT NULL,
  `normalizedName` varchar(100) UNIQUE NOT NULL,
  `description` text,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp
);

CREATE TABLE `role_permissions` (
  `roleId` int NOT NULL,
  `permissionKey` varchar(200) NOT NULL,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp,
  PRIMARY KEY (`roleId`, `permissionKey`)
);

CREATE TABLE `user_roles` (
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp,
  PRIMARY KEY (`userId`, `roleId`)
);

CREATE TABLE `branches` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) UNIQUE NOT NULL,
  `displayName` varchar(100) UNIQUE NOT NULL,
  `code` varchar(20) UNIQUE NOT NULL,
  `color` varchar(40) NOT NULL,
  `morningWorking` float NOT NULL,
  `morningStartAt` time NOT NULL,
  `morningEndAt` time NOT NULL,
  `afternoonWorking` float NOT NULL,
  `afternoonStartAt` time NOT NULL,
  `afternoonEndAt` time NOT NULL,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp
);

CREATE TABLE `positions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) UNIQUE NOT NULL,
  `shortName` varchar(20) UNIQUE NOT NULL,
  `code` varchar(20) UNIQUE NOT NULL,
  `color` varchar(40) NOT NULL,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userName` varchar(100) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `fullName` varchar(200) NOT NULL,
  `emailAddress` varchar(255) UNIQUE NOT NULL,
  `phoneNumber` varchar(20) UNIQUE,
  `address` text,
  `sex` int DEFAULT 0,
  `avatarPath` text,
  `avatarFullPath` text,
  `managerId` int,
  `positionId` int,
  `branchId` int,
  `jobTitle` varchar(50),
  `type` int,
  `level` int,
  `beginLevel` int,
  `salary` int,
  `salaryAt` timestamp,
  `allowedLeaveDay` int DEFAULT 0,
  `isActive` boolean DEFAULT true,
  `startDateAt` timestamp,
  `endDateAt` timestamp,
  `isWorkingTimeDefault` boolean DEFAULT false,
  `morningWorking` float,
  `morningStartAt` time,
  `morningEndAt` time,
  `afternoonWorking` float,
  `afternoonStartAt` time,
  `afternoonEndAt` time,
  `creationTime` timestamp DEFAULT (now()),
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp
);

CREATE TABLE `clients` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) UNIQUE NOT NULL,
  `address` text,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp
);

CREATE TABLE `projects` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL,
  `customerId` int,
  `code` varchar(255) UNIQUE NOT NULL,
  `projectType` int DEFAULT 1,
  `note` text,
  `timeStart` timestamp,
  `timeEnd` timestamp,
  `status` int DEFAULT 0,
  `notifyChannel` int DEFAULT 0,
  `mezonUrl` text,
  `komuChannelId` varchar(255),
  `isNoticeKMSubmitTS` boolean DEFAULT false,
  `isNoticeKMRequestOffDate` boolean DEFAULT false,
  `isNoticeKMApproveRequestOffDate` boolean DEFAULT false,
  `isNoticeKMRequestChangeWorkingTime` boolean DEFAULT false,
  `isNoticeKMApproveChangeWorkingTime` boolean DEFAULT false,
  `isAllUserBelongTo` boolean DEFAULT false,
  `isAllowTeamBuilding` boolean DEFAULT false,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp
);

CREATE TABLE `tasks` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) UNIQUE NOT NULL,
  `type` int NOT NULL,
  `isDeleted` boolean DEFAULT false,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp
);

CREATE TABLE `project_tasks` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `projectId` int NOT NULL,
  `taskId` int NOT NULL,
  `billable` boolean DEFAULT false,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp
);

CREATE TABLE `project_users` (
  `userId` int NOT NULL,
  `projectId` int NOT NULL,
  `isTemp` boolean DEFAULT false,
  `type` int DEFAULT 0,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp,
  PRIMARY KEY (`userId`, `projectId`)
);

CREATE TABLE `project_target_users` (
  `userId` int NOT NULL,
  `projectId` int NOT NULL,
  `roleName` text NOT NULL,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp,
  PRIMARY KEY (`userId`, `projectId`)
);

CREATE TABLE `timesheets` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int,
  `projectTaskId` int,
  `note` varchar(500),
  `workingTime` int NOT NULL,
  `billable` boolean DEFAULT true,
  `isCharged` boolean DEFAULT false,
  `targetTimesheetId` int,
  `status` int DEFAULT 0,
  `typeOfWork` int DEFAULT 0,
  `approvedBy` int,
  `isTemp` boolean DEFAULT false,
  `dateAt` timestamp NOT NULL,
  `createdAt` timestamp DEFAULT (now()),
  `updatedAt` timestamp DEFAULT (now()),
  `deletedAt` timestamp
);

CREATE UNIQUE INDEX `project_tasks_index_0` ON `project_tasks` (`projectId`, `taskId`);

ALTER TABLE `users` ADD FOREIGN KEY (`positionId`) REFERENCES `positions` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`branchId`) REFERENCES `branches` (`id`);

ALTER TABLE `users` ADD FOREIGN KEY (`managerId`) REFERENCES `users` (`id`);

ALTER TABLE `projects` ADD FOREIGN KEY (`customerId`) REFERENCES `clients` (`id`);

ALTER TABLE `project_tasks` ADD FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `project_tasks` ADD FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `project_users` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `project_users` ADD FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `project_target_users` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `project_target_users` ADD FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `role_permissions` ADD FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user_roles` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user_roles` ADD FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `timesheets` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `timesheets` ADD FOREIGN KEY (`projectTaskId`) REFERENCES `project_tasks` (`id`);

ALTER TABLE `timesheets` ADD FOREIGN KEY (`approvedBy`) REFERENCES `users` (`id`);

ALTER TABLE `timesheets` ADD FOREIGN KEY (`targetTimesheetId`) REFERENCES `timesheets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
