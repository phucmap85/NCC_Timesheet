import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { 
  Role, RolePermission, UserRole, Branch, Position, Client,
  User, Project, Task, ProjectTask, ProjectUser, Timesheet,
  ProjectTargetUser
} from 'src/common/database/entities';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  timezone: '+07:00', // Vietnam timezone
  charset: 'utf8mb4',
  entities: [
    Role, RolePermission, UserRole, Branch, Position, Client,
    User, Project, Task, ProjectTask, ProjectUser, Timesheet,
    ProjectTargetUser
  ],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;