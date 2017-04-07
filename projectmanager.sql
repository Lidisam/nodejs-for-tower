-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-11-30 21:30:38
-- 服务器版本： 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectmanager`
--

-- --------------------------------------------------------

--
-- 表的结构 `file`
--

CREATE TABLE IF NOT EXISTS `file` (
  `fileID` int(4) NOT NULL,
  `fileName` varchar(100) NOT NULL,
  `projectID` int(11) NOT NULL,
  `loadTime` datetime NOT NULL,
  `memberID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `memberID` int(10) NOT NULL,
  `memberName` varchar(20) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `registTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `memberDesc` varchar(60) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `member`
--

INSERT INTO `member` (`memberID`, `memberName`, `mail`, `password`, `registTime`, `lastTime`, `memberDesc`) VALUES
(1, 'wyb', '', '123', '2016-11-09 13:03:54', '2016-11-28 08:38:52', NULL),
(2, 'lyx', NULL, 'lyx', '2016-11-09 13:04:01', '2016-11-21 10:42:58', NULL),
(3, 'lds', NULL, 'lds', '2016-11-09 13:04:10', '2016-11-21 10:43:01', NULL),
(4, 'xiexie', NULL, 'xiexie', '2016-11-21 10:39:04', '2016-11-21 10:43:03', NULL),
(5, 'lisam', NULL, 'lisam', '2016-11-22 10:18:17', '2016-11-22 10:21:07', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `projectID` int(4) NOT NULL,
  `projectName` varchar(50) NOT NULL,
  `projectDesc` varchar(600) DEFAULT NULL,
  `startDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `finishDate` timestamp NULL DEFAULT NULL,
  `projectStatus` smallint(6) NOT NULL DEFAULT '0',
  `managerID` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `project`
--

INSERT INTO `project` (`projectID`, `projectName`, `projectDesc`, `startDate`, `finishDate`, `projectStatus`, `managerID`) VALUES
(1, '半半', '一半一半视频的应用', NULL, NULL, 0, 5),
(2, '滴滴打人', '打架必备的应用', NULL, NULL, 0, 5),
(3, '书评', '关于书的评论的应用', NULL, NULL, 0, 5),
(4, '收发通', '收发快递件等等的应用', NULL, NULL, 0, 5),
(5, ' QQ', '我们常用的QQ的应用', NULL, NULL, 0, 5),
(6, '微信', '微信公众号开发的应用', NULL, NULL, 0, 5),
(7, '月半人', '适合胖子的应用', NULL, NULL, 0, 5),
(19, 'ce', 'cece', '2016-11-29 08:58:49', NULL, 0, 5),
(20, '数据库课设', '这是一门数据库课程设计', '2016-11-29 09:02:19', NULL, 0, 5),
(21, '新项目', '新项目！！', '2016-11-29 09:08:11', NULL, 0, 5),
(22, '数据库', '了了了乐了了了勒令', '2016-11-30 12:20:48', NULL, 0, 5);

-- --------------------------------------------------------

--
-- 表的结构 `projectlog`
--

CREATE TABLE IF NOT EXISTS `projectlog` (
  `logID` int(11) NOT NULL,
  `logs` varchar(100) NOT NULL,
  `projectID` int(11) NOT NULL,
  `logTim` datetime NOT NULL,
  `memberID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `projectmember`
--

CREATE TABLE IF NOT EXISTS `projectmember` (
  `memberID` int(11) NOT NULL,
  `projectID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `projectmember`
--

INSERT INTO `projectmember` (`memberID`, `projectID`) VALUES
(1, 1),
(2, 1),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(1, 5),
(3, 5),
(5, 5),
(5, 6),
(5, 7),
(5, 20),
(1, 21),
(5, 21),
(1, 22),
(2, 22),
(3, 22),
(5, 22);

-- --------------------------------------------------------

--
-- 表的结构 `task`
--

CREATE TABLE IF NOT EXISTS `task` (
  `taskID` int(11) NOT NULL,
  `taskName` varchar(50) NOT NULL,
  `taskDesc` varchar(600) DEFAULT NULL,
  `taskStaus` smallint(4) DEFAULT '1',
  `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `deadline` datetime DEFAULT NULL,
  `memberID` int(11) DEFAULT NULL,
  `projectID` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `task`
--

INSERT INTO `task` (`taskID`, `taskName`, `taskDesc`, `taskStaus`, `createDate`, `deadline`, `memberID`, `projectID`) VALUES
(1, '任务', '任务的描述啊啊啊啊啊', 3, '2016-11-22 00:00:00', '2016-11-23 20:54:04', 4, 1),
(2, '彬总666', '这是新任务', 2, '2016-11-23 19:33:08', '2016-11-23 20:56:46', 5, 1),
(3, '彬总666', '雄大你去滴滴打人啊', 1, '2016-11-23 19:33:40', NULL, 5, 2),
(4, '彬总666', '有一个任务', 2, '2016-11-23 20:52:25', '2016-11-23 21:30:45', 5, 1),
(6, '彬总666', '哈哈', 2, '2016-11-23 21:15:01', '2016-11-23 23:42:40', 5, 1),
(7, '彬总666', '发送发撒', 2, '2016-11-23 21:16:43', '2016-11-23 23:43:29', 5, 1),
(8, '彬总666', 'lisam', 3, '2016-11-23 21:18:02', '2016-11-23 23:44:21', 5, 1),
(11, '彬总666', '', 2, '2016-11-27 20:43:49', '2016-11-30 19:19:14', 1, 1),
(12, '彬总666', '这是和ixixnirenwu', 1, '2016-11-27 20:44:00', NULL, NULL, 1),
(13, '彬总666', '123', 3, '2016-11-28 15:27:16', '2016-11-27 19:14:40', 4, 1),
(14, '彬总666', '555', 3, '2016-11-28 17:32:07', '2016-11-28 18:48:40', 5, 1),
(16, '彬总666', '数据1', 3, '2016-11-28 19:19:45', '2016-11-27 19:20:32', 3, 1),
(17, '彬总666', '数据2', 3, '2016-11-28 19:19:51', '2016-11-29 19:20:37', 1, 1),
(18, '彬总666', '数据3', 3, '2016-11-28 19:19:55', '2016-11-29 19:20:46', 2, 1),
(19, '彬总666', '数据4', 3, '2016-11-28 19:19:58', '2016-11-30 19:20:53', 5, 1),
(20, '彬总666', '数据5', 3, '2016-11-28 19:20:03', '2016-12-01 19:21:03', 4, 1),
(21, '彬总666', '数据6', 3, '2016-11-28 19:20:13', '2016-12-02 19:21:09', 4, 1),
(22, '彬总666', '你就可能就开饭健康纷纷就啃能否尽快看你看调查科撒旦kfc我看接口空间看能尽快', 3, '2016-11-28 19:35:53', '2016-11-29 19:36:06', 5, 1),
(23, '彬总666', '我想创建一个新任务', 1, '2016-11-29 17:08:52', NULL, NULL, 5),
(24, '彬总666', '1111', 1, '2016-11-29 17:09:14', NULL, NULL, 5),
(25, '彬总666', 'sss', 1, '2016-11-29 17:10:54', NULL, NULL, 5),
(26, '彬总666', 'fff', 1, '2016-11-29 17:16:10', NULL, NULL, 5),
(28, '彬总666', 'fffff', 1, '2016-11-29 17:43:57', NULL, NULL, 2),
(29, '彬总666', '打人', 1, '2016-11-30 19:49:17', NULL, NULL, 2),
(32, '彬总666', 'aaaaaa', 1, '2016-11-30 21:27:03', NULL, NULL, 1),
(33, '彬总666', 'fasdfads', 1, '2016-11-30 21:28:37', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- 表的结构 `weekly`
--

CREATE TABLE IF NOT EXISTS `weekly` (
  `weeklyID` int(11) NOT NULL,
  `lastweek` varchar(600) NOT NULL,
  `nextweek` varchar(600) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `memberID` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `weekly`
--

INSERT INTO `weekly` (`weeklyID`, `lastweek`, `nextweek`, `created_at`, `memberID`) VALUES
(16, '测试三的周报符文啊', '测试二', '2016-11-23 13:06:33', 5),
(17, '这又是周报', '下周的周报', '2016-11-29 11:32:50', 4),
(18, 'ffff', 'fffff', '2016-11-30 12:25:09', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`fileID`),
  ADD KEY `filePro` (`projectID`) USING BTREE,
  ADD KEY `fileMem` (`memberID`) USING BTREE;

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`memberID`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`projectID`),
  ADD KEY `managerID` (`managerID`);

--
-- Indexes for table `projectlog`
--
ALTER TABLE `projectlog`
  ADD PRIMARY KEY (`logID`),
  ADD KEY `logProject` (`projectID`) USING BTREE,
  ADD KEY `logMem` (`memberID`) USING BTREE;

--
-- Indexes for table `projectmember`
--
ALTER TABLE `projectmember`
  ADD PRIMARY KEY (`memberID`,`projectID`),
  ADD KEY `proMem` (`projectID`) USING BTREE;

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`taskID`),
  ADD KEY `member` (`memberID`) USING BTREE,
  ADD KEY `project` (`projectID`) USING BTREE;

--
-- Indexes for table `weekly`
--
ALTER TABLE `weekly`
  ADD PRIMARY KEY (`weeklyID`),
  ADD KEY `memberID` (`memberID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `fileID` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `memberID` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `projectID` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `projectlog`
--
ALTER TABLE `projectlog`
  MODIFY `logID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `taskID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `weekly`
--
ALTER TABLE `weekly`
  MODIFY `weeklyID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- 限制导出的表
--

--
-- 限制表 `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `file_ibfk_1` FOREIGN KEY (`projectID`) REFERENCES `project` (`projectID`),
  ADD CONSTRAINT `file_ibfk_2` FOREIGN KEY (`memberID`) REFERENCES `member` (`memberID`);

--
-- 限制表 `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `managerID` FOREIGN KEY (`managerID`) REFERENCES `member` (`memberID`);

--
-- 限制表 `projectlog`
--
ALTER TABLE `projectlog`
  ADD CONSTRAINT `projectlog_ibfk_1` FOREIGN KEY (`projectID`) REFERENCES `project` (`projectID`),
  ADD CONSTRAINT `projectlog_ibfk_2` FOREIGN KEY (`memberID`) REFERENCES `member` (`memberID`);

--
-- 限制表 `projectmember`
--
ALTER TABLE `projectmember`
  ADD CONSTRAINT `projectmember_ibfk_1` FOREIGN KEY (`memberID`) REFERENCES `member` (`memberID`),
  ADD CONSTRAINT `projectmember_ibfk_2` FOREIGN KEY (`projectID`) REFERENCES `project` (`projectID`);

--
-- 限制表 `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`memberID`) REFERENCES `member` (`memberID`),
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`projectID`) REFERENCES `project` (`projectID`);

--
-- 限制表 `weekly`
--
ALTER TABLE `weekly`
  ADD CONSTRAINT `memberID` FOREIGN KEY (`memberID`) REFERENCES `member` (`memberID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
